import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const SignInPage = () => {
    
    const Navigate = useNavigate();

    const {userInfo, authToken} = useOutletContext();

    const [user, setUser] = userInfo;
    const [token, setToken] = authToken;
    const [errors, setErrors] = useState('');
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        const value = e.target.value
        switch(e.target.name) {
            case('username'):
                setUsername(value);
                break;
            case('password'):
                setPassword(value)
                break;
        }
    };

    const postData = (e) => {
        e.preventDefault()

        fetch('/auth/sign-in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username, password: password})
        })
        .then(res => {
            if(res.ok) {
               res.json().then(res => {
                   setUser(res.user)
                   setToken(res.token)
               })
               return Navigate('/')
            }
            return res.json().then(res => {
                setErrors(res.info.message)
            })
        })
    }

    return(
        <div>
            <form onSubmit={postData}>
                <input type='email' placeholder="email" name="username" onChange={handleChange} value={username} required></input>
                <input type='password' placeholder="password" name="password" onChange={handleChange} value={password} required></input>
                <button type="submit">Submit</button>
            </form>
            {errors}
        </div>
    )
}

export default SignInPage;