import React, {useState} from 'react';
import { Grid, Form, Segment, Header, Icon, Button, Message } from 'semantic-ui-react'
import './Auth.css';
import { Link } from 'react-router-dom';
import firebase from '../../server/firebase';

const Register=()=>{
    let user={
        username:'',
        email:'',
        password:'',
        confirmpassword:''
    }

    let User=firebase.database().ref('users');
    let errors=[];
    const [userState, setuserState]=useState(user);
    const [errorState, seterrorState]=useState(errors);
    const [isLoading, setIsLoading]=useState(false);
    const [isSuccess, setIsSuccess]=useState(false);

    const handleInput=(event)=>{
        let target=event.target;
        setuserState((currentState)=>{
            let currentUser={...currentState};
            currentUser[target.name]=target.value;
            return currentUser;
        })
    }

    const checkForm=()=>{
        if(isFormEmpty())
        {
            seterrorState((error)=>error.concat({message:"Please fill out all fields"}));
            return false;
        }
        else if(!checkPassword())
        {
            return false;
        }
        return true;
    }

    const isFormEmpty=()=>{
        return !userState.username.length || !userState.password.length || !userState.email.length || !userState.confirmpassword.length;
    }

    const checkPassword=()=>{
        if(userState.password.length<8)
        {
            seterrorState((error)=>error.concat({message:"Password length should be atleast 8 characters"}));
            return false;
        }
        else if(userState.password!==userState.confirmpassword)
        {
            seterrorState((error)=>error.concat({message:"Passwords and confirm password should match"}));
            return false;
        }
        return true;
    }

    const onSubmit=(event)=>{
        seterrorState(()=>[]);
        setIsSuccess(false);
        if(checkForm())
        {
            setIsLoading(true);
            firebase.auth()
            .createUserWithEmailAndPassword(userState.email,userState.password)
            .then((createdUser)=>{
                setIsLoading(false);
                updateUserDetails(createdUser);
            })
            .catch((servererror)=>{
                setIsLoading(false);
                seterrorState((error)=>error.concat(servererror));
            })
        }
    }

    const updateUserDetails=(createdUser)=>{
        if(createdUser)
        {
            setIsLoading(true);
            createdUser.user
            .updateProfile({
                displayName:userState.username,
                photoURL:`http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`
            })
            .then(()=>{
                setIsLoading(false);
                saveUserInDB(createdUser);
            })
            .catch((servererror)=>{
                setIsLoading(false);
                seterrorState((error)=>error.concat(servererror));
            })
        }
    }

    const saveUserInDB=(createdUser)=>{
        setIsLoading(true);
        User.child(createdUser.user.uid).set({
            displayName:createdUser.user.displayName,
            photoURL:createdUser.user.photoURL
        })
        .then(()=>{
            setIsLoading(false);
            setIsSuccess(true);
        })
        .catch((servererror)=>{
            seterrorState((error)=>error.concat(servererror));
        })
    }

    const displayerrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }
    return(
        <Grid verticalAlign="middle" textAlign="center" className="grid-form">
            <Grid.Column style={{ maxWidth: '500px' }}>
                <Header icon as="h2">
                    <Icon name="slack"/>
                    Register
                </Header>
        
                <Form onSubmit={onSubmit}>
                    <Segment stacked>
                        <Form.Input name="username" value={userState.username} placeholder="User Name" type="text" onChange={handleInput} icon="user" iconPosition="left"/>
                        <Form.Input name="email" value={userState.email} placeholder="User Email" type="email" onChange={handleInput} icon="mail" iconPosition="left"/>
                        <Form.Input name="password" value={userState.password} placeholder="Password" type="password" onChange={handleInput} icon="lock" iconPosition="left"/>
                        <Form.Input name="confirmpassword" value={userState.confirmpassword} placeholder="Confirm Password" type="password" onChange={handleInput} icon="lock" iconPosition="left"/>
                    </Segment>
                        <Button disabled={isLoading} loading={isLoading}>Submit</Button>
                </Form>
                {errorState.length>0 && <Message error>
                    <h3>Error</h3>
                    {displayerrors()}
                </Message>}
                {isSuccess && <Message success>
                    <h3>Successfully Registered</h3>
                </Message>}
                <Message>
                    Already an User? <Link to="/login" >Login </Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
export default Register;
