import styled from 'styled-components';
import Head from 'next/head';
import { Button } from '@material-ui/core';
import {auth, provider} from '../firebase';

function login() {
    
    const signIn = () => {
       // google login
        auth.signInWithPopup(provider).catch(alert);
    };
    
    
    return (
       <Container>
           <Head>
               <title>Login</title>
           </Head>
       
       <LoginContainer>
            <Logo 
                src='https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg'
                alt=''
            />
            <Button onClick={signIn} variant ='outlined'>Sign in with google</Button>
       </LoginContainer>
       
       </Container>
    )
}

export default login;

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 100vh;
    background-color: whitesmoke;
`;


const LoginContainer = styled.div`
    display:flex;
    flex-direction: column;
    padding: 100px;
    align-items: center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0.7, 0.7)
`;


const Logo = styled.img`
    height: 350px;
    width: 400px;
    margin-bottom: 50px;
`;