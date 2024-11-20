import Joi from "joi";

const urlRegex = /^(https?:\/\/.+)$|(^.*\.(png|jpg|jpeg|gif|webp|svg))$/i;

const editBookSchema = {
    author: Joi.string().min(2).max(256).required(),
    genre: Joi.string().min(2).max(1024).required(),
    image: Joi.string()
        .ruleset.regex(urlRegex)
        .rule({ message: 'card.image "url" mast be a valid url' })
        .allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
};

export default editBookSchema;
