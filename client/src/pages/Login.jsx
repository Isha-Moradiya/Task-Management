import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // navigate page
  const navigate = useNavigate();

  // token in localStorage
  const { storeTokenInLS } = useAuth();

  //* handle input
  const handleInput = (e) => {
    let { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  //* submit form show data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5002/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        console.log("res from server", res_data);
        // localStorage.setItem("token",res_data.token)
        storeTokenInLS(res_data.token);

        toast.success("Login Successfull"),
          setUser({ email: "", password: "" }),
          navigate("/task");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section>
        <main>
          <section className="section-form">
            <div className="container ">
              {/* login form */}
              <div className="form-div">
                <h1 className="main-heading ">Login Form</h1>
                <br />

                <form onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="enter your email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="enter your password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <button type="submit">Login Now</button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </section>
    </>
  );
};
