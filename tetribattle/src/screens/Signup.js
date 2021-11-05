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
        const update = {
            username: {userName},
            password: {password}
        }

        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
        };

        fetch('http://localhost:8000/', options)
        .then(response => response.json())
        .then(data => console.log(data));

    }
    
    return (
        <div>
            <div className='container'>
                <div className='form-div'>
                    <form>
                        <input type='text' onChange={changeUsername} value={userName} className="form-control form-group"></input>
                        <input type='text' onChange={changePassword} value={password} className="form-control form-group"></input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;