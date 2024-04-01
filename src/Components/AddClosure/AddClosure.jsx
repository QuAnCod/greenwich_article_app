import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postClosure,
  setDisplayAddClosure,
} from "../../Redux/reducers/closuresReducer";
import { setDisplayDetailAcademicYear } from "../../Redux/reducers/academicYearsReducer";
import { set } from "lodash";

export default function AddClosure(props) {
  const dispatch = useDispatch();

  const { displayAddClosure } = useSelector((state) => state.closuresReducer);

  const academic_year_id = useSelector(
    (state) => state.academicYearsReducer.detailAcademicYear.id
  );

  const [newClosure, setNewClosure] = useState({
    faculty_id: 0,
    deadline: "",
    final_deadline: "",
    academic_year_id: academic_year_id,
  });

  const handleChanges = (e) => {
    if (e.target.id === "deadline" || e.target.id === "final_deadline") {
      //   console.log(e.target.value.split("T").join(" "));
      setNewClosure({
        ...newClosure,
        [e.target.id]: e.target.value.split("T").join(" "),
      });
    } else {
      setNewClosure({
        ...newClosure,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newClosure);
    // check if the user has selected a faculty
    if (newClosure.faculty_id === 0) {
      alert("Please select a faculty");
      return;
    }
    // check if the user has selected a deadline
    if (newClosure.deadline === "") {
      alert("Please select a deadline");
      return;
    }
    // check if the user has selected a final deadline
    if (newClosure.final_deadline === "") {
      alert("Please select a final deadline");
      return;
    }
    if (newClosure.deadline >= newClosure.final_deadline) {
      alert("Final deadline must be after deadline");
      return;
    }
    dispatch(postClosure(newClosure));
  };

  return displayAddClosure ? (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className="p-5"
        style={{
          backgroundColor: "white",
          width: "500px",
          borderRadius: "10px",
        }}
        id="acdemic-year-detail"
      >
        <h2 className="text-center">Add Closure</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="faculty" className="form-label">
              Faculty
            </label>
            <select
              onChange={(e) => {
                handleChanges(e);
              }}
              className="form-control"
              id="faculty_id"
              defaultValue={0}
            >
              <option value={0} disabled>
                Select Faculty
              </option>
              <option value={1}>Computing</option>
              <option value={2}>Business</option>
              <option value={3}>Design</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="deadline" className="form-label">
              Closures Date
            </label>
            <div className="flex gap-2">
              <input
                onChange={(e) => {
                  handleChanges(e);
                }}
                type="datetime-local"
                className="form-control"
                id="deadline"
                step={1}
              />
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="final_deadline" className="form-label">
              Final Deadline Date
            </label>
            <div className="flex gap-2">
              <input
                onChange={(e) => {
                  handleChanges(e);
                }}
                type="datetime-local"
                className="form-control"
                id="final_deadline"
                step={1}
              />
            </div>
          </div>
          <div className="form-group mb-3 flex justify-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger ml-2"
              onClick={() => {
                setNewClosure({
                  faculty_id: 0,
                  deadline: "",
                  final_deadline: "",
                  academic_year_id: academic_year_id,
                });
                dispatch(setDisplayAddClosure(false));
                dispatch(setDisplayDetailAcademicYear(true));
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
