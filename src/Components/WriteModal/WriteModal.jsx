import React, { useEffect, useState } from "react";
import { setModalOpen } from "../../Redux/reducers/modalReducer";
import { useSelector, useDispatch } from "react-redux";
import { set } from "lodash";
import { postArticle } from "../../Redux/reducers/articleReducer";
import { findFinalDeadline } from "../../Utils/function/helperFunc";
import { Tooltip } from "antd";

const checkValidSubmit = (newArticle, file, pictures) => {
  if (
    newArticle.name === "" ||
    newArticle.description === "" ||
    file === null ||
    pictures.length === 0
  ) {
    return false;
  }
  return true;
};

const checkDateValidToSubmit = (closures, currentDate, faculty_id) => { // closures: array of closure, currentDate: current date, faculty_id: faculty id 
  // return false if the final deadline has passed or there is no closure of the faculty
  const finalDeadline = findFinalDeadline(closures, faculty_id);
  // If final deadline is null, return false
  if (finalDeadline === null || finalDeadline === undefined || finalDeadline == "Invalid Date") {
    return false;
  }
  if (currentDate > finalDeadline) {
    return false;
  }
  return true;
};

export default function WriteModal(props) {

  const { modalOpen } = useSelector((state) => state.modalReducer);

  // get user data from redux store
  const { data } = useSelector((state) => state.userReducer.userLogin);

  const { closures } = useSelector((state) => state.closuresReducer);

  const currentDate = new Date();

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
    // check if the form is valid
    if (!checkValidSubmit(newArticle, file, pictures)) {
      alert("Please fill all the fields");
      return;
    }
    // check if the date is valid to submit
    if (!checkDateValidToSubmit(closures, currentDate, newArticle.faculty_id)) {
      alert("The final deadline has passed");
      return;
    }
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
  };

  return modalOpen ? (
    <div className="modalLayout">
      <div className="bg-[#FF751F] p-10 px-20 modalContainer">
        <div className="flex justify-between items-center">
          <h5 className="modalTitle">Write Article</h5>
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
          onSubmit={handleOnSubmitArticle}
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
              <div className="mb-[5px]">
                <button
                  // style={{
                  //   width: "100px",
                  //   marginRight: "5px",
                  // }}
                  type="button"
                  className="blueBtn"
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
                  // style={{ width: "100px", marginRight: "5px" }}
                  type="button"
                  className="blueBtn"
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
                        // console.log(files[0]);
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
              <Tooltip title={checkDateValidToSubmit(closures, currentDate, newArticle.faculty_id) ? "Submit the article" : "You cannot submit the article now"}>
                <button style={{ margin: "0" }}
                  type="submit"
                  className="blueBtn"
                  disabled={checkDateValidToSubmit(closures, currentDate, newArticle.faculty_id) ? false : true}
                >
                  Submit
                </button>
              </Tooltip>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}
