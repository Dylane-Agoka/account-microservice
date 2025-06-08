const Joi = require('joi');

function take(object, keys) {
  return Object.assign({}, ...keys
    .filter(key => object.hasOwnProperty(key))
    .map(key => ({[key]: object[key]}))
  );
}

function validate(schema) {
  return (request, response, next) => {
    const selectedSchema = take(schema, ['params','query','body']);
    const objectToValidate = take(request, Object.keys(selectedSchema));
    const {error, value} = Joi.compile(selectedSchema)
      .prefs({errors: {label: 'key'}, abortEarly: false})
      .validate(objectToValidate);
    
    if (error) {
      const errorMessage = error.details.map(d => d.message).join(',')
      return response.status(400).json({success: false, message: errorMessage});
    }

    Object.assign(request, value);
    next();
  }
}

module.exports = validate;