import React from 'react'
import { Routes, Route,Navigate } from "react-router";
import Homepage from './Pages/Homepage';
import ScribeHome from './Pages/Scribe/ScribeHome';
import Login from './Pages/Login';
import ScribeRegister from './Pages/Scribe/ScribeRegister';
import StudentRegister from './Pages/Student/StudentRegister';
import StudentHome from './Pages/Student/StudentHome';
import useGlobal from './utils/GlobalContext';
import axiosClient from './utils/axiosClient';
import { useEffect } from 'react';
import Bookings from './Pages/Scribe/Bookings.jsx';
import BookingStudent from './Pages/Student/BookingStudent.jsx';
import ChatPage from './Pages/ChatPage.jsx';
import CallPage from './Pages/CallPage.jsx';
import RejectedRequest from './Pages/Student/RejectedRequest.jsx';
import UnifiedProfile from './Pages/Student/UnifiedProfile.jsx';
import Dashboard from './Pages/Dashboard.jsx';

const App = () => {
  const {isAuthenticated,setIsAuthenticated}=useGlobal();
  const {user,setUser}=useGlobal();

  // console.log(isAuthenticated,user)
  //checkApiCall
  useEffect(()=>{
    const check=async()=>{
    try{
   const response=await axiosClient.get("/auth/check");
   const {_id,fullName,profile,state,cityOrVillage,pincode,role}=response?.data?.user
    if(response){
    setIsAuthenticated(true);
     
    setUser(response.data.user);
    }


    }
    catch(e){
      console.log("not verified");
    }
  }
  check();
  },[])
  
 
  return (
   <>
   <Routes>
   <Route path="/" element={ isAuthenticated ? (
      user.role === "scribe" ? (
        <Navigate to="/scribeHome" />
      ) : user.role === "student" ? (
        <Navigate to="/studentHome" />
      ) : (
        <Homepage />
      )
    ) : (
      <Homepage />
    )
  }
/>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/scribeRegister' element={<ScribeRegister/>}></Route>
    <Route path='/studentRegister' element={<StudentRegister/>}></Route>
    <Route path='/profile' element={<UnifiedProfile/>}></Route>
    <Route path='/scribeHome' element={isAuthenticated&&user.role==="scribe"?<ScribeHome/>:<Navigate to="/"></Navigate>}></Route>
    <Route path='/studentHome' element={isAuthenticated&&user.role==="student"?<StudentHome/>:<Navigate to="/"></Navigate>}></Route>
    {/* <Route path='/rejectedrequest' element={isAuthenticated&&user.role==="student"?<RejectedRequest/>:<Navigate to="/"></Navigate>}></Route> */}
    {/* <Route path='/bookings' element={isAuthenticated && user.role==="scribe"?<Bookings/>:<Navigate to="/"></Navigate>}></Route> */}
    <Route path='/bookings'element={isAuthenticated&& user.role === "scribe"? <Bookings/> : <BookingStudent/>} > </Route>
    
        <Route path="/chat/:id" element={isAuthenticated?<ChatPage/>:<Login/>}></Route>
        <Route path="/call/:id" element={isAuthenticated?<CallPage/>:<Login/>}></Route>
        <Route path="/dashboard" element={isAuthenticated ? user.role==="scribe" ? <ScribeHome/> : <StudentHome/> :<Login/>}></Route>
        <Route path="/history" element={isAuthenticated?<Dashboard/>:<Login/>}></Route>
   
   </Routes>
   </>
  )
}

export default App
