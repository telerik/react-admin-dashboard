import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn.jsx';
import { SignUp } from './pages/SignUp.jsx';
import { Home } from './pages/Home.jsx'

const App = () => {
   
    return ( 
        <div className="App">
            <Routes>
               <Route path="/" element={<SignIn/>}/>
               <Route path="/signup" element={<SignUp/>}/>
               <Route path="/home" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
