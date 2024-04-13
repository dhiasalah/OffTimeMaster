import React, { useState } from 'react';
import { useEffect } from 'react';
import { getDocs,collection,query,where } from 'firebase/firestore';
import { useRef } from 'react';
import { db } from '../../firebase/config';
import { UserLine } from './components/UserLine';
export const Users = () => {


    const[toggle,setToggle]=useState(false);


    const [employees,setemployees]=useState([]);        
    const users=collection(db,"users");
    const adminQuery=useRef(query( users,where("role","==","employe")));
    useEffect(()=>{
        async function getPosts(){
          
          const data=await getDocs(adminQuery.current);
          setemployees(data.docs.map((doc)=>{
                return  {...doc.data(),id:doc.id}   
          }
          ));
        }
        getPosts();
       
      },[adminQuery,toggle])
    
  return (
    <div className="relative overflow-x-auto my-10 ">
        {
            employees.length?
            ( <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                                Employé
                            </th>
                            <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                                Nombre de Jours restantes
                            </th>
                            
                            <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                                Numéro de téléphone
                            </th>
                            <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                                Actions
                            </th>
                            

                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((user)=>(
                                <UserLine key={user.id} user={user} toggle={toggle} setToggle={setToggle}/>

                            ))
                        }
                    </tbody>
                </table>)
                :
                                
                ( <div className='flex justify-center margin-auto py-10'>
                      <h3 className="text-3xl text-blue-600 font-bold dark:text-white">Il n'y a aucun employé pour le moment </h3>
  
                  </div>)
                
        }
           
    </div>
  )
}
