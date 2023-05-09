import Joi from 'joi'

export const registerUserSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(), 
    fullname: Joi.string().required(),
    username: Joi.string().trim().lowercase().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: Joi.any().equal(Joi.ref('password')).required().label('Passwords').messages({'any.only': '{{#label}} does not match'})
})

export const options = {
    abortEarly: false,
    errors: {
        wrap:{
            label: ''
        }
    }
}

export const loginUserSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(), 
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
})

export const createMovieSchema = Joi.object().keys({
    title: Joi.string().lowercase().min(1).max(50).required(),
    description: Joi.string().lowercase().min(10).max(200).required(),
    image: Joi.string().trim().lowercase().pattern(/.(jpg|jpeg|png|gif)$/).required(),
    price: Joi.string().lowercase().min(0).max(10)
  });

export const updateMovieSchema = Joi.object().keys({
    title: Joi.string().lowercase().min(1).max(50),
    description: Joi.string().lowercase().min(10).max(200),
    image: Joi.string().trim().lowercase().pattern(/.(jpg|jpeg|png|gif)$/),
    price: Joi.string().lowercase().min(0).max(10)
  });
  
