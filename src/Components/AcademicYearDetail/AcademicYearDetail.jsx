import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDetailAcademicYear,
  setDisplayDetailAcademicYear,
} from "../../Redux/reducers/academicYearsReducer";
import {
  deleteClosure,
  setClosures,
  setDetailClosure,
  setDisplayAddClosure,
  setDisplayEditClosure,
} from "../../Redux/reducers/closuresReducer";

export default function AcademicYearDetail(props) {
  const dispatch = useDispatch();

  const { displayDetailAcademicYear, detailAcademicYear } = useSelector(
    (state) => state.academicYearsReducer
  );

  const { closures } = useSelector((state) => state.closuresReducer);

  return displayDetailAcademicYear ? (
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
        <h2 className="text-center">
          Academic Year: {detailAcademicYear?.year}
        </h2>
        <form>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              dispatch(setDisplayAddClosure(true));
              dispatch(setDisplayDetailAcademicYear(false));
            }}
          >
            Add more
          </button>
          {closures.map((closure, index) => {
            return (
              <div
                className="form-group mb-3"
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: "10px",
                }}
              >
                <div>
                  <label htmlFor="faculty" className="form-label">
                    Faculty
                  </label>
                  <input
                    type="text"
                    name="faculty"
                    value={closure.faculty.name}
                    className="form-control"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="closure" className="form-label">
                    Closure
                  </label>
                  <input
                    type="text"
                    name="closure"
                    value={(() => {
                      const date = closure.deadline.split("T").join(" ");
                      return date;
                    })()}
                    className="form-control"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="finalDeadline" className="form-label">
                    Final Deadline
                  </label>
                  <input
                    type="text"
                    name="finalDeadline"
                    value={(() => {
                      const date = closure.finalDeadline.split("T").join(" ");
                      return date;
                    })()}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      dispatch(setDetailClosure(closure));
                      dispatch(setDisplayEditClosure(true));
                    }}
                  >
                    <i className="fas fa-edit" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger ml-2"
                    onClick={() => {
                      // deleteClosure(closure.id);
                      const data = {
                        id: closure.id,
                        academicYearId: closure.academicYear.id,
                      };
                      dispatch(deleteClosure(data));
                    }}
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            );
          })}
          <div className="form-group mb-3 flex justify-end">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                dispatch(
                  setDetailAcademicYear({
                    id: 0,
                    year: "",
                    current: 0,
                  })
                );
                dispatch(setDisplayDetailAcademicYear(false));
                dispatch(setClosures([]));
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
