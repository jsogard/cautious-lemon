import { ErrorMessage } from 'formik'

export default function InputField({ type, label, placeholder, field, form: {errors, touched}, required }) {

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

    return (
        <div>
            <span class={`label ${required ? 'required' : ''}`}>{ label || placeholder || field.name }</span>
            <input className={ getInputClassName() } 
                type={type} 
                {...field}
                placeholder={placeholder} />
            <ErrorMessage className='error' name={field.name} component='span'/>
        </div>
    )
}