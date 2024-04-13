import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { togglerShow } from '../../../store/successSlice';
export const Success = () => {

    const show=useSelector(state=>state.successState.show);
    const dispatch=useDispatch();

  return (
    <div id="medium-modal" tabIndex="-1" className={`fixed inset-0 z-50 flex justify-center items-center ${show ? "" : "hidden"} bg-gray-800 bg-opacity-50`}>
        <div className="w-full max-w-lg bg-white rounded-lg shadow flex flex-col justify-center items-center">
            
            <div className='text-green-800 bg-green-400 w-full h-2/4 flex justify-center p-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
              </div> 

            <div id="alert-border-3" className="flex items-center p-4 my-4 text-green-800   bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <div className="ms-3 text-lg font-medium">
                    Votre demande a été envoyé avec succés .Vous allez recevoir une notification le plutôt possible !
                </div>
            
            </div>
            <div className="flex items-center justify-center p-2 md:p-5  rounded-t w-20 ">
                <button onClick={() => dispatch(togglerShow(false))} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    OK
                </button>
            </div>


        </div>
  </div>
  )
}
