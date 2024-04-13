import React, { useRef } from 'react'
import { DemandeDetaille } from './components/DemandeDetaille';
import  { useState } from 'react'
import {db} from "../../firebase/config"
import { collection,getDocs,where,query } from 'firebase/firestore';
import { DetailLine } from './components/DetailLine';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


export const Demandes = () => {
    const [showPopup,setShowPopup]=useState(false);
    const colRef=useRef(collection(db,"demandes"));
    const[demandes,setDemandes]=useState([]);
    const demande11=useSelector(state=>state.demandeState.demande);
    const [toggle,setToggle]=useState(false);




    useEffect(()=>{
       async function getPosts(){
         const data=await getDocs(colRef.current);
         setDemandes(data.docs.map((doc)=>(
           {...doc.data(),id:doc.id}
         )
         ));

       }
       getPosts();
     },[colRef,toggle])



  return (
    <section className='my-10' >
            <DemandeDetaille    showPopup={showPopup} setShowPopup={setShowPopup} demande={demande11} toggle={toggle} setToggle={setToggle}/>
            {
            demandes.length? 
            (<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-400">
                    <tr className='rounded-lg '>
                        <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                            Employé
                        </th>
                        <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                            Date Début
                        </th>
                        <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                            Nombre de jours
                        </th>
                        <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                            Numéro de téléphone
                        </th>
                        <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                            Motif
                        </th>
                        <th scope="col" className="px-6 text-sm py-3 font-semibold text-blue-600">
                            Actions
                        </th>
                
                    </tr>
                </thead>
                <tbody> 
                        
                        {
                            
                            demandes.map((demande)=>(
                                <DetailLine  setShowPopup={setShowPopup} showPopup={showPopup} key={demande.id} demande={demande}/>
                            ))
                        }
                    
                </tbody>
            </table>):
    
                
                <div className='flex justify-center margin-auto py-10'>
                    <h3 className="text-3xl text-blue-600 font-bold dark:text-white">Il n'y a aucune demande pour le moment</h3>

                </div>
}

            
    </section>
      
  )
}
