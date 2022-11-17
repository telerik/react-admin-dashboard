import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn.jsx';
import { SignUp } from './pages/SignUp.jsx';
import { Home } from './pages/Home.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { About } from './pages/About.jsx'

const App = () => {
   
    return ( 
        <div className="App">

            <Routes>
               
               <Route path="/" element={<SignIn/>}/>
               <Route path="/signup" element={<SignUp/>}/>
               <Route path="/home" element={<Home/>}>
               <Route path="/home/dashboard" element={<Dashboard/>}/>
               <Route path="/home/about" element={<About/>}/>

                </Route>
            </Routes>

        </div>
    );
}

export default App;
