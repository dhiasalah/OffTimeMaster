import React from "react";
import { useDispatch } from "react-redux";
import { gerer } from "../../../store/demandeSlice";
export const DetailLine = ({ setShowPopup, showPopup, demande }) => {
  const dispatch = useDispatch();

  return (
    <tr
      onClick={() => {
        dispatch(gerer(demande));
        setShowPopup(true);
      }}
      className="hover:bg-gray-100 cursor-pointer bg-white border-b  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
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
      <td className="px-6 py-4">
        <div className="flex gap-2 cursor-pointer">
          <div className="text-green-500 w-8 h-8 me-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-check-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
            </svg>
          </div>
          <div className="text-red-500 w-8 h-8 me-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-x-square-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
            </svg>
          </div>
        </div>
      </td>
    </tr>
  );
};
