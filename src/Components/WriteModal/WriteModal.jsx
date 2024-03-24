import React, { useEffect } from "react";
import { setModalOpen } from "../../Redux/reducers/modalReducer";
import { useSelector, useDispatch } from "react-redux";

export default function WriteModal(props) {
  const { modalOpen } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  return modalOpen ? (
    <div
      style={{
        display: "block",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        className="bg-[#FF751F] p-10 px-20"
        style={{
          width: "50%",
          margin: "auto",
          marginTop: "10%",
          borderRadius: "10px",
        }}
      >
        <div className="flex justify-between items-center">
          <h5 className="text-4xl font-bold text-white">Write Article</h5>
          <button
            className="text-white"
            onClick={() => {
              dispatch(setModalOpen(false));
            }}
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
        <form
          onSubmit={(e) => {
            // write code to submit the form
            e.preventDefault();
          }}
        >
          <div className="form-group mb-4">
            <label htmlFor="name" className="font-bold text-2xl">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              placeholder="Enter article name"
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="description" className="font-bold text-2xl">
              Description
            </label>
            <textarea
              type="description"
              className="form-control"
              id="description"
              placeholder="Enter article description"
              rows={4}
              style={{
                resize: "none",
              }}
            />
          </div>
          <div className="flex justify-end items-center">
            <input
              style={{
                width: "1.25rem",
                height: "1.25rem",
              }}
              className="form-check-input mr-2"
              type="checkbox"
              name="term"
              id="term"
              required
            />{" "}
            <label htmlFor="term" className="font-normal text-2xl">
              Term of Conditions
            </label>
          </div>
          <div className="flex justify-between mt-4">
            <div
              className="btn-group-vertical"
              role="group"
              aria-label="Vertical button group"
            >
              <div className="">
                <button
                  style={{
                    width: "100px",
                    marginBottom: "5px",
                    marginRight: "5px",
                  }}
                  type="button"
                  className="bg-[#235895] text-white px-10 py-3 rounded-lg font-bold"
                  onClick={() => {
                    // write code to open file dialog
                    const handleFileOpen = () => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = ".doc,.pdf,.pptx,.docx"; // specify the file types you want to allow
                      input.onchange = (event) => {
                        const file = event.target.files[0];
                        // do something with the selected file
                      };
                      input.click();
                    };
                    handleFileOpen();
                  }}
                >
                  Browse
                </button>
                <span>No file choosen</span>
              </div>
              <div>
                <button
                  style={{ width: "100px", marginRight: "5px" }}
                  type="button"
                  className="bg-[#235895] text-white px-10 py-3 rounded-lg font-bold"
                  onClick={() => {
                    // write code to open file dialog for multiple files
                    const handleFileOpen = () => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*"; // specify the file types you want to allow
                      input.multiple = true;
                      input.max = 5; // specify the maximum number of files allowed
                      input.onchange = (event) => {
                        const files = event.target.files;
                        // do something with the selected files
                        console.log(files);
                      };
                      input.click();
                    };
                    handleFileOpen();
                  }}
                >
                  Pictures
                </button>
                <span>No picture choosen</span>
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="bg-[#235895] text-white px-10 py-3 rounded-lg font-bold"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
