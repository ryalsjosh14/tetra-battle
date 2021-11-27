import { useState, /*useMemo,*/ useEffect } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import AppBar from './NavBar';
import Home from './screens/Home';
import Room from './screens/Room';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Settings from './screens/Settings';
import { UserContext } from './UserContext';
import './App.css';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  //console.log(currentUser.username)
  // console.log(localStorage.getItem("user"))

  useEffect(() => {
    if(localStorage.getItem('user')) {
      setCurrentUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  //const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser])
  const value = {currentUser, setCurrentUser}
  function genId() {
    let res = "";
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 10; i++) //create 10 character room ID
      res += chars.at(Math.floor(Math.random() * chars.length));
    
    return res;
  }


  return (
    <div className="App">
      <UserContext.Provider value={value}>
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

          <Route path="/join_room/:id" render={(props) => { /* CANT GET THIS TO TRIGGER BADBADBAD */
            /* return currentUser ? <Room {...props} id={genId()}/> : <Redirect to="/login" />; */
            return <Room {...props} id={null}/> // can pass within url and fetch id from within room
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

          <Route path='*' component={Home} /> {/*if page not found*/}
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
