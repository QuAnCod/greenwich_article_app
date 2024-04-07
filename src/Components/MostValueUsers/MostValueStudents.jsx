import React from "react";
import useMostValueUsers from "../../hooks/useMostValueStudents";

// import module css
import style from "./MostValueStudents.module.css"

export default function MostValueStudents(props) {
  const mostValueStudents = useMostValueUsers();

  console.log("mostValueStudents", mostValueStudents);

  return (
    <div className="flex justify-around mt-3">
      {mostValueStudents.map((user) => (
        <div
          key={user.id}
          className={style.student}
        >
          <img
            src={user.avatar ? user.avatar : require("../../assets/img/ava_icon.jpg")}
            alt=""
            className={style.studentAvatar}
          />
          <div className={style.studentInfo}>
            <div className={style.studentText}>
              <h3 className="uppercase">{user.username}</h3>
              <p>{user.numberOfArticles} articles</p>
              <p>
                {user.numberOfAcceptedArticles} accepted
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
