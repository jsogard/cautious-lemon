import { ErrorMessage } from 'formik'

export default function InputField({ type, label, placeholder, field, form: {errors, touched}, required }) {

    return (
        <>
            <span class='label'>{ label || placeholder || field.name }</span>
            { required && <span class='error'>*</span>}
            <input className={ errors[field.name] && touched[field.name] ? 'error' : null } 
                type={type} 
                {...field}
                placeholder={placeholder} />
            <ErrorMessage className='error' name={field.name} component='span'/>
        </>
    )
}