import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosBase from "../../utility/axios";
function Register() {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailAddressDom = useRef();
  const passwordDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    const userValue = userNameDom.current.value;
    const firstValue = firstNameDom.current.value;
    const lastValue = lastNameDom.current.value;
    const emailValue = emailAddressDom.current.value;
    const passwordValue = passwordDom.current.value;
    try {
      if (
        !userValue ||
        !firstValue ||
        !lastValue ||
        !emailValue ||
        !passwordValue
      ) {
        alert("please provied all required values");
        return;
      }
      const response = await axiosBase.post("/users/register", {
        username: userValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passwordValue,
      });

      console.log(response?.data?.message);
      alert(response?.data);
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log(error?.response?.data);
    }
  }
  return (
    <section>
      <form
        style={{
          backgroundColor: "orange",
          width: "50%",
          textAlign: "center",
          padding: 10,
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <input ref={userNameDom} type="text" placeholder="username" />
        </div>

        <br />
        <div>
          <input ref={firstNameDom} type="text" placeholder="firstname" />
        </div>
        <br />
        <div>
          <input ref={lastNameDom} type="text" placeholder="lastname" />
        </div>
        <br />
        <div>
          <input
            ref={emailAddressDom}
            type="email"
            placeholder="email address"
          />
        </div>

        <br />
        <div>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>

        <br />
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      <Link to={"/login"}>login</Link>
    </section>
  );
}

export default Register;
