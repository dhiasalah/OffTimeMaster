import React from "react";

export const AboutCard = ({ image, nom, lien, para }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-12 my-4">
      <div
        id="defaultTabContent"
        className=" flex flex-row items-center justify-center"
      >
        <div className="w-40">
          <img src={image} alt="" />
        </div>
        <div
          className=" w-3/4 p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
          id="about"
          role="tabpanel"
          aria-labelledby="about-tab"
        >
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {nom}
          </h2>
          <p className="mb-3 text-gray-500 dark:text-gray-400">{para}</p>
          <a
            href={lien}
            target="_blank"
            className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
          >
            Learn more
            <svg
              className=" w-2.5 h-2.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
