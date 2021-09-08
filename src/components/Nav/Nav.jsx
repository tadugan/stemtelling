import React from 'react';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Grid, Toolbar } from '@material-ui/core';
import Logo from './LogoDark.svg';

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

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    handleClose();
  };

  const handleHistoryPush = (destination) => {
      history.push(`/${destination}`);
      handleClose();
  }

  const conditionalMenu = () => {
    // displays menu items if a user is a student
    if (user.authority === 'student') {
        return (
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
              <MenuItem onClick={() => handleHistoryPush('homepage')}>
                  Home
              </MenuItem>
              <MenuItem onClick={() => handleHistoryPush(`myprofile`)}>
                  Profile
              </MenuItem>
              <MenuItem onClick={() => handleHistoryPush('create')}>
                  Create STEMtell
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                  Logout
              </MenuItem>
            </Menu>
        );
    }
    else if (user.authority === 'teacher') {
      return (
          <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                maxHeight: ITEM_HEIGHT * 6.5,
                width: '20ch',
                },
              }}
              >
              <MenuItem onClick={() => handleHistoryPush('homepage')}>
                  Home
              </MenuItem>
              <MenuItem onClick={() => handleHistoryPush(`profile/${user.id}`)}>
                  Profile
              </MenuItem>
              <MenuItem onClick={() => handleHistoryPush('create')}>
                  Create STEMtell
              </MenuItem>
              <MenuItem onClick={() => handleHistoryPush('teacher/review')}>
                  Review STEMtells
              </MenuItem>
              <MenuItem onClick={() => handleHistoryPush('classlist')}>
                  Class List
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                  Logout
              </MenuItem>
          </Menu>
      );
    }
    else {
        return (
          <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                maxHeight: ITEM_HEIGHT * 6.5,
                width: '20ch',
                },
              }}
              >
              <MenuItem onClick={() => handleHistoryPush('login')}>
                  Login
              </MenuItem>
              <MenuItem onClick={() => handleHistoryPush('registration')}>
                  Register
              </MenuItem>
              <MenuItem onClick={() => handleHistoryPush('about')}>
                  About STEMtelling
              </MenuItem>
          </Menu>
        );
    }
  }

  return (
      <div>
          <AppBar position="static">
            <Toolbar>
              <Grid
                  container
                  spacing={0}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
              >
                <Grid
                  item
                >
                  <img src={Logo} id="logo" onClick={() => {history.push('/')}}/>
                </Grid>
                <Grid
                  item
                >
                  <div>
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                      color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                        {conditionalMenu()}
                    </div>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
      </div>
  );
}

    
export default Nav;
