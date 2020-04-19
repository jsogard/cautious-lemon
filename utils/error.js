

const addError = (errors, key, message) => {
    if(errors[key]) {
        errors[key].push(message);
    } else {
        errors[key] = [message];
    }
    return errors;
}

const formValidate = (setErrors, formItem, message, validator) => {
    validator = validator || (() => formItem.validity.valid)
    message = message || formItem.validationMessage
    if(!validator()) {
        setErrors(prev => addError(prev, formItem.id, message));
    }
}

export { addError, formValidate }