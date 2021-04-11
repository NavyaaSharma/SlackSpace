import {SET_USER, SET_CHANNEL} from './actionType';

export const setUser=(user)=>{
    return{
        type:SET_USER,
        payload:{
            currentUser:user
        }
    }
}

export const setChannel=(channel)=>{
    return{
        type:SET_CHANNEL,
        payload:{
            currentChannel:channel
        }
    }
}