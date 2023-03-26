import React from 'react';

const FormInputError = ({ errors }) => {
    return (
        <ul className='form-input-error'>
            {errors.map((e, index) => <li key={index}>{e}</li>)}
        </ul>
    );
};

export default FormInputError;