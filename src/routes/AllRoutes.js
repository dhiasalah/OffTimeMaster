import { Routes,Route } from "react-router"
import { HomePage } from "../pages/Home/HomePage";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { About } from "../pages";
import { AdminHome } from "../pages/admin/AdminHome";
import { EmployeeHome } from "../pages/employee/EmployeeHome";
import React from 'react';
import { useSelector } from "react-redux";
import { PageNotFound } from "../pages/PageNotFound";
import { DemandeConge } from "../pages/employee/DemandeConge";
import { Demandes } from "../pages/admin/Demandes";
import { Dashboard } from "../pages/admin/Dashboard";
import { Users } from "../pages/admin/Users";
import { AdminList } from "../pages/admin/AdminList";
import { AdminProfile } from "../pages/admin/AdminProfile";
export const AllRoutes = () => {
  const user=useSelector(state=>state.userState.user);
  const isAuth=useSelector(state=>state.userState.loggedIn);

  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            {!isAuth &&             <Route path="/register" element={<Register/>}></Route>}
            {!isAuth &&             <Route path="/login" element={<Login/>}></Route>}

            <Route path="/about" element={<About/>}></Route>
            {
                user && user.role==="admin" &&
                <Route path="/admin" element={<AdminHome/> }>
                  <Route path="dashboard" element={<Dashboard/>}></Route>
                  <Route path="demandes" element={<Demandes/>}></Route>
                  <Route path="users" element={<Users/>}></Route>
                  {
                    user.role==="admin" && user.super && (<Route path="admins" element={<AdminList/>}></Route>)
                  }
                  <Route path="profile" element={<AdminProfile/>}></Route>
                </Route>

            }

            {
              user && user.role==="employe" && <Route path="/employe" element={  <EmployeeHome/> }></Route>
            }
            {
              user && user.canRequest && user.role==="employe" && <Route path="/demandeconge" element={  <DemandeConge/> }></Route>
            }


            <Route path="*" element={<PageNotFound/>}></Route>
            


            
        </Routes>
    </>
  )
}
