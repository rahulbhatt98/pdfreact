import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import {Form, Button} from 'react-bootstrap';
import Logo from "assets/logo.svg";
import {userIcon, passWord} from "utils/icons";
import classes from "./login.module.scss";
import { useNavigate ,Link } from "react-router-dom";
import { getLogin } from 'store/actions/user'
import  {useSelector,useDispatch } from "react-redux"
import {RootState} from 'store/reducers/index'
import { getUserDetail } from "store/actions/user";
const Login = () => {
    const { register,formState: { errors },handleSubmit } = useForm();
    const dispatch = useDispatch()
    const [ email,setEmail ] = useState<string|null>('')
    const [ password,setPassword ] = useState<string|null>('')
    const {isLoading,isErrored,isLoggedIn, user} = useSelector( (state: RootState)=>state.user)
    const [errormsg,setErrormsg] = useState('')
     const navigate = useNavigate()
     const onhandleSubmit=(event:any)=>{
        if(email&&password)
        dispatch(getLogin({email,password}))
  }

  
  useEffect(()=>{
    if (isLoggedIn) {
        dispatch(getUserDetail())

        navigate('/',{
            state:email
        });
       
      }
      if( isErrored ) {
        setErrormsg(user.data) 
    }
  },[isLoading])

                    
  return (
    <>
        <section className="login-main d-flex w-100 justify-content-center align-items-center">
            <div className="d-flex login-bx align-items-center justify-content-center p-5 flex-column">
                <img src={Logo} alt="Logo" width={'250px'} className="mb-4"/>
                <Form className="w-100" onSubmit={handleSubmit((e:any)=>onhandleSubmit(e))}>
                    <Form.Group className={classes.inputOuter} controlId="email">
                        <span className={classes.emailIcon}>{userIcon}</span>
                        <Form.Control 
                        className={classes.input} 
                       
                        {...register("username", 
                        {required: "Please enter a username." })} // custom message
                        onChange={(e)=>{ 
                        setErrormsg('')
                        setEmail(e.target.value)}} 
                        placeholder="Username"
                        />
                        {errors.username?.type=== 'required'  && "Please enter a valid email "}
                    </Form.Group>

                    <Form.Group className={classes.inputOuter} controlId="password">
                        <span className={classes.emailIcon}>{passWord}</span>
                        <Form.Control
                        
                        className={classes.input} type="password" onChange={(e)=>{
                            setErrormsg('')
                            setPassword(e.target.value)}} placeholder="Enter Password" required/>
                        {errors.email?.type === 'required' && "Please enter password "}
                    </Form.Group>
                    {errormsg && <div className="text-danger mb-3">{errormsg}</div>}
                    <Button variant="primary" type="submit"  className={classes.loginBtn}>
                        LOGIN
                    </Button>
                </Form>
                <div className="mt-3"><Link to="#">Forgot Password</Link></div>
            </div>
        </section>

    </>
)
}

export default Login;