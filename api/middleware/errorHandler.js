export function errorHandler(err) {
    let errors = {}

    if (err.code === 11000) {
        errors.email = "Email already taken"
        return errors
    }

    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    if (err.message === "Incorrect email or password") {
        errors.email = err.message
        return errors
    }

    return errors
}