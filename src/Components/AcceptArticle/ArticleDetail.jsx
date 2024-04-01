import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../Utils/constanst/localConstanst";
import { useNavigate } from "react-router";
import { postComment } from "../../Redux/reducers/commentReducer";

export default function ArticleDetail(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { articleDetail } = useSelector((state) => state.articleReducer);

  const { closures } = useSelector((state) => state.articleReducer);

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const [comment, setComment] = useState(articleDetail.article_comment[0]?.content);
  const [status, setStatus] = useState(articleDetail.status);

  const currentDate = new Date();
  const createDate = new Date(articleDetail.created_at);

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
              <textarea
                className="form-control"
                name="comment"
                id="comment"
                rows="3"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                value={comment}
                disabled={status === "accepted" || status === "rejected"}
              ></textarea>
            </div>
            {(() => {
              if (currentDate.getTime() - createDate.getTime() > 7 * 24 * 60 * 60 * 1000) {
                return (
                  <div>The deadline to accept has passed </div>
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
                      disabled={status === "accepted" || status === "rejected"}
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
            <button type="submit" className="btn btn-success">SAVE</button>
            <button onClick={() => {
              navigate(-1);
            }} className="btn btn-danger ml-2">CANCLE</button>
          </div>
        </form>
      </div>
    </div>
  );
}
