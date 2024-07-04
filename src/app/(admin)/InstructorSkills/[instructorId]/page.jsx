'use client'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../AdminLayout/Layout';
import { UserContext } from '@/context/user/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket, faFilter } from '@fortawesome/free-solid-svg-icons';
import '../../dashboard/dashboard.css'

export default function InstructorSkills({params}) {
    const {userToken, setUserToken, userData}=useContext(UserContext);
    const [instructorSkills,setInstructorSkills] = useState([])
    const [employeeName, setEmployeeName] = useState('');
    const [loading, setLoading] = useState(false);

    // const [pageNumber, setPageNumber] = useState(1);
    // const [pageSize, setPageSize] = useState(10);
    // const [totalPages, setTotalPages] = useState(0);

    const getInstructorSkills = async () =>{
      if(userData){
    try {
      //setLoading(false)
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Skill/GetAllInstructorSkills?instructorId=${params.instructorId}`,
      { headers: { Authorization: `Bearer ${userToken}` }});
      if (data) {
        setInstructorSkills(data.result || []);
      }}
      catch (error) {
      console.log(error)
      }
    }   
  };

  const [employees, setEmployees] = useState([]);


      const fetchEmployees = async () => {
        if(userData){
        try{
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_EDUCODING_API}Employee/GetAllEmployee`);
        setEmployees(data.result.items);
      }
        catch(error){
          console.log(error);
        }}
      };


  useEffect(() => {
    getInstructorSkills();
    fetchEmployees();
    }, [instructorSkills,userData]);  // Fetch courses on mount and when page or size changes
  
//   const handlePageSizeChange = (event) => {
//     setPageSize(event.target.value);
//     setPageNumber(1); // Reset to the first page when page size changes
//   };
  
//   const handlePageChange = (event, value) => {
//     setPageNumber(value);
//   };

  useEffect(() => {
    const employee = employees.find(employee => employee.id == params.instructorId);
    if(employee) {
        setEmployeeName(`${employee.fName} ${employee.lName}`);
    }
}, [employees, params.instructorId]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredISkills = instructorSkills.filter((ISkill) => {
const matchesSearchTerm =
  Object.values(ISkill).some(
    (value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
  );
return matchesSearchTerm ;

 
});

  return (
    <Layout title = {`Skills for "${employeeName}"`}>
        
    <div className="filter py-2 text-end">
        <nav className="navbar">
          <div className="container justify-content-end">
                <form className="d-flex" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                 {/* <FormControl fullWidth className="w-50">
        <InputLabel id="page-size-select-label">Page Size</InputLabel>
        <Select
        className="justify-content-center"
          labelId="page-size-select-label"
          id="page-size-select"
          value={pageSize}
          label="Page Size"
          onChange={handlePageSizeChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl> */}
                <div className="icons d-flex gap-2 pt-2">
                    
                    <div className="dropdown">
  <button className="dropdown-toggle border-0 bg-white edit-pen" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <FontAwesomeIcon icon={faFilter} />
  </button>
  <ul className="dropdown-menu">
 
  </ul>
</div>
<FontAwesomeIcon icon={faArrowUpFromBracket} />
                    
                </div>
                </form>
               

            </div>
        </nav>
        
      </div>
      {/* {employees ? employees.map((employee) =>{
          {params.Instructorid == employee.id ? <h2>Courses for {employee.fName} {employee.lName}</h2> : <p> None </p>}
      }) : <p>None</p>} */}

      <table className="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      
    </tr>
  </thead>
  <tbody>
  {filteredISkills.length ? (
    filteredISkills.map((skill) =>(
      <tr key={skill.id}>
      <th scope="row">{skill.id}</th>
      <td>{skill.name}</td>
     

    </tr>
      ))): (
        <tr>
          <td colSpan="6">No Skills</td>
        </tr>
        )}
    
    
  </tbody>
</table>
{/* <Stack spacing={2} sx={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
     
     <Pagination
     className="pb-3"
       count={totalPages}
       page={pageNumber}
       onChange={handlePageChange}
       variant="outlined"
       color="secondary"
       showFirstButton
       showLastButton
     />
   </Stack> */}


      
    </Layout>
  )
}
