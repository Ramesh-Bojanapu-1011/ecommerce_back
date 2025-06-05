//not found
const not_found = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
//error handler
const error_handler = (err, _req, res, _next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  if (res.headersSent) {
    return _next(err); // Pass the error to the default error handler
  }
  res.json({
    message: err?.message,
    stack: err?.stack
  });
};
//exporting the middlewares
module.exports = {
  not_found,
  error_handler
};
