import * as yup from 'yup';
export const createEmployee = yup.object({
    FName:yup.string().required('User Name is required').min(3,'user name must have at least 3 characters').max(30,'user name must have at most 30 characters'),
    LName:yup.string().required('User Name is required').min(3,'user name must have at least 3 characters').max(30,'user name must have at most 30 characters'),
    email:yup.string().required('Email is required').min(6,'Email must have at least 6 characters').max(30,'Email must have at most 30 characters'),
    password:yup.string().required('Password is required').min(8,'Password must have at least 8 characters').max(30,'Password must have at most 30 characters'),
    phoneNumber:yup.string().required('Phone Number is required').min(6,'phone must have at least 6 characters').max(30,'Password must have at most 30 characters'),
    address:yup.string().required('Address is required').min(6,'address must have at least 6 characters').max(30,'Password must have at most 30 characters'),
 })
 export const resetPass = yup.object({
   password:yup.string().required('Password is required').min(8,'Password must have at least 8 characters'),
   confirmPassword:yup.string().required('confirmPassword is required').min(8,'Password must have at least 8 characters').oneOf([yup.ref('password'), null], 'Passwords must match'),
})

 export const createCourse = yup.object({
    name:yup.string().required('Name is required').min(3,'Course Name must have at least 3 characters').max(30,'Course Name must have at most 30 characters'),
    price:yup.string().required('Price is required'),
    category:yup.string().required('Category is required').min(3,'Course Category must have at least 6 characters').max(100,'Course Category must have at most 100 characters'),
    limitNumberOfStudnet:yup.string().required('limit number of studnets is required'),
    subAdminId:yup.string().required('SubAdmin Id is required'),
   //  InstructorId:yup.string().required('Instructor Id is required'),
    startDate:yup.string().required('startDate is required'),
    Deadline:yup.string().required('Deadline is required'),
    totalHours:yup.string().required('totalHours is required'),
    description:yup.string().required('Description is required').min(6,'Course Description must have at least 6 characters').max(10000,'Course Description must have at most 100000 characters'),
    //imageUrl: yup.mixed().required('Image is required'),
 })

 

 export const createEvent = yup.object({
   name:yup.string().required('Name is required').min(5,'Course Name must have at least 3 characters'),
   content:yup.string().required('content is required').min(10,'Course content must have at minimum 30 characters'),
   category:yup.string().required('Category is required').min(3,'Course Category must have at least 6 characters').max(30,'Course Category must have at most 30 characters'),
   dateOfEvent:yup.string().required('Start Date is required'),
   SubAdminId:yup.string().required('SubAdmin Id is required'),
})
export const updateEmployee = yup.object({
   fName:yup.string().required('First Name is required'),
   lName:yup.string().required('Last Name is required'),
   email:yup.string().required('Email is required'),
   address:yup.string().required('Address is required'),
   phoneNumber:yup.string().required('Phone number is required'),
})

export const AddEmailForgetPass = yup.object({
   email:yup.string().required('Email is required'),
})
export const editProfile = yup.object({
   FName:yup.string().required('First Name is required'),
   LName:yup.string().required('Last Name is required'),
})


export const addFeedback = yup.object({
   content:yup.string().required('Feedback content is required'),
   
})
export const editCourse = yup.object({
   InstructorId:yup.string().required('InstructorId is required'),
   startDate:yup.string().required('startDate is required'),
   Deadline:yup.string().required('Deadline is required'),
   limitNumberOfStudnet:yup.string().required('limitNumberOfStudnet is required'),
   description:yup.string().required('description is required'),
})

export const addWeeklyHours = yup.object({
   startTime:yup.string().required('Start time is Required'),
   endTime:yup.string().required('End time is Required'),
})
export const addSkills = yup.object({
   skillName:yup.string().required('Skill name is Required'),
})

export const addCode = yup.object({
   code:yup.string().required('code is Required'),
})


export const changePss = yup.object({
   password:yup.string().required('Old password is required'),
   newpassword:yup.string().required('new password is required').min(8,'New Password must have at least 8 characters'),
})


export const editEvent = yup.object({
   name:yup.string().required('name is required'),
   category:yup.string().required('category is required'),
   dateOfEvent:yup.string().required('dateOfEvent is required'),
   content:yup.string().required('content is required'),
})
export const editUndefinedCourse = yup.object({
   name:yup.string().required('name is required'),
   price:yup.string().required('price is required'),
   category:yup.string().required('category is required'),
   startDate:yup.string().required('startDate is required'),
   Deadline:yup.string().required('Deadline is required'),
   totalHours:yup.string().required('totalHours is required'),
   limitNumberOfStudnet:yup.string().required('limitNumberOfStudnet is required'),
   description:yup.string().required('description is required'),
})