'use client'
import TextArea from '@/component/input/TextArea';
import { addFeedback } from '@/component/validation/validation';
import { UserContext } from '@/context/user/User';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2';
import './GeneralFeedback.css'

export default function AddGeneralFeedback({setOpen}) {
    const { userToken, userData, userId } = useContext(UserContext);
    const [selectedRange, setSelectedRange] = useState(null);
    const initialValues = {
        range: 0,
        content: '',
    };

    const onSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('content', values.content);
            formData.append('range', selectedRange);

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_EDUCODING_API}Feedback/AddGeneralFeedback?studentId=${userId}`, formData, {  
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
              }});
            formik.resetForm();
            setOpen(false);

            Swal.fire({
                title: "Feedback added Successfully!",
                text: "Check Feedbacks to see it",
                icon: "success"
            });

        } catch (error) {
            // Handle the error here
            console.error('Error submitting form:', error);
            console.log('Error response:', error.response);
            // Optionally, you can show an error message to the user
        }
    };

    const formik = useFormik({
        initialValues: initialValues,
        onSubmit,
        validationSchema: addFeedback
    });



    return (
        <>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                {/* <div className="textArea w-100">
                    {textAreaInput}
                </div> */}
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-floating my-3">
        <TextField
          id='content'
          label='content'
          multiline
        //   defaultValue='content'
          minRows={3}
          fullWidth
          onChange={formik.handleChange} onBlur={formik.handleBlur}
        />

              {formik.touched.content&& formik.errors.content && <p className='text text-danger'> {formik.errors.content} </p>}
          
        </div>
                    </div>
                </div>
                
<div className="row justify-content-center align-items-center text-center">
    <div className="col-lg-12">
                {/* <div className="rating">
                    <input type="radio" id="star5" name="rate" value="5" onChange={() => setSelectedRange(5)} />
                    <label htmlFor="star5" title="text">
                        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="star-solid">
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                        </svg>
                    </label>
                    <input type="radio" id="star4" name="rate" value="4" onChange={() => setSelectedRange(4)} />
                    <label htmlFor="star4" title="text">
                        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="star-solid">
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                        </svg>
                    </label>
                    <input type="radio" id="star3" name="rate" value="3" onChange={() => setSelectedRange(3)} defaultChecked />
                    <label htmlFor="star3" title="text">
                        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="star-solid">
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                        </svg>
                    </label>
                    <input type="radio" id="star2" name="rate" value="2" onChange={() => setSelectedRange(2)} />
                    <label htmlFor="star2" title="text">
                        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="star-solid">
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                        </svg>
                    </label>
                    <input type="radio" id="star1" name="rate" value="1" onChange={() => setSelectedRange(1)} />
                    <label htmlFor="star1" title="text">
                        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="star-solid">
                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                        </svg>
                    </label>
                </div> */}

<div className="rating">
                            <input type="radio" id="star5" name="rate" value="5" onChange={() => setSelectedRange(5)} />
                            <label htmlFor="star5" title="text">
                                <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="star-solid">
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                </svg>
                            </label>
                            <input type="radio" id="star4" name="rate" value="4" onChange={() => setSelectedRange(4)} />
                            <label htmlFor="star4" title="text">
                                <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="star-solid">
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                </svg>
                            </label>
                            <input type="radio" id="star3" name="rate" value="3" onChange={() => setSelectedRange(3)} />
                            <label htmlFor="star3" title="text">
                                <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="star-solid">
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                </svg>
                            </label>
                            <input type="radio" id="star2" name="rate" value="2" onChange={() => setSelectedRange(2)} />
                            <label htmlFor="star2" title="text">
                                <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="star-solid">
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                </svg>
                            </label>
                            <input type="radio" id="star1" name="rate" value="1" onChange={() => setSelectedRange(1)} />
                            <label htmlFor="star1" title="text">
                                <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="star-solid">
                                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                </svg>
                            </label>
                        </div>
                </div>
                </div>
                <br/>

                <div className='text-center mt-3'>
                    <Button sx={{ px: 2 }} variant="contained"
                        className="m-2 btn primaryBg"
                        type="submit"
                        disabled={formik.isSubmitting || Object.keys(formik.errors).length > 0 || Object.keys(formik.touched).length === 0 || !selectedRange}
                    >
                        Add
                    </Button>
                </div>
            </form>
        </>
    )
}
