import React, { useState } from "react";
import { db } from "../../firebase/config";
import { where, getDocs, query, doc, collection } from "firebase/firestore";
import { login } from "../../store/userSlice";
import { updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

export const InformationsEmployee = ({ user }) => {
  let user1 = [];
  let documentReference;
  const [changeFn, setChangeFn] = useState(false);
  const [changeN, setChangeN] = useState(false);
  const [changePn, setChangePn] = useState(false);
  const colUserRef = collection(db, "users");
  const dispatch = useDispatch();

  const qRef = query(colUserRef, where("email", "==", user.email));

  getDocs(qRef)
    .then((data) => {
      data.docs.forEach((document) => {
        user1.push({ ...document.data(), id: document.id });
      });
      documentReference = doc(db, "users", user1[0].id);
    })
    .catch((error) => {
      console.log(error);
    });

  function handleChangeFn(event) {
    event.preventDefault();

    updateDoc(documentReference, {
      firstname: event.target.first_name.value,
    }).then(() => {
      getDocs(qRef)
        .then((data) => {
          let userUpdated = [];
          data.docs.forEach((document) => {
            userUpdated.push({ ...document.data(), id: document.id });
          });
          const documentUpdatedReference = doc(db, "users", userUpdated[0].id);

          dispatch(login(userUpdated[0]));
          localStorage.setItem("user", JSON.stringify(userUpdated[0]));
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setChangeFn(false);
  }
  function handleChangeN(event) {
    event.preventDefault();

    updateDoc(documentReference, {
      name: event.target.last_name.value,
    }).then(() => {
      getDocs(qRef)
        .then((data) => {
          let userUpdated = [];
          data.docs.forEach((document) => {
            userUpdated.push({ ...document.data(), id: document.id });
          });
          const documentUpdatedReference = doc(db, "users", userUpdated[0].id);

          dispatch(login(userUpdated[0]));
          localStorage.setItem("user", JSON.stringify(userUpdated[0]));
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setChangeN(false);
  }
  function handleChangePn(event) {
    event.preventDefault();

    updateDoc(documentReference, {
      phoneNumber: event.target.phoneNumber.value,
    }).then(() => {
      getDocs(qRef)
        .then((data) => {
          let userUpdated = [];
          data.docs.forEach((document) => {
            userUpdated.push({ ...document.data(), id: document.id });
          });
          const documentUpdatedReference = doc(db, "users", userUpdated[0].id);

          dispatch(login(userUpdated[0]));
          localStorage.setItem("user", JSON.stringify(userUpdated[0]));
        })
        .catch((error) => {
          console.log(error);
        });
    });

    setChangePn(false);
  }

  return (
    <div className="max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
      <h4 className="text-2xl font-bold dark:text-white">
        Profile Informations
      </h4>
      <div className="flex justify-start py-2">
        <p className="text-xl  text-gray-900 dark:text-white ">Email :</p>
        <p className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400 ">
          {user.email}
        </p>
      </div>

      <div className="flex justify-between items-center py-2">
        <div className="flex items-center">
          <p className="text-xl  text-gray-900 dark:text-white">First name :</p>
          {!changeFn ? (
            <p className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400">
              {" "}
              {user.firstname}{" "}
            </p>
          ) : (
            <form className="flex gap-2" onSubmit={handleChangeFn}>
              <input
                type="text"
                id="first_name"
                name="first_name"
                pattern="[A-Z a-z]{2,}"
                title="Entrez un nom valide (lettres uniquement)"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2 ml-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user.firstname}
                placeholder="John"
                required
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-check2 text-emerald-600"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                </svg>
              </button>
            </form>
          )}
        </div>
        {!changeFn && (
          <div
            className="flex justify-center items-center  cursor-pointer hover:text-green-400"
            onClick={() => setChangeFn(!changeFn)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-pencil-square dark:text-white"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center py-2">
        <div className="flex items-center">
          <p className="text-xl  text-gray-900 dark:text-white">Last name :</p>
          {!changeN ? (
            <p className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400">
              {user.name}
            </p>
          ) : (
            <form className="flex gap-2" onSubmit={handleChangeN}>
              <input
                type="text"
                id="last_name"
                pattern="[A-Z a-z]{2,}"
                title="Entrez un nom valide (lettres uniquement)"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2 ml-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user.name}
                placeholder="John"
                required
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-check2 text-emerald-600"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                </svg>
              </button>
            </form>
          )}
        </div>
        {!changeN && (
          <div
            className="flex justify-center items-center  cursor-pointer hover:text-green-400"
            onClick={() => setChangeN(!changeN)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-pencil-square dark:text-white"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center py-2 gap-1">
        <div className="flex items-center">
          <p className="text-xl  text-gray-900 dark:text-white">
            Phone number :
          </p>
          {!changePn ? (
            <p className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400">
              {user.phoneNumber}
            </p>
          ) : (
            <form className="flex gap-2" onSubmit={handleChangePn}>
              <input
                type="text"
                id="phoneNumber"
                pattern="[0-9]{8}"
                title="Veuillez entrer un numéro de téléphone valide composé de 8 chiffres."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2 ml-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={user.phoneNumber}
                placeholder="John"
                required
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-check2 text-emerald-600"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                </svg>
              </button>
            </form>
          )}
        </div>
        {!changePn && (
          <div
            className="flex justify-center items-center  cursor-pointer hover:text-green-400"
            onClick={() => setChangePn(!changePn)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-pencil-square dark:text-white"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="flex justify-start items-center py-2">
        <p className="text-xl  text-gray-900 dark:text-white">Salaire :</p>
        <p className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400">
          {user.salaire} $
        </p>
      </div>
      <div className="flex justify-start items-center py-2">
        <p className="text-xl  text-gray-900 dark:text-white">
          Jours disponibles :
        </p>
        <p className="tracking-tighter text-gray-500 md:text-lg dark:text-gray-400">
          {user.nb_jour}
        </p>
      </div>
    </div>
  );
};
