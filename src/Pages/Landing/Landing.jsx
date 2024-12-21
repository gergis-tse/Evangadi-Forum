import React, { useState } from 'react'
import About from '../../Components/About/About';
import Login from '../Login/Login';
import Signup from '../SignUp/Signup';
<<<<<<< HEAD
import styles from "./Landing.module.css";



const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin((prev) => !prev); // Toggle between Login and Signup
  }
  return (
    <div className={styles.container}>
        <div className={styles.left}>
          {isLogin ? <Login onToggle={handleToggle}/> : <Signup onToggle={handleToggle}/>}
        </div>
      <div className={styles.right}>
        <About />
      </div>
    </div>
  );
};

export default Landing;



=======
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
>>>>>>> 08fffca24b7ba34d324e1adbb561dedc094039fb


