import axios from "axios";
import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { IoKeySharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slice/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from '../utils/constant'

const Login = () => {
  const [email, setEmail] = useState("salman@gmail.com");
  const [password, setPassword] = useState("Salman@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL+'/login',
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      console.log("user added");
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="card bg-gradient-to-r from-pink-700 to-red-700 w-96 shadow-lg mx-auto mt-12">
        <div className="card-body">
          <h2 className="card-title">Login</h2>

          <label className="input input-bordered flex items-center gap-2 ">
            <IoMdMail />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              className="grow"
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <IoKeySharp />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="grow"
            />
          </label>

          <div className="card-actions justify-center">
            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
