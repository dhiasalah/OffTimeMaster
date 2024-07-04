import { useEffect, useState } from "react";
import demande2 from "../../assets/images/demande2.jpg";
import { db } from "../../firebase/config";
import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import { togglerShow } from "../../store/successSlice";
import { useTitle } from "../../hooks/useTitle";

export const DemandeConge = () => {
  useTitle("Demande Congé ");

  const demandeRef = collection(db, "demandes");
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [dateDebutValid, setdateDebutValid] = useState(false);
  const [nbJourValid, setNbJourValid] = useState(false);
  const [valid, setValid] = useState(dateDebutValid && nbJourValid);

  const colUserRef = collection(db, "users");
  let userUpdated = [];

  const documentReference = doc(db, "users", user.id);

  useEffect(() => {
    setValid(nbJourValid && dateDebutValid);
  }, [nbJourValid, dateDebutValid]);

  function handleValidNbJours(event) {
    let nb_jour = parseInt(event.target.value);

    if (
      nb_jour <= user.nb_jour &&
      nb_jour >= 1 &&
      user.nb_jour - nb_jour >= 0
    ) {
      setNbJourValid(true);
    } else {
      setNbJourValid(false);
    }
  }

  function handleValidDateDebut(event) {
    let date = new Date(event.target.value);
    if (date.getTime() > new Date()) {
      setdateDebutValid(true);
    } else {
      setdateDebutValid(false);
    }
  }

  async function handleEnvoyer(event) {
    event.preventDefault();

    let dateFin = new Date(event.target.date_debut.value);
    dateFin.setDate(dateFin.getDate() + parseInt(event.target.nb_jour.value));

    valid &&
      (await addDoc(demandeRef, {
        dateDebut: event.target.date_debut.value,
        nbJour: event.target.nb_jour.value,
        dateFin:
          dateFin.getUTCFullYear() +
          "-" +
          (dateFin.getUTCMonth() + 1) +
          "-" +
          dateFin.getUTCDate(),
        Motif: event.target.underline_select.value,
        message: event.target.message.value,
        employeeName: user.firstname + " " + user.name,
        phoneNumber: user.phoneNumber,
        employeeEmail: user.email,
        status: "non traité",
      }));

    await updateDoc(documentReference, {
      nb_jour: user.nb_jour - parseInt(event.target.nb_jour.value),
      canRequest: false,
    }).then(() => {
      const qRef1 = query(colUserRef, where("email", "==", user.email));
      getDocs(qRef1)
        .then((data) => {
          data.docs.forEach((document) => {
            userUpdated.push({ ...document.data(), id: document.id });
          });
          console.log(userUpdated);
          dispatch(login(userUpdated[0]));
          localStorage.setItem("user", JSON.stringify(userUpdated[0]));
        })
        .catch((error) => {
          console.log(error);
        });
    });

    navigate("/employe");
    event.target.reset();
    dispatch(togglerShow(true));
  }

  return (
    <main className="flex p-15  justify-between max-lg:justify-center items-center  ">
      <div className="lg:w-2/4 ">
        <form className="max-w-md mx-auto" onSubmit={handleEnvoyer}>
          <div className="relative z-0 w-full mb-5 group flex flex-col ">
            <label
              htmlFor="date_debut"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date de début
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="date"
              name="date_debut"
              id="date_debut"
              onChange={handleValidDateDebut}
            />

            <div
              className={`${
                dateDebutValid ? "hidden" : ""
              } mt-4 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`}
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
                <span className="font-medium">Danger alert!</span> Date de debut
                de congé doit être superieur â date d'aujourd'hui .
              </div>
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group flex flex-col ">
            <label
              htmlFor="nb_jour"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre de jours{" "}
            </label>
            <input
              pattern="[0-9]+"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="nb_jour"
              id="nb_jour"
              onChange={handleValidNbJours}
            />

            <div
              className={`${
                nbJourValid ? "hidden" : ""
              } mt-4 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`}
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
                <span className="font-medium">Danger alert ! </span> nombre de
                jours doit être inferieur au nombre de jours disponibles .
              </div>
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="underline_select"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Motif de congé
            </label>
            <select
              id="underline_select"
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="vacances">Vacances</option>
              <option value="maladie">Congé maladie</option>
              <option value="parental ">Congé parental </option>
              <option value="maternité/paternité">
                Congé de maternité ou de paternité
              </option>
              <option value="décès">Congé de décès</option>
              <option value="familles">Congé pour raisons familiales</option>
            </select>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          {
            <button
              disabled={!valid}
              type="submit"
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Envoyer
            </button>
          }
        </form>
      </div>

      <div className="lg:w-2/4 max-lg:hidden">
        <img className="w-max h-max rounded-lg" src={demande2} alt="" />
      </div>
    </main>
  );
};
