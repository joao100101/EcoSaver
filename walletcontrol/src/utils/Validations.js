const validateName = (nome) => {
    return nome?.toString().length > 2
}
const validateEmail = (email) => {
    return email?.toString().includes('@') && email?.toString().includes('.')
}

const validatePassword = (senha) => {
    return senha?.toString().length > 6
}


const validateConfirmPassword = (senha, confirmarSenha) => {
    return validatePassword(senha) && senha === confirmarSenha
}

export {
    validateEmail,
    validatePassword,
    validateName,
    validateConfirmPassword
}