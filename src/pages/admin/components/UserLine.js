import React from "react";
import { db } from "../../../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
export const UserLine = ({ user, toggle, setToggle }) => {
  async function handleDelete() {
    const userref = doc(db, "users", user.id);
    await deleteDoc(userref);
    setToggle(!toggle);
  }
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="min-w-0  ">
          <p className="text-sm  font-medium text-gray-900 truncate dark:text-white">
            {user.firstname + " " + user.name}
          </p>
          <p className="text-sm lg:min-w-40 text-gray-500 truncate dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </th>

      <td className="px-6 py-4">{user.nb_jour}</td>
      <td className="px-6 py-4">{user.phoneNumber}</td>

      <td className="px-6 py-4 text-center">
        <div className="text-red-500 cursor-pointer w-8 h-8 me-2 ">
          <button onClick={() => handleDelete()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-trash3-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};
