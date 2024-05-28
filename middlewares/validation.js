import Joi from "joi";

const userSchema = Joi.object({
  username: Joi.string().min(4).max(255).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ru"] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(4)
    .max(255)
    .required(),
});

export const validateUser = (request, response, next) => {
  const { error } = userSchema.validate(request.body);
  if (error) {
    return response.status(400).json({ error: "Validation error" });
  }
  next();
};
