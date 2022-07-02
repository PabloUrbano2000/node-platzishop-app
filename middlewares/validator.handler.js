const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    // para que sea dinamico
    const data = req[property];
    // esto me devuelve el error de joi, con abortEarly en false me retorna todos los errores
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
