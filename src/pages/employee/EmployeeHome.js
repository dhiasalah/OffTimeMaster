import  { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { db } from '../../firebase/config';
import isimm from "../../assets/images/isimm.png"
import { InformationsEmployee } from './InformationsEmployee';
import { useEffect } from 'react';
import { getDocs,collection,query,where, orderBy, getCountFromServer,doc,deleteDoc,updateDoc } from 'firebase/firestore';
import { useRef } from 'react';
import { Success } from './components/Success';
import { useTitle } from '../../hooks/useTitle';
import { login } from '../../store/userSlice';
export const EmployeeHome = () => {
  useTitle("Employé ");
  const [toggleDemande,setToggleDemande]=useState(false);
  const dispatch=useDispatch();
  const [toggle,setToggle]=useState(false);
  async function handleDelete(id){
    const demanderef=doc(db,"notifications",id);
  

        await deleteDoc(demanderef);
        setToggle(!toggle);
   
      }

    

  const user=useSelector(state=>state.userState.user);
  const [notifications,setNotifications]=useState([]);
  const colRef=collection(db,"notifications");
  const notificationempRef=useRef(query(colRef,where("email","==",user.email),orderBy("modifiedAt","desc")));
  const documentReference=doc(db,"users",user.id);

  


  
  const [users,setUsers]=useState([]);        
  const userRef=collection(db,"users");
  const userQuery=useRef(query( userRef,where("role","==","admin")));

     useEffect(()=>{
         async function getPosts(){
           const data=await getDocs(userQuery.current);
           setUsers(data.docs.map((doc)=>{
                 return  {...doc.data(),id:doc.id}   
           }
           ));
  
         }
         getPosts();
        
       },[userQuery])




       const [demandesRefuseCount,setDemandesRefuseCount]=useState(0);        
       const demandeRefuseRef=collection(db,"demandesRefuses");
       const demandeRefuseQuery=query( demandeRefuseRef,where("employeeEmail","==",user.email));
          useEffect(()=>{
              async function getPosts(){
               const snapshot=await getCountFromServer(demandeRefuseQuery);
               setDemandesRefuseCount(snapshot.data().count);
              }
              getPosts();
              
             
            },[demandeRefuseQuery])


            const [demandesAccepteCount,setDemandesAccepteCount]=useState(0);        
            const demandeAccepteRef=collection(db,"demandesAcceptes");
            const demandeAccepteRefQuery=query( demandeAccepteRef,where("employeeEmail","==",user.email));
               useEffect(()=>{
                   async function getPosts(){
                    const snapshot=await getCountFromServer(demandeAccepteRefQuery);
                    setDemandesAccepteCount(snapshot.data().count);
                   }
                   getPosts();
                   
                  
                 },[demandeAccepteRefQuery])





  
       const [demandesCount,setDemandesCount]=useState(0);        
       const demandeRef=collection(db,"demandes");
       const demandeQuery=query( demandeRef,where("employeeEmail","==",user.email));
          useEffect(()=>{
            async function getPosts(){
              const snapshot=await getCountFromServer(demandeQuery);
              setDemandesCount(snapshot.data().count);
             }
             getPosts();
             
            
            },[demandeQuery])

     
            
            const [demandes,setDemandes]=useState([]);        
            const demandeReference=collection(db,"demandes");
            const demandeReferenceQuery=useRef(query( demandeReference,where("employeeEmail","==",user.email),orderBy("dateDebut","desc")));
               useEffect(()=>{
                   async function getPosts(){
                     
                     const data=await getDocs(demandeReferenceQuery.current);
                     setDemandes(data.docs.map((doc)=>{
                           return  {...doc.data(),id:doc.id}   
                     }
                     ));
                     const colUserRef=collection(db,"users");  
                     const qRef1=query(colUserRef,where("email","==",user.email));
                     let userUpdated=[];
                     getDocs(qRef1)
                    .then(data=>{
                    data.docs.forEach(document=>{
                      userUpdated.push({...document.data(),id:document.id})
                    })
                    
                    localStorage.setItem("user", JSON.stringify(userUpdated[0]));
                    dispatch(login(userUpdated[0]));
                  })
                  .catch(error=>{
                    console.log(error);
                  });
                     
                   }
                   getPosts();
                  
                 },[demandeReferenceQuery,toggleDemande])

                 async function handleDeleteDemande(id,nbJour){

                  const colUserRef=collection(db,"users");  
                  const qRef=query(colUserRef,where("email","==",user.email));

                  const demanderef=doc(db,"demandes",id);
                  await deleteDoc( demanderef);
                  setToggleDemande(!toggleDemande);

                  await updateDoc(documentReference,{
                    nb_jour:((user.nb_jour)+parseInt(nbJour)),
                    canRequest:true
                  })
                  .then(()=>{
                    const qRef1=query(colUserRef,where("email","==",user.email));
                    let userUpdated=[];

                    getDocs(qRef1)
                    .then(data=>{
                    data.docs.forEach(document=>{
                      userUpdated.push({...document.data(),id:document.id})
                    })
                    /*
                    localStorage.setItem("user", JSON.stringify(userUpdated[0]));
                    dispatch(login(userUpdated[0]));
                    */
                  })
                  .catch(error=>{
                    console.log(error);
                  });
                  });
              
              }



  


    useEffect(()=>{
        async function getPosts(){
          const data=await getDocs(notificationempRef.current);
          setNotifications(data.docs.map((doc)=>{
                return  {...doc.data(),id:doc.id}   
          }
          ));
        }
        getPosts();
       
      },[notificationempRef,toggle])



  return (
      <div className='flex justify-start flex-wrap sm:justify-evenly p-6 '>

        <Success/>
        <InformationsEmployee user={user}/>




        <div className="max-w-xl p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 flex flex-wrap justify-start">

          <div className="w-60 m-2   p-2 bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-evenly">
            <div className='text-green-500'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
            </svg>
              </div> 
              <div>
                <p className="text-gray-900 dark:text-white">Demandes</p>
                <p className="text-4xl text-center font-thin text-gray-900 dark:text-white">{demandesCount+demandesRefuseCount+demandesAccepteCount}</p>
              </div>
           
          </div>


          
          <div className="w-60 m-2   p-2 bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-evenly max-sm:justify-center">
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            <span className="sr-only">Loading...</span>
            </div>
              <div>
                <p className="text-gray-900 dark:text-white">Demandes en cours</p>
                <p className="text-4xl text-center font-thin text-gray-900 dark:text-white">{demandesCount}</p>
              </div>
           
          </div>
          
          <div className="w-60 m-2   p-2 bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-evenly">
              <div className='text-green-500'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
              </div> 
              <div>
                <p className="text-gray-900 dark:text-white">Demandes acceptés</p>
                <p className="text-4xl text-center font-thin text-gray-900 dark:text-white">{demandesAccepteCount}</p>
              </div>
           
          </div>
          
          <div className="w-60 m-2   p-2  bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-evenly">
            <div className='text-red-500'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30 " fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
            </svg>
              </div> 
              <div>
                <p className="text-gray-900 dark:text-white">Demandes réfusés</p>
                <p className="text-4xl text-center font-thin text-gray-900 dark:text-white">{demandesRefuseCount}</p>
              </div>
           
          </div>
              
                {
                  user.canRequest &&
                 ( <div className=" m-2 w-fit m-auto my-4 ">
                    <Link to="/demandeconge" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2">Demander Congé</Link>
                  </div>)
                }
                {
                  !user.canRequest &&
                 ( <div className="text-center m-2 w-fit m-auto my-4 ">
                    <p class="text-red-600 text-lg">Vous ne pouvez par demander pour le moment ,votre demande est en cours de consultation</p>
                  </div>)

                }
               
            
             
           

         
          

        </div>







        <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
        <div className='flex items-center gap-2 px-4'>
            <div className='text-green-300'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chat-fill" viewBox="0 0 16 16">
              <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15"/>
            </svg>
              </div> 
              <h4 className="text-2xl font-bold dark:text-white m-2">Admin à contacter</h4>            
          </div>
          

          <ul className="max-w-md divide-y  divide-gray-200 dark:divide-gray-700">

            {
              users.map((user)=>(
                <li key={user.id} className="py-3 sm:pb-4"> 
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0  text-gray-900 truncate dark:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-gear" viewBox="0 0 16 16">
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {user.firstname+" "+user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {user.email}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {user.phoneNumber}
                    </div>
                  </div>
                </li>
          
              ))
            }
           
           
          </ul>

            
        </div>





        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
          <div className='flex items-center gap-2 px-4'>
            <div className='text-yellow-400'>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/>
                </svg>
              </div> 
            <h4 className="text-2xl font-bold dark:text-white">Notifications</h4>
            
          </div>
          {
            notifications.length>0?
            notifications.map((not)=>(
            

              <div key={not.id} id="toast-message-cta" className={` w-full max-w-xs p-4 text-gray-500 ${not.message.includes("accepté")? "bg-green-200 dark:bg-green-500 dark:text-gray-100":"bg-red-200 dark:bg-red-500 dark:text-gray-100"}   rounded-lg shadow   m-2`} role="alert">
                <div className="flex">
                    <div className="ms-3 text-sm font-normal">
                        <div className='flex justify-start gap-4'>
                          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Admin</span>
                          <div className="mb-2 text-sm font-normal">
                              {not.modifedAtsimple}
                          </div> 

                        </div>
                        <div className="mb-2 text-sm font-normal">{not.message}</div> 
                    </div>
                    <button onClick={ ()=>{handleDelete(not.id)}} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-message-cta" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
              </div>
            ))
            :
            <div className="my-4 text-sm font-normal dark:text-white">
              Il n'y a aucune notifications pour le moment  
            </div> 

          }
         
          
          

        </div>



      { 
        
      <div className="max-w-xl p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 ">
        <div className='flex items-center gap-2 px-4'>
            <div className='text-orange-200'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
            </svg>
              </div> 
            <h4 className="text-2xl font-bold dark:text-white">Demande en cours</h4>
            
          </div>
      
          <ul className="max-w-md divide-y  divide-gray-200 my-2 dark:divide-gray-700">
          {
            demandesCount>0?

            (demandes.map((demande)=>(
              <li key={demande.id} className="py-3 sm:pb-4"> 
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                 
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          congé de {demande.Motif}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {demande.nbJour} Jours
                         </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {demande.dateDebut}
                    </div>
                    
                      <div className='text-red-500 cursor-pointer w-8 h-8 me-2 '>
                        <button onClick={()=>handleDeleteDemande(demande.id,demande.nbJour)} >    
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                            </svg>
                        </button>
                                        
                      </div>

                      
                    
                  
                  </div>
                </li>
              
            ))):
              <div className="my-4 text-md font-normal dark:text-white">
              Il n'y a aucune demande pour le moment  
              </div> 
          }
           
            
          </ul>

            
        </div>}
        




   
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 flex flex-col items-center">
              <a href="http://www.isimm.rnu.tn/public/" target='_blank'>
                  <img className="rounded-t-lg " src={isimm} alt="" />
              </a>
              <div className="p-5">
                  <a href="http://www.isimm.rnu.tn/public/" target='_blank'>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nouveautés de votre Institut</h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Voir les Nouveautés de votre Institut</p>
                  <a href="http://www.isimm.rnu.tn/public/" target='_blank' className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Nouveautés
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </a>
              </div>
          </div>
      </div>
      
   
  )
}
