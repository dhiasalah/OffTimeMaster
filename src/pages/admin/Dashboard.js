import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/config";
import { useEffect } from "react";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import { useState } from "react";
import { where, query } from "firebase/firestore";
import { useRef } from "react";
export const Dashboard = () => {
  const colRef = collection(db, "demandes");
  const colRefQuery = useRef(colRef, orderBy("dateDebut"), limit(3));

  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const data = await getDocs(colRefQuery.current);
      setDemandes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getPosts();
  }, [colRefQuery]);

  const [employees, setemployees] = useState([]);
  const users = collection(db, "users");
  const adminQuery = useRef(
    query(users, where("role", "==", "employe"), orderBy("firstname"), limit(3))
  );
  useEffect(() => {
    async function getPosts() {
      const data = await getDocs(adminQuery.current);
      setemployees(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    }
    getPosts();
  }, [adminQuery]);

  const [demandesCount, setDemandesCount] = useState(0);
  const demandeRef = collection(db, "demandes");
  useEffect(() => {
    async function getPosts() {
      const snapshot = await getCountFromServer(demandeRef);
      setDemandesCount(snapshot.data().count);
    }
    getPosts();
  }, [demandeRef]);

  const [demandesRefuseCount, setDemandesRefuseCount] = useState(0);
  const demandeRefuseRef = collection(db, "demandesRefuses");
  useEffect(() => {
    async function getPosts() {
      const snapshot = await getCountFromServer(demandeRefuseRef);
      setDemandesRefuseCount(snapshot.data().count);
    }
    getPosts();
  }, [demandeRefuseRef]);

  const [demandesAcceptesCount, setDemandesAcceptesCount] = useState(0);
  const demandesAcceptesRef = collection(db, "demandesAcceptes");
  useEffect(() => {
    async function getPosts() {
      const snapshot = await getCountFromServer(demandesAcceptesRef);
      setDemandesAcceptesCount(snapshot.data().count);
    }
    getPosts();
  }, [demandesAcceptesRef]);

  const [adminCount, setAdminCount] = useState(0);
  const demandeRefuseQuery = query(
    collection(db, "users"),
    where("role", "==", "admin")
  );

  useEffect(() => {
    async function getPosts() {
      const snapshot = await getCountFromServer(demandeRefuseQuery);
      setAdminCount(snapshot.data().count);
    }
    getPosts();
  }, [demandeRefuseQuery]);

  const [superAdminCount, setSuperAdminCount] = useState(0);
  const superAdminQuery = query(
    collection(db, "users"),
    where("role", "==", "admin"),
    where("super", "==", true)
  );

  useEffect(() => {
    async function getPosts() {
      const snapshot = await getCountFromServer(superAdminQuery);
      setSuperAdminCount(snapshot.data().count);
    }
    getPosts();
  }, [superAdminQuery]);

  const [employeCount, setEmployeCount] = useState(0);
  const employeQuery = query(
    collection(db, "users"),
    where("role", "==", "employe")
  );

  useEffect(() => {
    async function getPosts() {
      const snapshot = await getCountFromServer(employeQuery);
      setEmployeCount(snapshot.data().count);
    }
    getPosts();
  }, [employeQuery]);

  return (
    <div className="p-4 border-2 border-gray-200  rounded-lg dark:border-gray-700">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-4 justify-center h-24 rounded bg-gray-100 dark:bg-gray-700">
          <div className="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
          <div>
            <p className="text-gray-900 dark:text-white">Demandes acceptés</p>
            <p className="text-4xl text-center font-thin text-gray-900 dark:text-white">
              {demandesAcceptesCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-center h-24 rounded bg-gray-100 dark:bg-gray-700">
          <div className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30 "
              fill="currentColor"
              className="bi bi-x-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
            </svg>
          </div>
          <div>
            <p className="text-gray-900 dark:text-white">Demandes réfusés</p>
            <p className="text-4xl text-center font-thin text-gray-900 dark:text-white">
              {demandesRefuseCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-center h-24 rounded bg-gray-100 dark:bg-gray-700">
          <div role="status">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-clipboard-x dark:text-white"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708"
              />
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <div>
            <p className="text-gray-900 dark:text-white">
              Demandes non traitées
            </p>
            <p className="text-4xl text-center font-thin text-gray-900 dark:text-white">
              {demandesCount}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4   mb-4 rounded bg-gray-100 dark:bg-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Demandes
          </h5>
          <Link
            to="/admin/demandes"
            className="text-lg font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </Link>
        </div>

        <div className="relative overflow-x-auto ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 text-sm py-3 font-semibold text-blue-600"
                >
                  Employé
                </th>
                <th
                  scope="col"
                  className="px-6 text-sm py-3 font-semibold text-blue-600"
                >
                  Date Début
                </th>
                <th
                  scope="col"
                  className="px-6 text-sm py-3 font-semibold text-blue-600"
                >
                  Nombre de jours
                </th>
                <th
                  scope="col"
                  className="px-6 text-sm py-3 font-semibold text-blue-600"
                >
                  Numéro de téléphone de l'employé
                </th>
                <th
                  scope="col"
                  className="px-6 text-sm py-3 font-semibold text-blue-600"
                >
                  Motif
                </th>
              </tr>
            </thead>
            <tbody>
              {demandes.map((demande) => (
                <tr
                  key={demande.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="min-w-0  ">
                      <p className="text-sm  font-medium text-gray-900 truncate dark:text-white">
                        {demande.employeeName}
                      </p>
                      <p className="text-sm lg:min-w-40 text-gray-500 truncate dark:text-gray-400">
                        {demande.employeeEmail}
                      </p>
                    </div>
                  </th>
                  <td className="px-6 py-4">{demande.dateDebut}</td>
                  <td className="px-6 py-4">{demande.nbJour}</td>
                  <td className="px-6 py-4">{demande.phoneNumber}</td>
                  <td className="px-6 py-4">{demande.Motif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-4 justify-center h-24 rounded bg-gray-100 dark:bg-gray-700">
          <div className="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person-fill-gear"
              viewBox="0 0 16 16"
            >
              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
            </svg>
          </div>
          <div>
            <p className="text-gray-900 dark:text-white">Admin</p>
            <p className="text-4xl text-center font-thin text-gray-900 dark:text-white">
              {adminCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-center h-24 rounded bg-gray-100 dark:bg-gray-700">
          <div className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person-fill-lock"
              viewBox="0 0 16 16"
            >
              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
            </svg>
          </div>
          <div>
            <p className="text-gray-900 dark:text-white">Super Admin</p>
            <p className="text-4xl text-center font-thin text-gray-900 dark:text-white">
              {superAdminCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-center h-24 rounded bg-gray-100 dark:bg-gray-700">
          <div role="status">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-person-fill dark:text-white"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <div>
            <p className="text-gray-900 dark:text-white">Employés</p>
            <p className="text-4xl text-center font-thin text-gray-900 dark:text-white">
              {employeCount}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4   mb-4 rounded bg-gray-100 dark:bg-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Utilisateurs
          </h5>
          <Link
            to="/admin/users"
            className="text-lg font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </Link>
        </div>

        <div className="relative overflow-x-auto ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="px-6 text-sm py-3 font-semibold text-blue-600"
                >
                  Employé
                </th>
                <th
                  scope="col"
                  className="px-6 text-sm py-3 font-semibold text-blue-600"
                >
                  Nombre de Jours restantes
                </th>

                <th
                  scope="col"
                  className="px-6 text-sm py-3 font-semibold text-blue-600"
                >
                  Numéro de téléphone
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="min-w-0  ">
                      <p className="text-sm  font-medium text-gray-900 truncate dark:text-white">
                        {employee.firstname + " " + employee.name}
                      </p>
                      <p className="text-sm lg:min-w-40 text-gray-500 truncate dark:text-gray-400">
                        {employee.email}
                      </p>
                    </div>
                  </th>

                  <td className="px-6 py-4">{employee.nb_jour}</td>
                  <td className="px-6 py-4">{employee.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
