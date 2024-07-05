const jwt = require("jsonwebtoken");

/**
 * The function `generate_Token` generates a JWT token with the provided `id` using a secret key and
 * sets an expiration time of 1 day.
 * @param id - The `id` parameter is typically a unique identifier for a user or entity in your system.
 * It is used to generate a JSON Web Token (JWT) that can be used for authentication and authorization
 * purposes.
 * @returns A JSON Web Token (JWT) is being returned by the `generate_Token` function. The JWT is
 * signed with the provided `id` and a secret key stored in the environment variable `jwt_sckrit`, and
 * it has an expiration time of 1 day.
 */
const generate_Token = (id) => {
  return jwt.sign({ id }, process.env.jwt_sckrit, { expiresIn: "1d" });
};
module.exports = { generate_Token };
