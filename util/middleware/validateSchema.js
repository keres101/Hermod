const validateSchema = (schema, check = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[check])
    error ? next(error) : next()
  }
}

export default validateSchema
