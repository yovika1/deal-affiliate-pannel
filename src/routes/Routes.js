import React from 'react'
import Cookies from "js-cookie"
import {Navigate, Route, Routes} from "react-router-dom"
import { Dashboard } from '../pages/Dashboard';
import { Navbar } from '../components/Navbar';
import { Userlogin } from '../pages/Userlogin';
import { Home } from '../pages/Home';
import {ManageBlogs} from '../pages/MangeBlog';
import { FeedbackDashboard } from '../components/feedback';
import { SkincareGuideEditor } from '../pages/GuidanceBlog';


export const Auth = () => {

    const isAuthenticated = Cookies.get("token") || false;
  return (
    <Routes>
    {!isAuthenticated? (
    <>
    <Route path='/'element= {<Home/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/SkincareGuideEditor' element={<SkincareGuideEditor/>}/>
    <Route path='/manage-blogs' element={<ManageBlogs/>}/>
    <Route path='/manage-feedback' element={<FeedbackDashboard/>}/>

    <Route path='/navbar' element={<Navbar/>}/>

    </>
        ):(
            <>
            <Route path='*' element={<Navigate to="/login"/>}/>
            <Route path='/login' element= {<Userlogin/>}/>
            </>
        )}
    </Routes>
  )
}
