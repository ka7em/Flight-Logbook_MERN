import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faS, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { library, dom, config, IconProp } from "@fortawesome/fontawesome-svg-core";
import axios from 'axios';
import { response } from 'express';
import {useNavigate, Link} from 'react-router-dom'
library.add(faS,faUserTie )

const theme = createTheme();

export default function Signup() {
  let navigate = useNavigate();
 const [user, setUser] = useState({
   name:"", fname:"",lname:"",email:"",password:"", password_confirmation:""
 });

let name, value

 const handleInputs = (e: { target: { name: any; value: any; }; }) => {
       name = e.target.name
       value = e.target.value
      setUser({...user, [name]:value})
 }

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
 // const data = new FormData(e.currentTarget);
  //  const body: any = {}
  let { name, fname, lname,  email, password, password_confirmation } = user
   await axios.post("http://localhost:3000/signup",{name, fname, lname,  email, password, password_confirmation })
    .then((res) => {
      if(res.data.success===true){
        console.log(res.data.result._id)
        window.alert("Account Created Sucessfully")
            navigate(`/`);
       }
    }).catch((error) => {
      console.log(error.response.status)
      if(error.response.status===423){
        window.alert("User email already Exists")
       }
       if(error.response.status===421){
        window.alert("Passwords not matching!!!")
       }
    })
  //  console.log("Response: ", res)



  //  else window.alert("please try later");
}
const [error, setError] = useState(null);

// const httpCall = async (method: string, url:string, data?:{name:string, fname:string, lname?:string,  email:string, password:string, password_confirmation?:string }, callback?:(result:any)=>any) =>{
//   var xhr = new XMLHttpRequest();
//   xhr.open(method, url, true);
//   if (data != null) {
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify(data));
//     console.log( data );
//     window.alert("Account Created Sucessfully")
//     navigate(`/signin`);
// }
//   if (callback) xhr.onload = function() { let v = callback(JSON.parse(this['responseText']));
//    console.log(v)
// };
//   // else xhr.send();
//   else window.alert("please try later");
// }



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'black', width: 50, height: 50  }}>
            {/* <LockOutlinedIcon /> */}
            {/* <FontAwesomeIcon icon="fa-solid fa-user-tie" /> */}
            <FontAwesomeIcon icon= {["fas", "user-tie"]}  />

          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" method='POST'  onSubmit={handleSubmit} noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={9.6} >
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  name="name"
                  autoComplete="name"
                  value={user.name}
                  onChange={handleInputs}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  value={user.fname}
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="family-name"
                  value={user.lname}
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  id="password_confirmation"
                  autoComplete="new-password"
                  value={user.password_confirmation}
                  onChange={handleInputs}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}

            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
