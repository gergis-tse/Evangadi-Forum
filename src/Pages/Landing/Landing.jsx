import React, { useState } from 'react'
import About from '../../Components/About/About';
import Login from '../Login/Login';
import Register from '../Sign-up/Register';

function Landing() {
  const [isLogin, setIsLogin] = useState(true);
     return (
    <div
      className="bg-no-repeat pt-20 pb-8 md:pb-16    xyz"
      style={{
        backgroundImage: `url(/10001%(2).svg) !important`,
        backgroundSize: "cover",
      }}
    >
      <div className="container px-5 md:px-0 mx-auto md:max-w-[80%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-12 col-md-5 shadow-md auth mx-4 md:mx-0 bg-white rounded-lg py-6 px-8">
            {isLogin ? <Login /> : <Register />}
            <div className="mt-4">
              {isLogin ? (
                <p>
                  Don't have an account?
                  <span
                    className="cursor-pointer text-blue-600"
                    onClick={() => setIsLogin(false)}
                  >
                    Create new account
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?
                  <span
                    className="cursor-pointer text-blue-600"
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="col-12 col-md-7">
            <About />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing
