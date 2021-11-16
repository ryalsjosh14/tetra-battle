import { useState } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import AppBar from './NavBar';
import Home from './screens/Home';
import Room from './screens/Room';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Settings from './screens/Settings';
import UserContext from './UserContext';
import './App.css';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
/*   const getUser = () => {

  } */

  function genId() {
    let res = "";
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 10; i++) //create 10 character room ID
      res += chars.at(Math.floor(Math.random() * chars.length));
    
    return res;
  }

  return (
    <div className="App">
      {/*<UserContext.Provider value={currentUser, setCurrentUser}> */}
      <AppBar /* user={currentUser} */ /> {/* provide different options (login, signup, logout, based on current loggedi n user) */}

      <Switch>
        <Route exact path="/">
          <Redirect to="/home"/>
        </Route>

        <Route path="/home" render={() => {
          return <Home />
        }}/>
        
        <Route path="/room" render={(props) => {
          /* return currentUser ? <Room {...props} id={genId()}/> : <Redirect to="/login" />; */
          return <Room {...props} id={genId()}/>
        }}/>

        <Route path="/login" render={(props) => {
          return <Login {...props}/>
        }}/>

        <Route path="/signup" render={(props) => {
          return <Signup {...props}/>
        }}/>

        <Route path="/settings" render={(props) => {
          return <Settings {...props}/>
        }}/>
      </Switch>
      {/*</UserContext.Provider> */}
    </div>
  );
}

export default App;
