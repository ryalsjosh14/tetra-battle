import { useState, useContext } from "react"
import { UserContext } from "../UserContext"
import { Redirect } from "react-router";

const Login = (props) => {

    const lPort = process.env.PORT || 8000;
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");


    const changePassword = (event) => {
        setPassword(event.target.value);
    }

    const changeUsername = (event) => {
        setUserName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(userName);
        const update = {
            username: userName,
            password: password
        }

        const options = {
            method: 'POST',
            mode: 'cors',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
        };

        fetch(window.location.protocol + "//" + window.location.hostname + ':' + lPort + '/users/authenticate/', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.success){
                console.log("successful login");
                console.log(data.user);
                setCurrentUser(data.user);
                //localStorage.setItem("user", JSON.stringify(currentUser))

                //console.log(data.user)
                //console.log(JSON.parse(localStorage.getItem("user")))
                props.history.push("/home"); // send back to home page
            }
            else{
                console.log("failed login");
                alert("Invalid login. Please try again.");
            }
        })       
        .catch(error => console.log(error));

    }
    
    return (
        <div className="login">
            <div className='container'>
                <div className='form-div'>
                    <form>
                        <p>Username</p>
                        <input type='text' onChange={changeUsername} value={userName} className="form-control form-group"></input>
                        <p>Password</p>
                        <input type='text' onChange={changePassword} value={password} className="form-control form-group"></input>
                        <p><button onClick={onSubmit}>Sign In</button></p>
                    </form>
                </div>
            </div>
            <p>Don't have an account?</p>
            <a href='/signup'>Sign up!</a>
        </div>
    );
}

export default Login;