import Head from 'next/head';
import {useEffect, useState} from "react";
import {auth} from "../firebase/firebase";
import { Button, Container, Dialog, Typography, CircularProgress } from '@mui/material';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import styles from "../styles/landing.module.scss";
import StyledFirebaseAuth from "../components/StyledFirebaseAuth";
import { useRouter } from 'next/router';
import { useAuth } from '@/firebase/auth';

const REDIRECT_PAGE = "/dashboard";


//Firebase UI config
const uiConfig = {
  signInSuccessUrl : REDIRECT_PAGE,

  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID
  ]

}


export default function Home() {

  //set state for the login text change
  const [login, setLogin] = useState(false);
  const router = useRouter();
  const {authUser, isLoading} = useAuth();

//If user is already logged in redirect to dashboard
  useEffect( () =>{
    if (!isLoading && authUser){
      router.push("/dashboard")
    }
  },[])




  return ((isLoading || (!isLoading && !!authUser)) ? 
  <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%' }}/>
  :
    <div>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="An expenses tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>

      <Container className={styles.container}>
        <Typography variant='h1'> Welcome to Expense Tracker</Typography>
        <Typography variant='h3'> Add,View,Edit and Delete expenses</Typography>

        {/* add button for login */}
        <div className={styles.buttons}>
          <Button variant='contained' color='secondary' onClick = {() => setLogin(true)}>
            Login/Register
          </Button>
        </div>
        <Dialog open={login} onClose={ () => setLogin(false)}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}></StyledFirebaseAuth>
        </Dialog>
        

      </Container>


      </main>
    </div>
  )
}
