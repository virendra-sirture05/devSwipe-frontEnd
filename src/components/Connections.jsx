import axios from 'axios';
import React, { useEffect } from 'react'
import BASE_URL from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/slice/connectionSlice';

const Connections = () => {

    const dispatch = useDispatch();
    const connections = useSelector(state=>state.connection);
    console.log(connections);
    const fetchConnections = async()=>{
        try {
            const res = await axios.get(BASE_URL+"/user/connections",{withCredentials: true})
            dispatch(addConnections(res.data.data));
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[])

    if (!connections) return;
    if (connections.length === 0) return <h1> No Connections Found</h1>;
    return (
      <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connections</h1>
        {connections.map((connection,index) => {
          const { firstName, lastName, photoUrl, age, gender, About } =
            connection;
          return (
            <div key={index} className=" flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
              <div>
                <img
                  alt="photo"
                  className="w-20 h-20 rounded-full"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-4 ">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{About}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

export default Connections