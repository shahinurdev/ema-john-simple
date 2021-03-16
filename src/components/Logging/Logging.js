
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fireBase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
firebase.initializeApp(firebaseConfig)
function Loggin() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    photo: '',
  })
  const [loggedInUser,setLoggedUser]= useContext(UserContext);
  const history= useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const singedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(singedInUser)
        console.log(displayName, email)
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }
  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signOut = {
          isSignIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',

        }
        setUser(signOut)
      })
      .catch((error) => {
        // An error happened.
      });
  }
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isValidPassword = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = (isValidPassword && passwordHasNumber);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }

  }
  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      console.log("hahi");
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name)
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedUser(newUserInfo);
          history.replace(from);
          console.log('sign in user info',res.user);

        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();

  }
  const updateUserName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    })
    .then(function () {
     console.log(
       ' Update successful.'
     );
    }).catch(function (error) {
     console.log(error);
    });
  }
  const handleFbSignIn=() => {
    firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;
    console.log('fb user',user);

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });


  }

  return (
    <div style={{textAlign: 'center'}}>

      {
        user.isSignIn ? <button onClick={handleSignOut}>Sign out</button> :
          <button onClick={handleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={handleFbSignIn}>Sign In with facebook</button>

      {
        user.isSignIn && <p> welcome,{user.name}</p>
      }
      <h3>Your own  Authtications</h3>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User SignUp</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" required />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Password" required id="" />
        <br />
        <input type="submit" value={newUser?"Sign Up":"Sign In"} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'create' : 'Loggin'}Success</p>
      }
    </div>
  );
}

export default Loggin;
