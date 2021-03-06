const pool = require('./db/index')

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1`, [email.toLowerCase()])
  .then (res => {
    return res.rows[0];
  })
  .catch (() => null)
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1`, [id])
  .then (res => res.rows[0])
  .catch (() => null)
}
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1;`, [user.email])
  .then (res => {
    if (res.rows[0]) {
      console.log('user exists')
      throw new Error('user exists');
    }  
  })
  .then (() => {
    return pool.query(`
      INSERT INTO users (name, password, email)
      VALUES ($1, $2, $3);`, [user.name, user.password, user.email])
  })
  // .then (res => console.log(res))
  .catch (err => console.log(err))  
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
    SELECT reservations.*, properties.*, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON properties.id = reservations.property_id
    LEFT JOIN property_reviews ON reservations.property_id = property_reviews.property_id
    WHERE reservations.guest_id = $1 AND end_date < now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY start_date
    LIMIT $2;`,[guest_id,limit])
    .then (res => res.rows)
    .catch(err => console.log(err))

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  LEFT JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}
  `
  }
  if (options.minimum_price_per_night) {   
    queryParams.push(parseInt(options.minimum_price_per_night * 100));
    queryParams.length === 0 ? queryString += `WHERE ` : queryString += `AND `;
    queryString += `cost_per_night >= $${queryParams.length}
  `;
  }
  if (options.maximum_price_per_night) {    
    queryParams.push(parseInt(options.maximum_price_per_night * 100));
    queryParams.length === 0 ? queryString += `WHERE ` : queryString += `AND `;
    queryString += `cost_per_night <= $${queryParams.length}
  `;
  }
  if (options.owner_id) {    
    queryParams.push(parseInt(options.owner_id));
    queryParams.length === 0 ? queryString += `WHERE ` : queryString += `AND `;
    queryString += `owner_id = $${queryParams.length}
  `;
  }

  queryString += `GROUP BY properties.id
  `;

  if (options.minimum_rating) {    
    queryParams.push(parseInt(options.minimum_rating));
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length}
  `;
  }

  queryParams.push(limit);
  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length};`;

  return pool.query(queryString, queryParams)
  .then (res => {
    return res.rows;
  })
}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {

  return pool.query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url,cost_per_night,
  parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`, 
  [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url,property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code])
  .then (res => res.rows[0])
  .catch(err => console.log(err))
}
exports.addProperty = addProperty;

const addReservation = function(form,userId) {  

  queryParams = [parseInt(userId), parseInt(form.propertyId), form.startDate, form.endDate];
  console.log(queryParams) 
  return pool.query(`
  INSERT INTO reservations (guest_id, property_id, start_date, end_date)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`, [parseInt(userId), parseInt(form.propertyId), form.startDate, form.endDate])
  .then (res => res.rows[0])
  .catch (err => console.log(err))

}

exports.addReservation = addReservation;