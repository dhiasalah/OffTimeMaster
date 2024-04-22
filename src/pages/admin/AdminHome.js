import React, { useState } from 'react'
import {Outlet,NavLink} from "react-router-dom";
import { useSelector } from 'react-redux';
import {db} from "../../firebase/config"
import { collection,getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRef } from 'react';
import { toggler } from '../../store/demandeSlice';
import { useDispatch } from 'react-redux';
import { useTitle } from '../../hooks/useTitle';
export const AdminHome = () => {
    const toggle=useSelector(state=>state.demandeState.toggle);
    const dispatch=useDispatch();
    useTitle("Admin")
    const colRef=useRef(collection(db,"demandes"));
    const[demandes,setDemandes]=useState([]);
    useEffect(()=>{
          async function getPosts(){
            const data=await getDocs(colRef.current);
            setDemandes(data.docs.map((doc)=>(
              {...doc.data(),id:doc.id}
            )
            ));
            dispatch(toggler());
          }
          getPosts();
        },[colRef,toggle])
    


    const user=useSelector(state=>state.userState.user);


    const activeClass="inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group";
    const inActiveClass="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group";

   
  return (
    <main  >

        <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="me-2">
                    <NavLink to="/admin/profile" className={({isActive}) => isActive? activeClass : inActiveClass} >
                        <svg className={`w-4 h-4 me-2  text-gray-400 dark:text-gray-500 group-hover:text-gray-500  dark:group-hover:text-gray-300`}  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                        </svg>Profile
                    </NavLink>
                </li>
                <li className="me-2">
                    <NavLink to="/admin/dashboard" className={({isActive}) => isActive? activeClass : inActiveClass}  aria-current="page">
                        <svg className="w-4 h-4 me-2 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                            <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>Dashboard
                    </NavLink>
                </li>
                <li className="me-2">
                    <NavLink to="/admin/users" className={({isActive}) => isActive? activeClass : inActiveClass} >
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300 bi bi-people-fill'  fill="currentColor"  viewBox="0 0 16 16">
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                        </svg>Employés
                    </NavLink>
                </li>
                {
                    user.super &&
                    <li className="me-2">
                        <NavLink to="/admin/admins" className={({isActive}) => isActive? activeClass : inActiveClass} >
                                <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300 bi bi-person-fill-gear' fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                                </svg>Admins
            
                            
                        </NavLink>
                    </li>
                }
                
                <li className="me-2">
                    <NavLink to="/admin/demandes" className={({isActive}) => isActive? activeClass : inActiveClass} >
                        <svg className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                        </svg>Demandes
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-300">{demandes.length}</span>
                    </NavLink>
                </li>
                
            </ul>
        </div>

        <div className='p-4'>
            <Outlet/>

        </div> 

    </main>
  )
}
