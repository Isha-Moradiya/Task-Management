import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {
  //* make use state to store entered data
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  //* navigate to login page
  const navigate = useNavigate();

  // token in localStorage
  const { storeTokenInLS } = useAuth();

  //* handling the input change values
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  //* form submit get data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:5002/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);

      const res_data = await response.json();
      console.log("res from server", res_data.message);

      if (response.ok) {
        toast.success("Register successfully");
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/login");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.error("Register", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-form">
            <div className="container ">
              {/* registration form */}
              <div className="form-div">
                <h1 className="main-heading">Registration Form</h1>
                <br />

                <form onSubmit={handleFormSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="enter your name"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>
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
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder="enter your phone"
                      required
                      autoComplete="off"
                      value={user.phone}
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

                  <button type="submit">Register Now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
