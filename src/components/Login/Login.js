import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../Store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer =(state , action)=>{
  if(action.type =="USER_INPUT"){
    return {
      value: action.val,
      isValid: action.val.includes('@')
    }
  }
  if(action.type =="INPUT_BLUR"){
    return {
      value: state.value,
      isValid: state.value.includes('@')
    }
  }
  return {
    value:'',
    isValid: false
  }
}

const passwordReducer =(state , action)=>{
  if(action.type=='USER_INPUT'){
   return{ value: action.val,
    isValid:action.val.length >6
   }
  }
  if(action.type=="INPUT_BLUR"){
    return {
      value : state.value,
      isValid: state.isValid
    }
  }
  
  return {
    value :'',
    isValid : false
  }

}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState , dispatchEmail] = useReducer(emailReducer,{value:"",isValid:false})
  const [passwordState , disptachPassword] = useReducer(passwordReducer,{value:" ", isValid:false})
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);
const {} = emailState;
const {} = passwordState
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailState.isValid && passwordState.isValid 
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailState, passwordState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT" , val: event.target.value})

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    disptachPassword({type:"USER_INPUT",val:event.target.value})

    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    disptachPassword({type:"INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, emailState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
       <Input id="email" type="email" label="E-mail" onBlur={validateEmailHandler} onChange={emailChangeHandler} value={emailState.val}/>
       <Input id="password" type="password" label="Password" onBlur={validatePasswordHandler} onChange={passwordChangeHandler} value={passwordState.val}/>
        
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
