'use client';
import './navbar.css'
import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import { useRouter } from 'next/navigation'
const pages = ['About', 'ContactUs', 'FAQ', 'AllCourses', 'AllEvents'];
const settings = ['Login', 'Register'];

import { UserContext } from '@/context/user/User';
export default function Navbar({role}) {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {userToken, setUserToken,userData, setUserData,setUserId,userId}=useContext(UserContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    setUserData(null);
    setUserId(null);
    router.push("/login");
    };


  return (
    <AppBar position="fixed" className='nav'>
      <Container maxWidth="xl">
        <Toolbar disableGutters  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }} >
          {/* <Link className='text-decoration-none d-flex gap-1 text-white' href='/'> */}
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href='/'
            
            sx={{
              // mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            // className='justify-content-center'
          >
            {/* LOGO */}
            {/* <Link href='/'> */}
            <img src="/logoEdu.png" alt="" className='img-fluid w-50' />
            {/* </Link> */}
          </Typography>
          
          

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">
                {userToken  && ((role == "admin" &&
              <Button
              key='1'
              // onClick={handleCloseNavMenu}
              // onClick={() => router.push('/dashboard')}
              sx={{ display: 'block' }}
            >
               <Link href="/dashboard" color="black" underline='none' >Dashboard</Link>
               {/* { Dashboard} */}
            </Button>
          )
             || (role == "main-subadmin" &&
              <Button
              key='1'
              // onClick={handleCloseNavMenu}
              // onClick={() => router.push('/dashboardM')}
              sx={{   display: 'block' }}
            >
               <Link href="/dashboardM" color="black"  underline='none' >Dashboard</Link>
               {/* Dashboard */}
            </Button>)||
            (role == "subadmin" &&
            <Button
            key='1'
            // onClick={handleCloseNavMenu}
            // onClick={() => router.push('/dashboardS')}
            sx={{  display: 'block' }}
          >
             <Link href="/dashboardS" color="black" underline='none' >Dashboard</Link>
             {/* Dashboard */}
          </Button>)||
          (role == "instructor" &&
          <Button
          key='1'
          // onClick={handleCloseNavMenu}
          // onClick={() => router.push('/myDashboard')}
          sx={{   display: 'block' }}
        >
           <Link href="/dashboardI" underline='none' color="black" >Dashboard</Link>
           {/* Dashboard */}
          
        </Button>)||
        (role == "student" &&
        <Button
        key='1'
        // onClick={handleCloseNavMenu}
        // onClick={() => router.push('/MyDashboard')}
        sx={{  display: 'block' }}
      >
         <Link href="/MyDashboard" color="black" underline='none' >Dashboard</Link>
         {/* Dashboard */}
      </Button>)
                    
          )
            }
              </Typography>
              
              </MenuItem>
              {pages.map((page) => (
                          
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Link href = '/' className='d-flex text-decoration-none gap-1' > */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              // mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              
            }}
            className='justify-content-center'
          >
            {/* LOGO */}
            <img src="/logoEdu.png" alt="" className='img-fluid w-50' />
          </Typography>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {userToken  && ((role == "admin" &&
              <Button
              key='1'
              // onClick={handleCloseNavMenu}
              // onClick={() => router.push('/dashboard')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
               <Link href="/dashboard" color="inherit" underline='none' >Dashboard</Link>
               {/* { Dashboard} */}
            </Button>
          )
             || (role == "main-subadmin" &&
              <Button
              key='1'
              // onClick={handleCloseNavMenu}
              // onClick={() => router.push('/dashboardM')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
               <Link href="/dashboardM" color="inherit" underline='none' >Dashboard</Link>
               {/* Dashboard */}
            </Button>)||
            (role == "subadmin" &&
            <Button
            key='1'
            // onClick={handleCloseNavMenu}
            // onClick={() => router.push('/dashboardS')}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
             <Link href="/dashboardS" color="inherit" underline='none' >Dashboard</Link>
             {/* Dashboard */}
          </Button>)||
          (role == "instructor" &&
          <Button
          key='1'
          // onClick={handleCloseNavMenu}
          // onClick={() => router.push('/myDashboard')}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
           <Link href="/dashboardI" color="inherit" underline='none' >Dashboard</Link>
           {/* Dashboard */}
          
        </Button>)||
        (role == "student" &&
        <Button
        key='1'
        // onClick={handleCloseNavMenu}
        // onClick={() => router.push('/MyDashboard')}
        sx={{ my: 2, color: 'white', display: 'block' }}
      >
         <Link href="/MyDashboard" color="inherit" underline='none' >Dashboard</Link>
         {/* Dashboard */}
      </Button>)
                    
          )
            }
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                // onClick={() => router.push(`/${page}`,undefined, { shallow: true })}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  <Link href={`/${page}`} color="inherit" underline='none' >{page}</Link> 
                {/* {page} */}
              </Button>
            ))}
          </Box>
        
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
             {/* <Avatar alt="Remy Sharp" /> */}
             {userData&&userData.imageUrl?(  
            <Avatar alt="profile picture" src={userData.imageUrl} sx={{ width: 50, height: 50,mr:5 ,}} />
            ):(<Avatar alt="Remy Sharp" sx={{ width: 50, height: 50,mr:5 ,}} />)} 
                
              </IconButton>
            </Tooltip>
           

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
             
              {!userToken? <>{(settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link href='/login' color="inherit"  underline='none'>{setting}</Link>
                </MenuItem>
              )))}</>: (<MenuItem onClick={logout} >
              Log out
            </MenuItem>)}

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
