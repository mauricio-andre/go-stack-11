const { validate } = require('uuid');

module.exports = (request, response, next) => {
  const { id } = request.params;

  if (!validate(id)) {
    return response.status(400).json({ error: 'Invalid project ID.' });
  }

  return next();
}
