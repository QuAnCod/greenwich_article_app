import React, { useEffect, useState } from "react";
import { setModalOpen } from "../../Redux/reducers/modalReducer";
import { useSelector, useDispatch } from "react-redux";
import { set } from "lodash";
import { postArticle } from "../../Redux/reducers/articleReducer";

export default function WriteModal(props) {
  const { modalOpen } = useSelector((state) => state.modalReducer);

  // get user data from redux store
  const { data } = useSelector((state) => state.userReducer.userLogin);

  const dispatch = useDispatch();

  // create a new article state
  const [newArticle, setNewArticle] = useState({
    name: "",
    description: "",
    status: "pending",
    view: 0,
    academic_id: 1,
    user_id: data?.id,
    faculty_id: data?.faculty?.id,
  });

  // create a file state
  const [file, setFile] = useState(null);

  // create a picture state
  const [pictures, setPictures] = useState([]);

  // console.log(pictures.length);

  const handleChangeArticle = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  // handle submit form
  const handleOnSubmitArticle = (e) => {
    e.preventDefault();
  };

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
              setNewArticle({
                ...newArticle,
                name: "",
                description: "",
              });
              setFile(null);
              setPictures([]);
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
            const formData = new FormData();
            formData.append("file", file);
            formData.append("newArticle", JSON.stringify(newArticle));
            // formData.append("newArticle", newArticle);
            // formData.append("pictures", pictures);
            for (let index = 0; index < pictures.length; index++) {
              formData.append("pictures", pictures[index]);
            }
            // write code to dispatch the action
            dispatch(postArticle(formData));
          }}
        >
          <div className="form-group mb-4">
            <label htmlFor="name" className="font-bold text-2xl">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter article name"
              onChange={handleChangeArticle}
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="description" className="font-bold text-2xl">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter article description"
              rows={4}
              style={{
                resize: "none",
              }}
              onChange={handleChangeArticle}
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
                        // console.log(file);
                        setFile(file);
                      };
                      input.click();
                    };
                    handleFileOpen();
                  }}
                >
                  Browse
                </button>
                <span>{file?.name || "No file was choosen"}</span>
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
                      input.max = 3; // specify the maximum number of files allowed
                      input.onchange = (event) => {
                        const files = event.target.files;
                        // do something with the selected files
                        // console.log(files);
                        const filesArray = Array.from(files);
                        setPictures(filesArray);
                      };
                      input.click();
                    };
                    handleFileOpen();
                  }}
                >
                  Pictures
                </button>
                <span>
                  {pictures.length !== 0
                    ? pictures
                      .map((picture, index) => `${picture.name}`)
                      .join(", ")
                    : "No pictures choosen"}
                </span>
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
