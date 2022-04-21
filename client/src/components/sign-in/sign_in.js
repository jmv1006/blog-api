import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
    
    const Navigate = useNavigate();

    const postData = (e) => {
        e.preventDefault()

        fetch('/auth/sign-in', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:e.target.username.value, password: e.target.password.value})
        })
        .then(res => {
            if(res.ok) {
               res.json().then(res => console.log(res))
               return Navigate('/')
            }
            return res.json().then(res => console.log(res))
        })
    }

    return(
        <div>
            <form onSubmit={postData}>
                <input type='email' placeholder="email" name="username" required></input>
                <input type='password' placeholder="password" name="password" required></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignInPage;