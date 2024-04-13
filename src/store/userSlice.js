import { createSlice } from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:"cart",
    initialState:{
        loggedIn:JSON.parse(localStorage.getItem("isAuth")||false),
        user:(JSON.parse(localStorage.getItem("user")) || {})
        
    },
    reducers:{
        login(state,action){

            const userLoggedIn=action.payload;
            return {...state,loggedIn:true, user:userLoggedIn};
        },
        logout(state, action){

            return {...state,loggedIn:false, user:{}};
        }
    }
});

export const {login,logout}=userSlice.actions;
export const userReducer=userSlice.reducer;