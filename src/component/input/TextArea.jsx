import React from 'react'
import TextField from '@mui/material/TextField';

export default function TextArea({type='text',name,id,value,title,onChange,errors,onBlur,touched,fullWidth}) {
  return (
        <div className="form-floating my-3 w-100">
        <TextField
          id={id}
          label={title}
          multiline
          defaultValue={value}
          minRows={3}
          fullWidth
          onChange={onChange} onBlur={onBlur}
        />

              {touched[name] && errors[name] && <p className='text text-danger'> {errors[name]} </p>}
          
        </div>
  )
}
