import { useState } from "react"

const Signup = (props) => {

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

        fetch(window.location.protocol + "//" + window.location.host + '/users/create/', options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));

    }
    
    return (
        <div>
            <div className='container'>
                <div className='form-div'>
                    <form>
                        <input type='text' onChange={changeUsername} value={userName} className="form-control form-group"></input>
                        <input type='text' onChange={changePassword} value={password} className="form-control form-group"></input>
                        <button onClick={onSubmit}> Create Account</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Signup;