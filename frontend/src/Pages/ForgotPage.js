import React, { useState } from "react";
import { HiUser, HiOutlineLockClosed } from "react-icons/hi";

import "./login.css";

const LoginPage = ({ isShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const handleReset = (e) => {};
  return (
    <div className="login-page">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <HiUser className="icon" />
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
        <button type="submit" className="button">
          {" "}
          Reset Password{" "}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
