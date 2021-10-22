import {AppBar, Box, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import { userIcon } from './assets/user.jpg'
//import icons from assets folder

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"> {/* gives default color */}
        <Toolbar>
          <IconButton  size="large" edge="end" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <userIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Anti-Matter Tetris
          </Typography>
          <Button color="inherit" href="/home" style={{display: 'flex', justifyContent:'flex-end'}}>Home</Button>
          <Button color="inherit" href="/login" style={{display: 'flex', justifyContent:'flex-end'}}>Login</Button>
          <Button color="inherit" href="/room" style={{display: 'flex', justifyContent:'flex-end'}}>Play</Button>
          <Button color="inherit" href="/settings" style={{display: 'flex', justifyContent:'flex-end'}}>Settings</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;