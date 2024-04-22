import { doc,deleteDoc,addDoc,collection ,query,where,getDocs,updateDoc} from 'firebase/firestore';
import { db } from '../../../firebase/config';

export const DemandeDetaille = ({showPopup,setShowPopup,demande,toggle,setToggle}) => {

    let documentReference=null;
    let user=[];
    const colUserRef=collection(db,"users");  

    async function handleDecline(){
        const demanderef=doc(db,"demandes",demande.id);
        const notificationRef=collection(db,"notifications");
        let userUpdated=[]

        
     
        const demandeDeclineRef=collection(db,"demandesRefuses");
        var date=new Date();
        const newNotification={
            email:demande.employeeEmail,
            message:"Bonjour, "+demande.employeeName+" ,votre demande de congé "+"de "+demande.dateDebut+" jusqu'à "+demande.dateFin + " a été rejetée",
            modifiedAt:date,
            modifedAtsimple:date.getUTCFullYear()+"-"+(date.getUTCMonth()+1)+"-"+date.getUTCDate()

        }

        const demandeRefusee={
            dateDebut:demande.dateDebut,
            nbJour:demande.nbJour,
            dateFin:demande.dateFin,
            Motif:demande.Motif,
            message:demande.message,
            employeeName:demande.employeeName,
            phoneNumber:demande.phoneNumber,
            employeeEmail:demande.employeeEmail,
            modifiedAt:date

        
            }
            

 
              

            await addDoc(demandeDeclineRef,demandeRefusee);
            await addDoc(notificationRef,newNotification);

            await deleteDoc(demanderef);
          
            const qRef1=query(colUserRef,where("email","==",demande.employeeEmail));
            getDocs(qRef1)
                .then(data=>{
                data.docs.forEach(document=>{
                userUpdated.push({...document.data(),id:document.id})
                })
                console.log(userUpdated[0])
                const documentReference=doc(db,"users",userUpdated[0].id);
                updateDoc(documentReference,{
                    canRequest:true,
                    nb_jour:userUpdated[0].nb_jour+parseInt(demande.nbJour)
                    })

               
            })  
            .catch(error=>{
                console.log(error);
            });
            setToggle(!toggle);
            setShowPopup(false);
       
          }
   


    async function handleAccept(){
        let userUpdated=[]
        const demanderef=doc(db,"demandes",demande.id);
        const notificationRef=collection(db,"notifications");
        const demandeAccepteRef=collection(db,"demandesAcceptes");

        var date=new Date();
        
      
        const newNotification={
            email:demande.employeeEmail,
            message:"Bonjour, "+demande.employeeName+" votre demande de congé "+"de "+demande.dateDebut+" jusqu'à "+demande.dateFin + " a été accepté",
            modifiedAt:date,
            modifedAtsimple:date.getUTCFullYear()+"-"+(date.getUTCMonth()+1)+"-"+date.getUTCDate()

        }
        const demandeAccepte={
            dateDebut:demande.dateDebut,
            nbJour:demande.nbJour,
            dateFin:demande.dateFin,
            Motif:demande.Motif,
            message:demande.message,
            employeeName:demande.employeeName,
            phoneNumber:demande.phoneNumber,
            employeeEmail:demande.employeeEmail,
        
            }
         

            await addDoc(demandeAccepteRef,demandeAccepte);
            await addDoc(notificationRef,newNotification);

            await deleteDoc(demanderef);
            const qRef1=query(colUserRef,where("email","==",demande.employeeEmail));
            getDocs(qRef1)
                .then(data=>{
                data.docs.forEach(document=>{
                userUpdated.push({...document.data(),id:document.id})
                })
                console.log(userUpdated[0])
                const documentReference=doc(db,"users",userUpdated[0].id);
                updateDoc(documentReference,{
                    canRequest:true,
                    })

               
            })  
            .catch(error=>{
                console.log(error);
            });
            setToggle(!toggle);
            setShowPopup(false);
       
          }
   
      
  return (
    
   
    <div id="medium-modal" tabIndex="-1" className={`fixed inset-0 z-50 flex justify-center items-center ${showPopup ? "" : "hidden"} bg-gray-800 bg-opacity-50`}>
        <div className="w-full max-w-lg bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-blue-600">
                <h3 className="text-xl font-medium text-gray-900">Détails</h3>
                <button onClick={() => setShowPopup(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
                </button>
            </div>


            <div className='m-3 p-4'>
                <div className='flex justify-start  items-center py-2'> 
                    <p className="text-xl  text-blue-600 font-semibold ">Email :</p>
                    <p className="tracking-tighter text-gray-500 md:text-lg ">{demande.employeeEmail}</p>
                </div>
                <div className='flex justify-start items-center py-2'> 
                    <p className="text-xl  text-blue-600 font-semibold ">Nom :</p>
                    <p className="tracking-tighter text-gray-500 md:text-lg ">{demande.employeeName}</p>
                </div>
                <div className='flex justify-start items-center py-2'> 
                    <p className="text-xl  text-blue-600 font-semibold ">Date Début :</p>
                    <p className="tracking-tighter text-gray-500 md:text-lg ">{demande.dateDebut}</p>
                </div>
                <div className='flex justify-start items-center py-2'> 
                    <p className="text-xl  text-blue-600 font-semibold ">Date fin :</p>
                    <p className="tracking-tighter text-gray-500 md:text-lg ">{demande.dateFin}</p>
                </div>
                <div className='flex justify-start items-center py-2'> 
                    <p className="text-xl  text-blue-600 font-semibold ">Numéro de téléphone :</p>
                    <p className="tracking-tighter text-gray-500 md:text-lg ">{demande.phoneNumber}</p>
                </div>
                <div className='flex justify-start items-center py-2'> 
                    <p className="text-xl  text-blue-600 font-semibold ">Motif :</p>
                    <p className="tracking-tighter text-gray-500 md:text-lg ">{demande.Motif}</p>
                </div>
                    <div className='flex flex-col   py-2'> 
                        <p className="text-xl  text-blue-600 font-semibold ">message :</p>
                        <p className="tracking-tighter text-gray-500 md:text-lg ">
                           {demande.message}
                        </p>
                    </div>

               
              
            </div>
           




            <div className="flex items-center justify-end p-4 md:p-5 border-t">
                <button onClick={handleAccept}   data-modal-hide="medium-modal" type="button" className="text-white flex gap-2 justify-between bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill="currentColor" className="bi bi-check-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                    </svg>
                    I accept
                </button>
                <button onClick={handleDecline} data-modal-hide="medium-modal" type="button" className="py-2.5 flex gap-2 justify-between px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-red-500 rounded-lg border border-gray-200 hover:bg-red-600  focus:z-10 focus:ring-4 focus:ring-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
                        </svg>
                    Decline
                </button>
            </div>
        </div>
  </div>
  
     
  )
}
