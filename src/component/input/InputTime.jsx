import React from 'react'

export default function InputTime({type='text',name,id,value,title,onChange,errors,onBlur,touched,}) {
  return (
    <div className="col-md-4">
        <div className="form-floating mb-3 ">
            
              <input type={type} className="form-control" name={name} id={id} value={value} placeholder={title}  onChange={onChange} onBlur={onBlur} />
              <label htmlFor={id}>{title}</label>
              {touched[name] && errors[name] && <p className='text text-danger'> {errors[name]} </p>}
          
        </div>
  </div>)
}
