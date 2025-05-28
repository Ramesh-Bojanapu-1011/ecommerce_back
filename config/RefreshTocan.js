const jwt = require('jsonwebtoken');

/**
 * The function `generate_Refresh_Token` generates a refresh token using the user's ID and a secret key
 * with a 3-day expiration.
 * @param id - The `id` parameter is typically a unique identifier for a user or entity in the system.
 * It is used to associate the generated refresh token with a specific user or entity when it is later
 * used for authentication or authorization purposes.
 * @returns A refresh token is being returned.
 */
const generate_Refresh_Token = (id) => {
  return jwt.sign({ id }, process.env.jwt_sckrit, { expiresIn: '3d' });
};
module.exports = { generate_Refresh_Token };
