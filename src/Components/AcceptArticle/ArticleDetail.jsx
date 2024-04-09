import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API, LOCAL_STORAGE } from "../../Utils/constanst/localConstanst";
import { useNavigate } from "react-router";
import { postComment } from "../../Redux/reducers/commentReducer";
import { deleteArticle } from "../../Redux/reducers/articleReducer";

export const getLastComment = (comments) => {
  if (comments?.length === 0) {
    return "There is no comment yet";
  }
  return comments[comments.length - 1].content;
};

export default function ArticleDetail(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const { articleDetail } = useSelector((state) => state.articleReducer);

  const { closures } = useSelector((state) => state.articleReducer);

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const [comment, setComment] = useState("");
  const [status, setStatus] = useState(articleDetail.status);

  const currentDate = new Date();
  const createDate = new Date(articleDetail.created_at);

  console.log(articleDetail);

  useEffect(() => {
    setComment(getLastComment(articleDetail?.article_comment));
  }, [])

  return (
    <div>
      <div className="p-10 px-20 flex justify-between">
        <div className="flex justify-start items-center w-1/3">
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginRight: "20px",
            }}
            src={require("../../assets/img/ava_icon.jpg")}
            alt=""
          />
          <div className="text-start">
            <h6 className="text-black text-2xl font-bold">
              {articleDetail.username}
            </h6>
            <h6 className="text-black text-lg">
              <span>30 </span>
              <span className="uppercase">article</span>
            </h6>
            <h6 className="text-black text-lg">
              <span>15 </span>
              <span className="uppercase">accepted</span>
            </h6>
            <h6 className="text-black text-lg">
              <span>5 </span>
              <span className="uppercase">pendding</span>
            </h6>
          </div>
        </div>
        <div className="w-2/3 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{articleDetail.name}</h2>
            <p className="text-lg">{articleDetail.description}</p>
          </div>
          <div className="flex justify-end items-center">
            <button
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                lineHeight: "1.5",
              }}
              onClick={() => {
                navigate(-1);
              }}
              className="btn btn-link"
            >
              <i className="fas fa-backward" /> Back
            </button>
          </div>
        </div>
      </div>
      <div className="p-10 px-20 flex justify-between">
        {/* <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe> */}
        {/* write code to embedded the document hear */}
        {/* view the document on the web */}
        <object
          data={`${API.READ_FILE}/${articleDetail.fileName}`}
          width="100%"
          height="600px"
          type="application/pdf"
        >
          <embed
            src={`${API.READ_FILE}/${articleDetail.fileName}`}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        </object>
        {/* <iframe
          src={`${API.READ_FILE}/${articleDetail.fileName}`}
          width="60%"
          height="500px"
        ></iframe> */}
        <form className="accept-area w-2/5 px-5" onSubmit={(e) => {
          if (articleDetail.status === "accepted" || articleDetail.status === "rejected"
            || currentDate.getTime() - createDate.getTime() > 7 * 24 * 60 * 60 * 1000) {
            return;
          }
          e.preventDefault();
          const sendData = {
            content: comment,
            article_id: articleDetail.id,
            user_id: data.id,
            status,
            fileName: articleDetail.fileName,
          }
          dispatch(postComment(sendData));
        }}>
          <div className="comment-status">
            <div className="form-group mb-3">
              <label htmlFor="comment" className="text-lg form-label">
                Comment
              </label>
              {/* show the last comment */}
              {/* when click on p tags it switch to textarea */}
              {isEdit ? (
                <div className="text-end">
                  <textarea
                    className="form-control"
                    name="comment"
                    id="comment"
                    rows="3"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    value={comment}
                    disabled={articleDetail.status === "accepted" || articleDetail.status === "rejected" || currentDate.getTime() - createDate.getTime() > 7 * 24 * 60 * 60 * 1000}
                  ></textarea>
                  <button className="btn btn-success mt-2" onClick={(e) => {
                    e.preventDefault();
                    const sendData = {
                      content: comment,
                      article_id: articleDetail.id,
                      user_id: data.id,
                      status,
                      fileName: articleDetail.fileName,
                    }
                    dispatch(postComment(sendData));
                    setIsEdit(false);
                  }}>Comment</button>
                </div>
              ) : (
                <p onClick={() => {
                  if (articleDetail.status === "accepted" || articleDetail.status === "rejected" || currentDate.getTime() - createDate.getTime() > 7 * 24 * 60 * 60 * 1000) {
                    return;
                  }
                  setIsEdit(true);
                }}>{comment}</p>
              )}
            </div>
            {(() => {
              if (articleDetail.status === "accepted" || articleDetail.status === "rejected") {
                return (
                  <div>You cannot choose status after accept or reject it</div>
                )
              }
              if (currentDate.getTime() - createDate.getTime() > 7 * 24 * 60 * 60 * 1000) {
                return (
                  <div>The deadline to accept has passed</div>
                )
              }
              else {
                return (
                  <div className="form-group mb-3">
                    <label htmlFor="status" className="text-lg form-label">
                      Choose Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="form-select"
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      disabled={articleDetail.status === "accepted" || articleDetail.status === "rejected"}
                    >
                      <option value="pendding">
                        Pendding
                      </option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                )
              }
            })()}
          </div>
          <div className="flex justify-end">
            {/* button delete if the deadline is passed or the status is rejected */}
            {(currentDate.getTime() - createDate.getTime() > 7 * 24 * 60 * 60 * 1000 && articleDetail.status !== "accepted") || articleDetail.status === "rejected" ? (
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  const sendData = {
                    // id of article to delete
                    id: articleDetail.id,
                    // faculty id of the user
                    faculty_id: data?.faculty_id || JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.faculty_id,
                  }
                  dispatch(deleteArticle(sendData));
                  // back to the table of articles page
                  navigate(-1);
                }}
              >
                DELETE
              </button>
            ) : null
            }
            <button type="submit" className="btn btn-success ml-2" disabled={articleDetail.status === "accepted" || articleDetail.status === "rejected" || currentDate.getTime() - createDate.getTime() > 7 * 24 * 60 * 60 * 1000}>SAVE</button>
            <button onClick={() => {
              navigate(-1);
            }} className="btn btn-danger ml-2">CANCLE</button>
          </div>
        </form>
      </div >
    </div >
  );
}
