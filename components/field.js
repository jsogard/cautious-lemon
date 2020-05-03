import { ErrorMessage } from 'formik'

export default function InputField({ type, label, placeholder, field, form: {errors, touched, status}, required }) {

    const getInputClassName = () => {
        if(touched[field.name]) {
            if(errors[field.name]) {
                return 'error';
            } else {
                return 'valid';
            }
        }
        return '';
    }

    const getErrorMessage = () => {
        const message = (status && status[field.name]) || errors[field.name];
        return message ? (<span class='error'> {message} </span>) : null;
    }

    return (
        <div>
            <span class={`label ${required ? 'required' : ''}`}>{ label || placeholder || field.name }</span>
            <input className={ getInputClassName() } 
                type={type} 
                {...field}
                placeholder={placeholder} />
            { getErrorMessage() }
        </div>
    )
}