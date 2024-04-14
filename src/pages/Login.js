import  { useState } from 'react'
import { Link } from 'react-router-dom'
import login1 from "../assets/images/ok.png";
import { db,auth } from '../firebase/config';
import {query,where,collection,getDoc,getDocs} from "firebase/firestore"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth,deleteUser } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';

import video from "../assets/video/video1.mp4";
export const Login = () => {
    useTitle("Login")




    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [showError,setShowError]=useState(false);

    const user11=useSelector(state=>state.userState.user);
    const colRef=collection(db,"users");
    



    function handleLogin(event){
        event.preventDefault();
        signInWithEmailAndPassword(auth,event.target.email.value,event.target.password.value)
        .then(Credentials=>{
            const qRef=query(colRef,where("email","==",event.target.email.value));

                setShowError(false);
                getDocs(qRef)   
                .then(data=>{
                    let users=[];
                    data.docs.forEach(document=>{
                        users.push({...document.data(),id:document.id})
                    })
                    if(users.length>0)
                    {
                        const role=users[0].role;
                        dispatch(login(users[0]));
                        role=="admin" ?navigate("/admin/dashboard") :navigate("/employe");
                        localStorage.setItem("isAuth",true);
                        localStorage.setItem("user", JSON.stringify(users[0]));
                    }
                    else{
                        const auth = getAuth();
                        const user = auth.currentUser;
                        deleteUser(user).then(() => {
                            console.log("user deleted");
                          }).catch((error) => {
                            console.log(error);
                          });
                        setShowError(true);
                    }
                    

                })
                .catch(error=>{
                    console.log(error);
                });
                
                event.target.reset();
            
            

        })
    .catch(error=>{
        setShowError(true);
    })
}

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center text-white  ">
        <div className="video-docker absolute top-0 left-0 w-full h-full overflow-hidden">
            <video className="min-w-full min-h-full absolute object-cover"
                src={video}
                type="video/mp4" autoPlay muted loop ></video>
        </div>
        <div className="video-content space-y-2 z-10 flex flex-col items-center gap-2">
            <main className=' flex p-15  justify-between max-lg:justify-center items-center ' >
                <div className='lg:w-2/4'>
                    <form className="max-w-sm mx-auto max-lg:b"  onSubmit={handleLogin}>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Your password</label>
                            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                
                        <div className="flex items-start mb-5">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-300">Remember me</label>
                        </div>
                        {
                        showError && 
                        <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Danger alert!</span> Compte non trouvé .
                            </div>
                        </div>
                        }
                        <div className='flex flex-col  gap-2 '>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>

                            <div className="text-sm font-medium text-gray-300">
                                    Not registered? <Link to="/register" className=" hover:underline text-blue-400">Create account</Link>
                            </div>

                        </div>
                    
                    </form>
                </div>
                <div className='lg:w-2/4 max-lg:hidden'>
                    <img className='w-max h-max' src={login1} alt="" />

                </div>
            </main>
        

        </div>
    </section>
  )
}




/*
<main className=' flex p-15  justify-between max-lg:justify-center items-center ' >
        <div className='lg:w-2/4'>
            <form className="max-w-sm mx-auto max-lg:b"  onSubmit={handleLogin}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
           
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                {
                showError && 
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Danger alert!</span> Compte non trouvé .
                    </div>
                </div>
                }
                <div className='flex flex-col  gap-2 '>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <Link to="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
                    </div>

                </div>
               
            </form>
        </div>
        <div className='lg:w-2/4 max-lg:hidden'>
            <img className='w-max h-max' src={login1} alt="" />

        </div>
    </main>
    */