import { useState, useContext } from "react"

import { UserContext } from "../UserContext"
const Signup = (props) => {

    const {currentUser, setCurrentUser} = useContext(UserContext);

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")


    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const changeUsername = (event) => {
        setUserName(event.target.value)
    }

    const onSubmit = (event) => {
        console.log(userName)
        event.preventDefault();
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

        fetch(window.location.protocol + "//" + window.location.hostname + ':8000/users/create/', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.success){
                console.log("successful creation");
                setCurrentUser(data.user);
                console.log(currentUser);
                props.history.push("/home");
            }
            else{
                console.log("failed login")
                alert("invalid login, please try again")
            }
        })
        .catch(error => console.log(error));

    }
    
    return (
        <div>
            <div className='container'>
                <div className='form-div'>
                    <form>
                        <p>Username</p>
                        <input type='text' onChange={changeUsername} value={userName} className="form-control form-group"></input>
                        <p>Password</p>
                        <input type='text' onChange={changePassword} value={password} className="form-control form-group"></input>
                        <p><button onClick={onSubmit}> Create Account</button></p>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Signup;