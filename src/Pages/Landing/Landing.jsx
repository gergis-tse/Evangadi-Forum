import React, { useState } from 'react'
import About from '../../Components/About/About';
import Login from '../Login/Login';
import Signup from '../Signup';
import Landingcss from "./Landing.module.css"
function Landing() {
  const [isLogin, setIsLogin] = useState(true);
  
  const handleToggle = () => {
    setIsLogin((prev) => !prev); // Toggle between Login and Signup
  };
     return (
       
         <section
           className={`bg-no-repeat pt-20 pb-8 md:pb-16    ${Landingcss.xyz}`}
         >
           <div className="container px-5 md:px-0 mx-auto md:max-w-[80%]">
             <div className="grid grid-cols-1 md:grid-cols-2 ">
                <div className="col-12 col-md-7 signup_login">
            {isLogin ? (
              <Login onToggle={handleToggle} />
            ) : (
              <Signup onToggle={handleToggle} />
            )}
          </div>

               <div className="col-12 col-md-5 ">
                 <About />
               </div>
             </div>
           </div>
         </section>
     
     );
}

export default Landing


