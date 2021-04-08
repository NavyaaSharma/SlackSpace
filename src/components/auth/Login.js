import React,{useState} from 'react';
import { Grid, Form, Segment, Header, Icon, Button, Message } from 'semantic-ui-react'
import './Auth.css';
import { Link } from 'react-router-dom';
import firebase from '../../server/firebase';

const Login=()=>{
    let user={
        email:'',
        password:''
    }

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
        return true;
    }

    const isFormEmpty=()=>{
        return !userState.password.length || !userState.email.length;
    }

    const onSubmit=(event)=>{
        seterrorState(()=>[]);
        setIsSuccess(false);
        if(checkForm())
        {
            setIsLoading(true);
            firebase.auth()
            .signInWithEmailAndPassword(userState.email,userState.password)
            .then((createdUser)=>{
                setIsLoading(false);
                setIsSuccess(true)
            })
            .catch((servererror)=>{
                setIsLoading(false);
                seterrorState((error)=>error.concat(servererror));
            })
        }
    }

    const displayerrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }

    return(
        <Grid verticalAlign="middle" textAlign="center" className="grid-form">
            <Grid.Column style={{ maxWidth: '500px' }}>
                <Header icon as="h2">
                    <Icon name="slack"/>
                    Login
                </Header>
        
                <Form onSubmit={onSubmit}>
                    <Segment stacked>
                        <Form.Input name="email" value={userState.email} placeholder="User Email" type="email" onChange={handleInput} icon="mail" iconPosition="left"/>
                        <Form.Input name="password" value={userState.password} placeholder="Password" type="password" onChange={handleInput} icon="lock" iconPosition="left"/>
                    </Segment>
                        <Button disabled={isLoading} loading={isLoading}>Submit</Button>
                </Form>
                {errorState.length>0 && <Message error>
                    <h3>Error</h3>
                    {displayerrors()}
                </Message>}
                {isSuccess && <Message success>
                    <h3>Successfully Logged IN</h3>
                </Message>}
                <Message>
                    Dont't have an account? <Link to="/register" >Register </Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}
export default Login;