import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App'
import { useHistory, useLocation } from 'react-router';
import { Button, Container } from '@material-ui/core';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';

firebase.initializeApp(firebaseConfig);


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [user, setUser] = useState({})

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                const { displayName, email } = result.user;
                const signedInUser = { name:displayName, email:email }

                console.log(signedInUser);
                setLoggedInUser(signedInUser)
                history.replace(from);
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage);
            });
    }

    const handleInputField = (e) => {
        let validUser;
        if (e.target.name === 'email') {
            validUser = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            const validNum = e.target.value.length > 6
            const validPass = /\d{1}/.test(e.target.value)
            validUser = validNum && validPass
        }
        if (validUser) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = [e.target.value]
            setUser(newUserInfo)
        }
    }

    const handleRegistrationUser = (e) => {
        if (user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    var user = res.user;
                    console.log(user);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorMessage);
                });
        }
        e.preventDefault();
    }


    return (
        <Container fixed>
            <h1>This is Login</h1>
            <Button variant="contained" onClick={handleGoogleSignIn} color="primary">
                <BubbleChartIcon /> Google Sign IN
            </Button>
            <br></br>
            <h2>Sign Up</h2>

            <form action="#" onSubmit={handleRegistrationUser}>
                <input type="text" name="email" id="email" onBlur={handleInputField} placeholder="Your Email" />
                <br></br>
                <input type="password" name="password" id="email" onBlur={handleInputField} placeholder="Your Password" />
                <br></br>
                <input type="submit" value="Create Account" />
            </form>

            <h4>{user.displayName}</h4>
            <p>{user.email}</p>
        </Container>
    );
};

export default Login;