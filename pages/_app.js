import '../styles/globals.css'
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth, db} from '../firebase';
import Login from './login';
import Loading from '../components/Loading';
import firebase from 'firebase';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  // react firebase hook
  const [user, loading] = useAuthState(auth);
  

  useEffect(() => {
    // NOSQL connection to database
    if (user) {
      db.collection('users').doc(user.uid).set({
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL
      }, 
      { merge: true })
    }
  }, [user]);

  // if app is in loading state, render this component
  if(loading) return <Loading />
  
  // before anything renders check if user is logged in
  if(!user) return <Login />
  
  return <Component {...pageProps} />
}

export default MyApp
