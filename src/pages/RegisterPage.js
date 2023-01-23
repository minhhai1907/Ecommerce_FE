import React, { useState } from 'react'
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useForm } from 'react-hook-form'
import { Alert, Container, IconButton, InputAdornment, Link, Stack } from '@mui/material'
import { FormProvider, FTextField } from '../components/form'
import apiService from '../app/apiService'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import {Link as RouterLink} from 'react-router-dom'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoadingButton from '@mui/lab/LoadingButton'

const RegisterSchema=Yup.object().shape({
  name:Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
})
const defaultValues={
  name:"",
  email:"",
  password:"",
  passwordConfirmation:""

}



function RegisterPage() {
  const auth=useAuth()
  const navigate=useNavigate()
  const [showPassword,setShowPassword]=useState(false)
  const [showPasswordConfirm,setShowPasswordConfirm]=useState(false)
  const methods=useForm({
    resolver:yupResolver(RegisterSchema),
    defaultValues
  })
  const {
    setError,
    handleSubmit,
    formState:{errors,isSubmitting},
    reset
  }=methods

  const onSubmit=async(data)=>{
    try {
      const {name,email,password}=data
      await auth.register({name,email,password},()=>{
         navigate("/",{replace:true})
      })
    } catch (error) {
      reset()
      setError("responseError",error)
    }
   
    }
  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {!!errors.responseError&&<Alert severity='error'>{errors.responseError.message}</Alert>}
            <Alert severity='info'>You already have an account?
              <Link component={RouterLink} to="/">Log in</Link>
            </Alert>
            <FTextField name="name" label="Full Name"/>
            <FTextField name="email" label="Email"/>
            <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
            <FTextField
            name="passwordConfirmation"
            label="Password-Confirmation"
            type={showPasswordConfirm ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton
          type='submit'
          fullWidth
          size='large'
          variant='contained'
          loading={isSubmitting}>
            Register
          </LoadingButton>
          </Stack>
      </FormProvider>
    </Container>
  )
}

export default RegisterPage
