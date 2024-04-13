import { createSlice } from '@reduxjs/toolkit';

const demandeSlice=createSlice({
    name:"demande",
    initialState:{
        demande:{},
        toggle:false
        
    },
    reducers:{
        gerer(state,action){

            const demandeGeree=action.payload;
            return {...state, demande:demandeGeree};
        },

        toggler(state,action){
            const inToggle=!state.toggle;
            return {...state,toggle:inToggle};
        }

    }
});

export const {gerer,toggler}=demandeSlice.actions;
export const demandeReducer=demandeSlice.reducer;