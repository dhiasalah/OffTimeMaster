import React from 'react'
import { useState,useEffect } from 'react';
import { collection,query,where,getDocs,doc,deleteDoc } from 'firebase/firestore';
import { useRef } from 'react';
import { db } from '../../firebase/config';
export const AdminList = () => {
    const [admins,setAdmins]=useState([]);        
    const users=collection(db,"users");
    const adminQuery=useRef(query( users,where("role","==","admin"),where("super","==",false)));
    const [toggle,setToggle]=useState(false);

    async function handleDelete(id){
            const userref=doc(db,"users",id);
            await deleteDoc( userref);
            setToggle(!toggle);
        
        }
   

    useEffect(()=>{
        async function getPosts(){
          
          const data=await getDocs(adminQuery.current);
          setAdmins(data.docs.map((doc)=>{
                return  {...doc.data(),id:doc.id}   
          }
          ));
        }
        getPosts();
       
      },[adminQuery,toggle])




  return (
        <div className="relative overflow-x-auto my-10 ">
        {
            admins.length?
                (<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                                Admin
                            </th>
                            <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                                Role supplémentaire
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
                            
                            (admins.map((admin)=>(
                                <tr key={admin.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="min-w-0  ">
                                                <p className="text-sm  font-medium text-gray-900 truncate dark:text-white">
                                                    {admin.firstname+" "+admin.name}
                                                </p>
                                                <p className="text-sm lg:min-w-40 text-gray-500 truncate dark:text-gray-400">
                                                    {admin.email}
                                                </p>
                                            </div>
                                    </th>
            
                                    <td className="px-6 py-4">
                                        {admin.super?"Super admin":"Admin"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {admin.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                            <div className='text-red-500 cursor-pointer w-8 h-8 me-2 '>
                                                <button onClick={()=>handleDelete(admin.id)}>    
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                                    </svg>
                                                </button>
                                              
                                            </div>
                                    </td>

                                </tr>)
                     
                                
                            ))
                        }
                   
                       
                    </tbody>
                </table>)
                :
                                
                                ( <div className='flex justify-center margin-auto py-10'>
                                      <h3 className="text-3xl text-blue-600 font-bold dark:text-white">Il n'y a aucun admin pour le moment vous êtes le seul</h3>
                  
                                  </div>)
             }
        </div>
  )
}
