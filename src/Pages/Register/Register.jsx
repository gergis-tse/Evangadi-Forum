import React from 'react'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from '../../Pages/Utility/axiosConfig'


import classes from './register.module.css'
const Register = () => {
      const navigate = useNavigate()
      const userNameDom = useRef()
      const firstNameDom = useRef()
      const lastNameDom = useRef()
      const emailDom = useRef()
      const passwordDom = useRef()
      const [errorMessage, setErrorMessage] = useState('')
      const [showPassword, setShowPassword] = useState(false)
      const [isSbmitting, setIsSubmitting] = useState(false)
      const [message, setMessage] = useState('')
      

            // const togglePasswordVisibility = () => {
            //       setShowPassword((prev) => !prev);
            // };


      async function handleSubmit (e) {
            e.preventDefault()    
            const userValue = userNameDom.current.value;
            const emailValue = emailDom.current.value;
            const passwordValue = passwordDom.current.value;
            const firstnameValue = firstNameDom.current.value;
            const lastnameValue = lastNameDom.current.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email  format

            if (!userValue || !emailValue || !passwordValue || !firstnameValue || !lastnameValue) {
                  // return alert('Please fill all fields')
                  return setErrorMessage('Please fill all fields')
            }
            if (!emailRegex.test(emailValue)) {
                  return alert('Please enter a valid email address')
            }
            try {
                  await axios.post('/users/register', {
                        username: userValue,
                        email: emailValue,
                        password: passwordValue,
                        firstname: firstnameValue,
                        lastname: lastnameValue
                  })
                  setMessage('User registered successfully. Please login')
                  console.log('User registered successfully. Please login');
                  
                  navigate('/login')
            } catch (error) {
                  setErrorMessage(error.response?.data?.message || 'Registration failed')
            }
            finally {
                  setIsSubmitting(false)
            }            
      }
      return (
            <section className={classes.registerSection}>
                  <div className={classes.registerContainer}>
                  <h3>
                        Join the network  <br />                       
                  </h3>
                  <p> Already have an account? <Link to='/login'> Sign in</Link> </p>
                  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                  {/* {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>} */}

                  <form className= {classes.username} onSubmit={handleSubmit}>
                        <div className={classes.inputContainer}>                             
                              <input
                                    name='username'
                                    ref={userNameDom}
                                    type="text" 
                                    placeholder='Username'
                                    aria-label='Username'
                                    required
                                    />
                                    
                        </div>
                        <br />
                        <div className={classes.inputGroup}>
                              <input
                                    name='firstname' 
                                    ref={firstNameDom}
                                    type="text" 
                                    placeholder='First Name'
                                    className={classes.fname_inputContainer}
                                    required
                                    />
                                    {/* className={classes.fname_inputContainer} */}
                              <input
                                    className={classes.lname_inputContainer}
                                    ref={lastNameDom} 
                                    type="text" 
                                    placeholder='Last Name'
                                    required
                                    />
                        </div>
                        <br />
                        <div className={classes.inputContainer}>
                              <input 
                                    ref={emailDom} 
                                    type="email" 
                                    placeholder='Email'
                                    required
                                    />
                        </div>
                        <br />
                        <div className={classes.inputContainer}>
                              <input 
                                    ref={passwordDom} 
                                    type={showPassword? "text" : "password" }
                                    placeholder='Password'/>
                              <span 
                                    className={classes.togglePassword} 
                                    
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon 
                                    
                                    />}
                              </span>      

                              {/* <span className={classes.togglePassword} onClick={togglePasswordVisibility}>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}

                              </span> */}

                        </div>
                        <br />
                        <label 
                              className={classes.privacyPolicy}>
                                    I agree to the  <a href="https://www.evangadi.com/legal/privacy/">privacy policy </a> and <a href=" https://www.evangadi.com/legal/terms/">terms of service</a> 
                        </label>
                        <br />
                        <br />
                        <button 
                              className={classes.submitButton} 
                              type='submit' 
                              disabled={isSbmitting} >
                                    {isSbmitting ? 'Submitting...' : 'Agree and Join'}
                        </button>
                  </form>
                  <div className={classes.loginLink}>
                        <p> <Link to="/login">Already have an account? </Link></p>                
                  </div>
                  {/* {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>} */}
                  </div>                  
            </section>
  )
}

export default Register