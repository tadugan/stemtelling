import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const studentOptions = [
  'Home',
  'Profile',
  'Create',
  'Logout'
];

const teacherOptions = [
  'Home',
  'Profile',
  'Create',
  'Review STEMtells',
  'Class List',
  'Logout'
]

const ITEM_HEIGHT = 48;


function Nav() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHome = () => {
    history.push('/user')
  };

  const handleProfile = () => {
    history.push()
  };
  
  const handleCreate = () => {
    history.push()
  };

   const handleLogout = () => {
  //   dispatch({ type: 'LOGOUT' })
   };

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a student is logged in, show these links */}
        {user.id && (
          // <>
          //   <Link className="navLink" to="/user">
          //     Home
          //   </Link>

          //   <Link className="navLink" to="/info">
          //     Info Page
          //   </Link>

          //   <LogOutButton className="navLink" />
          // </>
          <div>
            <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            >
          <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
              },
            }}
          >
            {/* Will NEED edit this portion to work depending on what is clicked */}
            {studentOptions.map((option) => (
              <MenuItem key={option} selected={option === 'Home'} onClick={handleHome}>
              {option}
              </MenuItem>,
              <MenuItem key={option} selected={option === 'Profile'} onClick={handleProfile}>
              {option}
              </MenuItem>,
              <MenuItem key={option} selected={option === 'Create'} onClick={handleCreate}>
              {option}
              </MenuItem>,
              <MenuItem key={option} selected={option === 'Logout'} onClick={handleLogout}>
              {option}
              </MenuItem>
            ))}
            </Menu>
          </div>
 
        )}


        {/* If a teacher is logged in, show these links */}
        {/* {user.id && (
          <div>
            <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            >
          <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
              },
            }}
          >
            {teacherOptions.map((option) => (
              <MenuItem key={option} selected={option === 'Home'} onClick={handleHome}>
              {option}
              </MenuItem>
            ))}
            </Menu>
          </div>
 
            )}*/}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

    
export default Nav;
