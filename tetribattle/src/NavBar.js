import {AppBar, Box, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
//import { userIcon } from './assets/user.jpg';
import { /*useState,*/ useContext } from "react";

import { UserContext } from "./UserContext";

//import icons from assets folder

const NavBar = (props) => {

  const { currentUser, setCurrentUser } = useContext(UserContext);

  let loginButton;
  if (currentUser){
    loginButton = (<h1>{currentUser.username}</h1>)
  }
  else{
    loginButton = (<Button color="inherit" href="/login" style={{display: 'flex', justifyContent:'flex-end'}}>Login</Button>)
  }

  const LogOut = (props) => { //TODO redirect back to home page after logout
    setCurrentUser(null);
    //props.history.push('/home');
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"> {/* gives default color */}
        <Toolbar>
          <IconButton  size="medium" edge="end" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            {/* <UserIcon /> */}
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Anti-Matter Tetris
          </Typography>
          <Button color="inherit" href="/home" style={{display: 'flex', justifyContent:'flex-end'}}>Home</Button>

          { currentUser
              ? <Button color="inherit" href="/room" style={{display: 'flex', justifyContent:'flex-end'}}>Play</Button>
              : <Button title="Please login to play" style={{display: 'flex', color: 'grey', justifyContent:'flex-end'}}>Play</Button>
          }

          <Button color="inherit" href="/settings" style={{display: 'flex', justifyContent:'flex-end'}}>Settings</Button>
          {loginButton}
          { currentUser ? <Button color="inherit" style={{display: 'flex', justifyContent:'flex-end'}} onClick={LogOut}> Logout </Button> : <p></p>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
