import React from "react";

const UserCard = ({user}) => {

    const {firstName, lastName, age, gender, About} = user;
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="card bg-base-300 w-96 shadow-xl center">
        <figure>
          <img
            src={user.photoUrl}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " "+ lastName}</h2>
          <p>{About}</p>
          { age && gender && <p>{age + ", " + gender}</p>}
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
