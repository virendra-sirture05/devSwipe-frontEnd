import axios from "axios";
import React from "react";
import BASE_URL from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/slice/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, About } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="card bg-base-300 w-96 shadow-xl center">
        <figure>
          <img src={user.photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{About}</p>
          {age && gender && <p>{age + ", " + gender}</p>}
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested",_id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
