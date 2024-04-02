import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDetailClosure,
  setDisplayEditClosure,
  updateClosure,
} from "../../Redux/reducers/closuresReducer";
import { setDisplayDetailAcademicYear } from "../../Redux/reducers/academicYearsReducer";

export default function EditClosure() {
  const dispatch = useDispatch();

  const { displayEditClosure, detailClosure } = useSelector(
    (state) => state.closuresReducer
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: detailClosure.id,
      faculty_id: editClosure.faculty_id,
      deadline: editClosure.deadline.split("T").join(" "),
      final_deadline: editClosure.final_deadline.split("T").join(" "),
      academic_year_id: editClosure.academic_year_id,
    };
    dispatch(updateClosure(data));
  };

  const handleChanges = (e) => {
    setEditClosure({
      ...editClosure,
      [e.target.id]: e.target.value,
    });
  };

  const [editClosure, setEditClosure] = useState({
    faculty_id: 0,
    deadline: "",
    final_deadline: "",
    academic_year_id: 0,
  });

  useEffect(() => {
    setEditClosure({
      ...editClosure,
      faculty_id: detailClosure.faculty?.id,
      deadline: detailClosure.deadline,
      final_deadline: detailClosure.finalDeadline,
      academic_year_id: detailClosure.academicYear?.id,
    });
  }, [detailClosure]);

  return displayEditClosure ? (
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
        <h2 className="text-center">Edit Closure</h2>
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
              value={editClosure.faculty_id}
              disabled
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
            <input
              onChange={(e) => {
                handleChanges(e);
              }}
              type="datetime-local"
              className="form-control"
              id="deadline"
              step={1}
              value={editClosure.deadline}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="final_deadline" className="form-label">
              Final Deadline Date
            </label>
            <input
              onChange={(e) => {
                handleChanges(e);
              }}
              type="datetime-local"
              className="form-control"
              id="final_deadline"
              step={1}
              value={editClosure.final_deadline}
            />
          </div>
          <div className="form-group mb-3 flex justify-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger ml-2"
              onClick={() => {
                dispatch(setDetailClosure({}));
                dispatch(setDisplayEditClosure(false));
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
