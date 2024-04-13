import React from 'react'
import { Link } from 'react-router-dom'
import NotFound from "../assets/images/page-not-found.jpg"
import { useTitle } from '../hooks/useTitle'
export const PageNotFound = () => {
  useTitle("Page not found")

  return (
    <main>
      <section className="flex flex-col justify-center px-2">
        <div className="flex flex-col items-center my-4">
          <p className="text-4xl text-gray-700 font-bold my-10 dark:text-white">404, Oops!</p>
          <div className="max-w-lg">
            <img className="rounded " src={NotFound} alt="404 Page Not Found" />
          </div>
        </div>

        <div className="flex justify-center my-4">
          <Link to="/">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Back to Home</button>

          </Link>
        </div>
      </section>
     
    </main>
  )
}
