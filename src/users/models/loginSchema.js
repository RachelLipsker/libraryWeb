import Joi from "joi";

const loginSchema = {
    email: Joi.string()
        .ruleset.regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        .rule({ message: "כתובת אימייל לא תקינה" })
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
};

export default loginSchema;
