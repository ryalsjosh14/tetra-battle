//import
import { useState, useContext } from "react"
import { userContext } from "../UserContext"

const Login = (props) => {

    const {currentUser, setCurrentUser} = useContext(userContext);

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")


    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const changeUsername = (event) => {
        setUserName(event.target.value)
    }

    const onSubmit = () => {
        console.log(userName)
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

        fetch('http://localhost:8000/users/authenticate/', options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

    }
    
    return (
        <div className="login">
            <div className='container'>
                <div className='form-div'>
                    <form>
                        <input type='text' onChange={changeUsername} value={userName} className="form-control form-group"></input>
                        <input type='text' onChange={changePassword} value={password} className="form-control form-group"></input>
                        <button onClick={onSubmit}>Sign In</button>
                    </form>

                </div>
            </div>
            <p>Don't have an acount?</p>
            <a href='/signup'>Sign up!</a>
        </div>
    );
}

export default Login;