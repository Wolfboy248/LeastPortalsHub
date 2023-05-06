import React from 'react';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

import "./login.css";
import img1 from "../imgs/login.png"
import img2 from "../imgs/10.png"
import img3 from "../imgs/11.png"


export default function Login() {

function login() {
    window.location.href="https://lp.ardapektezol.com/api/v1/login"
}
function logout() {
    Cookies.remove('token')
    setToken(null)
    window.location.href="/"
}
const [token, setToken] = React.useState(null);
const isLoggedIn = token !== null;
React.useEffect(() => {
    fetch(`/api/v1/token`)
    .then(r => r.json())
    .then(d => {
      setToken(d.data.token);
      console.log(d);
    })
    }, []);

const [profile, setProfile] = React.useState();
React.useEffect(() => {
    fetch(`/api/v1/profile`,{
        headers: {
			'Content-Type': 'application/json',
            Authorization: token
        }})
    .then(r => r.json())
    .then(d => {setProfile(d);console.log(d)})
    }, [token]);


return (
    <>
    {isLoggedIn ? (
    <Link to="/profile" tabIndex={-1} className='login'>
        <button>
            <img src={img2} alt="" />
            <span>Username</span>
        </button>
        <button onClick={logout}><img src={img3} alt="" /><span></span></button>
    </Link>
    ) : (
    <Link className='login'>
        <button onClick={login}>
            <img src={img2} alt="" />
            <span><img src={img1} alt="Sign in through Steam" /></span>
        </button>
        <button disabled><span></span></button>
    </Link>
    )}
     </>   
        )
}


