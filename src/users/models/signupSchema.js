import Joi from "joi";

const signupSchema = {
    firstName: Joi.string().min(2).max(256).required(),
    lastName: Joi.string().min(2).max(256).required(),

    phone: Joi.string()
        .ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
        .rule({ message: 'מספר פלאפון לא תקין' })
        .required(),
    email: Joi.string()
        .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: 'כתובת אימייל לא תקינה' })
        .required(),
    password: Joi.string()
        .ruleset.regex(
            /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
        )
        .rule({
            message:
                "הסיסמא צריככה להיות באנגלית , בעלת לפחות 7 תווים ולהכיל אות גדולה, אות !@#$%^&*-קטנה מספק ותו מיוחד:",
        })
        .required(),
    image: Joi.string()
        .ruleset.regex(
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        )
        .rule({ message: "הכנס url תקין" })
        .allow(""),

    alt: Joi.string().min(2).max(256).allow(""),
};

export default signupSchema;
