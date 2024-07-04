import { UserContext } from '@/context/user/User';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import './Profile.css'
export default function ViewWeeklyHours({id}) {
    const {userToken, setUserToken, userData}=useContext(UserContext);
    const [weeklyHours, setWeeklyHours] = useState([]);

    const fetchWeeklyHours = async () => {
        if(userData&&userToken){
        try{
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Instructor/GetInstructorOfficeHours?Instructorid=${id}`,
        {headers :{Authorization:`Bearer ${userToken}`}}

        );
        setWeeklyHours(data.result);
      }
        catch(error){
          console.log(error);
        }
      }
      };

      useEffect(() => {
        fetchWeeklyHours();
      }, [weeklyHours,userData, userToken]);

      const renderWeeklyHours = () => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const hoursByDay = {};

        // Initialize hoursByDay with all days set to "Unavailable"
        daysOfWeek.forEach(day => {
            hoursByDay[day] = [];
        });

        // Group hours by day
        weeklyHours.forEach(hour => {
            const { day, startTime, endTime } = hour;
            hoursByDay[day].push({ startTime, endTime });
        });

        // Render the hours for each day
        return daysOfWeek.map(day => (
            <div key={day} className="day-container">
                <h4 className='wh'>{day}</h4>
                {hoursByDay[day].length === 0 ? (
                    <p>Unavailable</p>
                ) : (
                    <ul>
                        {hoursByDay[day].map(({ startTime, endTime }, index) => (
                            <li key={index}>
                                {startTime} - {endTime}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        ));
    };
  return (
<div className='p-5'>
<h2 className='pr '>Weekly Hours</h2>
<div className="row justify-content-center ps-3">
{renderWeeklyHours()}
</div>
</div>
)
}
