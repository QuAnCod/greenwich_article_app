import React from "react";
import useMostValueUsers from "../../hooks/useMostValueStudents";

export default function MostValueStudents(props) {
  const mostValueStudents = useMostValueUsers();

  console.log("mostValueStudents", mostValueStudents);

  return (
    <div className="flex justify-around">
      {mostValueStudents.map((user) => (
        <div
          key={user.id}
          className="flex flex-col hover:scale-110 transition-all duration-150"
          style={{
            position: "relative",
          }}
        >
          <img
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
            alt=""
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              opacity: 0.3,
            }}
          />
          <div
            className="text-center"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <h3 className="text-2xl">{user.username}</h3>
              <p className="text-2xl">{user.numberOfArticles} articles</p>
              <p className="text-2xl">
                {user.numberOfAcceptedArticles} accepted
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
