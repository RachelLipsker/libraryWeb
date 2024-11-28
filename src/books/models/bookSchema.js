import Joi from "joi";

const urlRegex = /^(https?:\/\/.+)$|(^.*\.(png|jpg|jpeg|gif|webp|svg))$/i;

const bookSchema = {
    title: Joi.string().min(2).max(256).required(),
    author: Joi.string().min(2).max(256).required(),
    genre: Joi.string().min(2).max(1024).required(),
    image: Joi.string()
        .ruleset.regex(urlRegex)
        .rule({ message: 'הכנס url תקין' })
        .allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
};

export default bookSchema;
