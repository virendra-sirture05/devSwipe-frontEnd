import axios from "axios";
import React from "react";
import { SiTinder } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

import {removeUser} from '../utils/slice/userSlice'

const Navbar = () => {

  const user = useSelector(store=> store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() =>{
    try {
      await axios.post(BASE_URL + '/logout',{},{withCredentials:true})
      dispatch(removeUser());
      navigate('/login');
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navbar bg-gradient-to-r from-pink-500 to-orange-500 text-white px-10 py-5">
      <div className="flex-1">
        <Link to={'/'} className="btn btn-ghost text-xl"><SiTinder/>DevTinder</Link>
      </div>
      <div className="flex-none gap-2">

        {user && <div className="dropdown dropdown-end flex justify-center items-center gap-4">
          <h1 className="text-[20px]">{user.firstName}</h1>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-16 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoUrl}
              />
            </div>
          </div>
        
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={'/profile'} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to={'/connections'}>Connections</Link>
            </li>
            <li>
              <a onClick={handleLogout} >Logout</a>
            </li>
          </ul>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
