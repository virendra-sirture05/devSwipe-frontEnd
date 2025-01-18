import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/slice/feedSlice";
import TinderCard from "react-tinder-card";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, About, photoUrl } = user;
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = async (direction, userId) => {
    try {
      let status;
      if (direction === "left") {
        status = "ignored";
      } else if (direction === "right") {
        status = "interested";
      } else {
        console.log("Swipe ignored: ", direction);
        return;
      }

      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next card
    } catch (error) {
      console.error("Error handling swipe: ", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <TinderCard
        className="absolute w-full max-w-md h-auto"
        key={_id}
        onSwipe={(dir) => handleSwipe(dir, _id)}
        preventSwipe={["up", "down"]}
        swipeRequirement={0.5}  // Optional: Adjust swipe threshold
      >
        <div className="auth-modal card bg-base-300 w-96 shadow-xl transition-all duration-1000 ease-in-out">
          {/* Increased duration to 1000ms for slower swipe */}
          <figure>
            <img src={photoUrl} alt={firstName} className="rounded-t-xl" />
          </figure>
          <div className="card-body">
            <h2 className="text-black text-3xl font-sans card-title">{firstName + " " + lastName}</h2>
            <p>{About}</p>
            {age && gender && <p>{age + ", " + gender}</p>}
          </div>
        </div>
      </TinderCard>
    </div>
  );
};

export default UserCard;
