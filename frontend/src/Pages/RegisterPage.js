import React, { useState } from "react";
import {
  HiUser,
  HiOutlineLockClosed,
  HiMail,
} from "react-icons/hi";
import { MdSecurity } from "react-icons/md";
import "./login.css";

import axios from "axios";

const SignUpPage = ({ isShowLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      alert("Passwords do not match");
      return;
    }
    const spaceIndex = name.indexOf(" ");

    let first_name, last_name;

    if (spaceIndex !== -1) {
      first_name = name.slice(0, spaceIndex);
      last_name = name.slice(spaceIndex + 1);
    } else {
      first_name = name;
      last_name = "";
    }
    if (userType === "student") {
      try {
        const response = await axios.post("/students/signup", {
          first_name: first_name,
          last_name: last_name,
          email: email,
          majors: [],
          minors: [],
          courses: [],
          gpa: 0,
          credits: 0,
          question: securityQuestion,
          answer: securityAnswer,
          password: password,
        });
        document.cookie = `authToken=${response.data.token}; path=/;`;
        document.cookie = `name=${response.data.name}; path=/;`;
        document.cookie = `userType=${userType}; path=/;`;
        document.cookie = `userID=${response.data.id}; path=/;`;
        window.location.href = "/";
      } catch (error) {
        console.error("Failed to sign up student", error.response.data);
      }
    } else {
      try {
        const response = await axios.post("/advisors/signup", {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
        });
        document.cookie = `authToken=${response.data.token}; path=/;`;
        document.cookie = `name=${response.data.name}; path=/;`;
        document.cookie = `userType=${userType}; path=/;`;
        document.cookie = `userID=${response.data.id}; path=/;`;
        window.location.href = "/";
      } catch (error) {
        console.error("Failed to sign up advisor", error.response.data);
      }
    }
  };


  return (
    <div className="register-page">
      <div className="form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="input-container">
            <div className="input-box">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="student"> I am a student </option>
                {/*<option value="advisor"> I am an advisor </option>*/}
              </select>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <HiUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <HiMail className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <HiOutlineLockClosed className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Re enter Password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
              />
              <HiOutlineLockClosed className="icon" />
            </div>
            <div className="input-box">
              <select
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
              >
                <option value="">Select Security Question</option>
                <option value="What is your pet's name?">
                  What is your pet's name?
                </option>
                <option value="Where were you born?">
                  Where were you born?
                </option>
                <option value="What is your mother's name?">
                  What is your mother's name?
                </option>
                <option value="What is your father's name?">
                  What is your father's name?
                </option>
              </select>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter Answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
              <MdSecurity className="icon" />
            </div>
          </div>
          <button type="submit" className="button">
            {" "}
            Sign Up{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
