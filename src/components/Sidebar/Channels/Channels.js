import React, {useState,useEffect} from 'react';
import {Menu, Icon, Modal, Header, Form, Segment, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import firebase from "../../../server/firebase";
import './Channels.css';
import {setChannel} from '../../../store/actionCreator';

const Channels =(props)=>{

    const [modalOpenState, setModalOpenState] = useState(false);
    const [channelAddState, setChannelAddState] = useState({ name: '', description: '' });
    const [isLoadingState, setLoadingState] = useState(false);
    const [channelState, setChannelState]=useState([]);

    const channelsRef = firebase.database().ref("channels");

    useEffect(()=>{
        channelsRef.on('child_added',(snap)=>{
            setChannelState((currentState)=>{
                let updatedState=[...currentState];
                updatedState.push(snap.val())
                if(updatedState.length>0)
                {
                     props.selectChannel(updatedState[0])
                }
                return updatedState
            })
        })
        return()=>channelsRef.off()
        
    },[])

    useEffect(()=>{
        if (channelState.length > 0) {
            props.selectChannel(channelState[0])
        }

    },[!props.channel ?channelState : null ])
    const openModal = () => {
        setModalOpenState(true);
    }

    const closeModal = () => {
        setModalOpenState(false);
    }

    const checkIfFormValid = () => {
        return channelAddState && channelAddState.name && channelAddState.description;
    }

    const displayChannel=()=>{
        if(channelState.length>0)
        {
            return channelState.map((channel)=>{
                
                return(
                    <Menu.Item
                    key={channel.id}
                    name={channel.name}
                    onClick={()=> props.selectChannel(channel)}
                    active={channel.id==props.channel.id}
                    >
                    <span>
                    <Icon name="hashtag"/>
                    </span>
                    {channel.name}
                </Menu.Item>)
            })
        }
    }
    const onSubmit = () => {

        if (!checkIfFormValid()) {
            return;
        }

        const key = channelsRef.push().key;

        const channel = {
            id: key,
            name: channelAddState.name,
            description: channelAddState.description,
            created_by: {
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        }
        setLoadingState(true);
        channelsRef.child(key)
            .update(channel)
            .then(() => {
                setChannelAddState({ name: '', description: '' });
                setLoadingState(false);
                closeModal();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleInput = (e) => {

        let target = e.target;
        setChannelAddState((currentState) => {
            let updatedState = { ...currentState };
            updatedState[target.name] = target.value;
            return updatedState;
        })
    }

    return<>
        <Menu.Menu>
            <Menu.Item>
                <span>
                    <Icon name="exchange"/>Channels
                </span>
                ({channelState.length})
            </Menu.Item>
            {displayChannel()}
            <Menu.Item>
                <span className="clickable" onClick={openModal}>
                    <Icon name="add"/>Add
                </span>
            </Menu.Item>
        </Menu.Menu>
         <Modal open={modalOpenState} onClose={closeModal}>
         <Modal.Header>
             Create Channel
         </Modal.Header>
         <Modal.Content>
             <Form onSubmit={onSubmit}>
                 <Segment stacked>
                     <Form.Input
                         name="name"
                         value={channelAddState.name}
                         onChange={handleInput}
                         type="text"
                         placeholder="Enter Channel Name"
                     />
                     <Form.Input
                         name="description"
                         value={channelAddState.description}
                         onChange={handleInput}
                         type="text"
                         placeholder="Enter Channel Description"
                     />
                 </Segment>
             </Form>
         </Modal.Content>
         <Modal.Actions>
                <Button loading={isLoadingState} onClick={onSubmit}>
                    <Icon name="checkmark" /> Save
                </Button>
                <Button onClick={closeModal}>
                    <Icon name="remove" /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    </>
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        channel:state.channel.currentChannel
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        selectChannel:(channel)=> dispatch(setChannel(channel))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Channels);