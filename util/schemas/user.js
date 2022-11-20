import joi from 'joi'

const createUserSchema = joi.object({
  full_name: joi.string().max(80).required(),
  email: joi.string().email().required(),
  nickname: joi.string().alphanum().max(20).required(),
  password: joi.string().alphanum().min(6).max(15).required()
})

const loginUserSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().alphanum().required()
})

export { createUserSchema, loginUserSchema }
