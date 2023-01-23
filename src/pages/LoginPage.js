import { Alert, Button, Container, FormControlLabel, Grid, IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import {useForm} from "react-hook-form"
import {FormProvider,FCheckbox,FTextField} from "../components/form"
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from "@mui/lab/LoadingButton"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"
import apiService from '../app/apiService'
import useAuth from '../hooks/useAuth'
import { Box } from '@mui/system'
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';



const loginSchema=Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const defaultValues={
  email:"",
  password:"",
  remember:true
}

function LoginPage() {
  const auth=useAuth()
  const location=useLocation();
  const from=location.state?.from?.pathname||"/"
  const navigate=useNavigate()
  const [showPassword,setShowPassword]=useState(true)
  const methods=useForm({
    resolver:yupResolver(loginSchema),
    defaultValues
  })
  const {
    setError,
    handleSubmit,
    formState:{errors,isSubmitting},
    reset
  }=methods

  const onSubmit=async(data)=>{
    
    const {email,password}=data
    try {
      await auth.login({email,password},()=>{
        navigate(from,{replace:true})
      })
    } catch (error) {
      reset()
      setError("responseError",error)
    }
  }

  const loginWithFacebook = async () => {
    await auth.loginFacebook() 
  };

  const loginWithGoogle = async () => {
    await auth.loginGoogle()
  };
  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
   
        <Stack spacing={3}>
            <Box sx={{textAlign:"center"}} >
              <Typography
                color="textPrimary"
                variant="h4"
               
              >
                Sign In
              </Typography>
         
            </Box>
          {!!errors.responseError&&<Alert severity='error'>{errors.responseError.message}</Alert>}
          <Alert severity='info'>
            Don't have an account  {" "}
            <Link component={RouterLink} to="/register" variant='subtitle2' >Get started</Link>
          </Alert>

         
           
          <FTextField name="email" label="Email"/>
          <FTextField 
          name="password" 
          label="Password"
          type={showPassword ?'password':'text'}
          InputProps={{
            endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword((showPassword)=>!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
            
              />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb:2}}>
          <FCheckbox name="remember" label="Remember"/>
          <Link component={RouterLink} to="/" variant='subtitle2'>Forgot password?</Link>
        </Stack>
        <Box sx={{mb:3}}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
               
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={loginWithFacebook}
                  size="small"
                  variant="contained"
                >
                 Facebook
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >

                <Button
                  color="error"
                  fullWidth
                  onClick={loginWithGoogle}
                  size="small"
                  startIcon={<GoogleIcon />}
                  variant="contained"
                >
                 Google
                </Button>
              </Grid>
            </Grid>
            </Box>
        <LoadingButton
        fullWidth
        type='large'
        variant='contained'
        loading={isSubmitting}>
          Submit
        </LoadingButton>
      </FormProvider>
    </Container>
  )
}

export default LoginPage
