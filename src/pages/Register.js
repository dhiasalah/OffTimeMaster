import React, { useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useTitle } from "../hooks/useTitle";
import login from "../assets/images/ok.png";
import { useNavigate } from "react-router-dom";
import video from "../assets/video/video1.mp4";

export const Register = () => {
  useTitle("Register");

  const navigate = useNavigate();

  const [showError, setShowError] = useState(false);
  const [role, setRole] = useState("employe");
  const userRef = collection(db, "users");

  function handleSignIn(event) {
    event.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      event.target.floating_email.value,
      event.target.floating_password.value
    )
      .then((Credentials) => {
        setShowError(false);
        addDoc(userRef, {
          email: event.target.floating_email.value,
          motdepasse: event.target.floating_password.value,
          firstname: event.target.floating_first_name.value,
          name: event.target.floating_last_name.value,
          phoneNumber: event.target.floating_phone.value,
          role: role,
          nb_jour: role === "employe" ? 60 : null,
          salaire: 1500,
          super: role === "admin" ? false : null,
          canRequest: true,
        });
        event.target.reset();
        navigate("/login");
      })
      .catch((error) => {
        setShowError(true);
      });
  }

  return (
    <main className="flex p-15  justify-between max-lg:justify-center     items-center  ">
      <div className="lg:w-2/4 ">
        <form className="max-w-md mx-auto" onSubmit={handleSignIn}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              autoComplete="off"
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              autoComplete="off"
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                autoComplete="off"
                type="text"
                name="floating_first_name"
                pattern="[A-Z a-z]{2,}"
                title="Entrez un nom valide (lettres uniquement)"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                autoComplete="off"
                pattern="[A-Z a-z]{2,}"
                title="Entrez un nom valide (lettres uniquement)"
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                autoComplete="off"
                type="tel"
                pattern="[0-9]{8}"
                title="Veuillez entrer un numéro de téléphone valide composé de 8 chiffres."
                name="floating_phone"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>
          </div>
          <div className="flex items-start mb-5 ">
            <div className="flex items-center my-1 mr-5">
              <input
                onClick={() => {
                  setRole("employe");
                }}
                id="rating-sort-1"
                type="radio"
                defaultChecked
                value="employe"
                name="rating-sort"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="rating-sort-1"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Employé
              </label>
            </div>
            <div className="flex items-center my-1">
              <input
                id="rating-sort-2"
                onClick={() => {
                  setRole("admin");
                }}
                type="radio"
                value="admin"
                name="rating-sort"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="rating-sort-2"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Admin
              </label>
            </div>
          </div>
          {showError && (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Danger alert!</span> Email
                invalide ou mot de passe invalide.
              </div>
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="lg:w-2/4 max-lg:hidden">
        <img className="w-max h-max" src={login} alt="" />
      </div>
    </main>
  );
};

/*

*/
