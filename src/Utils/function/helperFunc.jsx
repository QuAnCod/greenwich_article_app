export const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const validatePassword = (password) => {
    return password.length >= 5;
}

export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
}

