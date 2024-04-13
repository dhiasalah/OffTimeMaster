import { createSlice } from '@reduxjs/toolkit';

const successSlice=createSlice({
    name:"success",
    initialState:{
        show:false
        
    },
    reducers:{

        togglerShow(state,action){
            return {...state,show:action.payload};
        }

    }
});

export const {togglerShow}=successSlice.actions;
export const successReducer=successSlice.reducer;