import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../Redux/reducers/modalReducer";
import WriteModal from "../../Components/WriteModal/WriteModal";

export default function Home(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="bg-[#FF751F] p-10 px-20">
        <h5 className="text-4xl font-bold text-white">
          Write from inside your heart:
        </h5>
        <div
          id="articleSetPopup"
          className="form-control hover:bg-slate-200 cursor-pointer"
          onClick={() => {
            console.log("click");
            dispatch(setModalOpen(true));
          }}
        >
          <span
            style={{
              lineHheight: "2rem",
              fontSize: "1.5rem",
            }}
          >
            Write something ...
          </span>
        </div>
      </div>
      <WriteModal />
    </div>
  );
}
