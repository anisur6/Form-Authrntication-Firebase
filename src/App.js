import './App.css';
import initializeauthentic from './Firebase/firebase.initialize';
import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';






const googleprovider = new GoogleAuthProvider();
const provider = new GithubAuthProvider();


initializeauthentic();

function App() {
  const auth = getAuth();

  const [user, setUser] = useState({})
  //state for email
  const [email, setEmail] = useState('')
  //state for  password 
  const [password, setPass] = useState('')
  //state for error handle
  const [error, setError] = useState('')

  //this is for google sign in button
  const handleclick = () => {
    signInWithPopup(auth, googleprovider)
      .then(result => {
        //akana dstructring kora hoica & tarpor dstructring kora valur gola akta object a nawa hoica... "loggeduser" nam a... tarpor state sat kora hoica .. object tar 
        const { displayName, email, photoURL } = result.user;
        const loggeduser = {
          name: displayName,
          email: email,
          img: photoURL
        }
        setUser(loggeduser);
        console.log(loggeduser);
      });
  }

  //this is for git sign in button
  const handlegit = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
  }

  //this thing is for sign out
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser({});
      })

  }

  //this is for From submission
  const handleRegistration = e => {
    e.preventDefault();
    console.log(email, password);
    if (password.length < 6) {
      setError('please enter 6 digit password.')
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setError('Please enter 1 special caracter')
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })

  }

  //this is for from email handle
  const handleEmailChange = event => {
    setEmail(event.target.value);
  }

  //this is for from password handle
  const handlePasswordChange = event => {
    setPass(event.target.value);
  }

  return (

    <div>
      {!user.name ?
        //ui buttons...
        <div>
          <button onClick={handleclick}>google sign in</button>
          <br />
          <br />
          <button onClick={handlegit}>github sign in</button>
          <br />
          <br />
        </div> :
        <button onClick={handleSignOut}>Sign Out</button>


      }

      {/* this is for showing result after sign in  */}
      {user.email && <div>
        <h2>your name is : {user.name}</h2>
        <h4>your email is : {user.email}</h4>
        <img src={user.img} alt="" />
      </div>

      }

      <hr />
      <Form onSubmit={handleRegistration} className="mx-5 bg-success p-5">
        <h2>Please register</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onBlur={handleEmailChange} type="email" placeholder="Enter email" required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>

          <Form.Control onBlur={handlePasswordChange} type="password" placeholder="Password" required />
          <div>
            <h5>{error}</h5>
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}











export default App;
