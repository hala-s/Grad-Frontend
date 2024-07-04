import React from 'react'

export default function Input({type='text',name,id,value,title,onChange,errors,onBlur,touched,disabled = false}) {
  return (
    <div className="col-md-10">
        <div className="form-floating mb-3 ">
            
              <input type={type} className="form-control" name={name} id={id} value={value} placeholder={title}  onChange={onChange} onBlur={onBlur} disabled={disabled} />
              <label htmlFor={id}>{title}</label>
              {touched[name] && errors[name] && <p className='text text-danger'> {errors[name]} </p>}
          
        </div>
  </div>)
}
