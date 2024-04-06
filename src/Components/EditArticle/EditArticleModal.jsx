import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../Redux/reducers/modalReducer";
import { Image, Popconfirm, Skeleton, Tooltip, Upload } from "antd";
import {
  deleteImage,
  getArticlesByUserId,
  postFile,
  postImage,
  setEditArticle,
  setLoading,
  updateArticle,
} from "../../Redux/reducers/articleReducer";
import { API, STATUS_CODE } from "../../Utils/constanst/localConstanst";
import { PlusOutlined } from "@ant-design/icons";
import { articleService } from "../../Redux/services/ArticleService";
import { set } from "lodash";
import { findFinalDeadline } from "../../Utils/function/helperFunc";

const checkDateValidToSubmit = (closures, currentDate, faculty_id) => {
  const finalDeadline = findFinalDeadline(closures, faculty_id);
  if (
    finalDeadline === null ||
    finalDeadline === undefined ||
    finalDeadline == "Invalid Date"
  ) {
    return false;
  }
  if (currentDate > finalDeadline) {
    return false;
  }
  return true;
};

export default function EditArticleModal(props) {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const { modalOpen } = useSelector((state) => state.modalReducer);

  const { closures } = useSelector((state) => state.closuresReducer);

  const currentDate = new Date();

  const { editArticle, loading } = useSelector((state) => state.articleReducer);

  //file upload
  // const [file, setFile] = useState(null);

  //picture upload
  const [pictures, setPictures] = useState([]);

  //preview image state
  const [previewImage, setPreviewImage] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // state to control render input or text
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // dispatch()
    // get picture from backend
    // console.log(editArticle.product_images)
    editArticle.product_images.map((item, index) =>
      setPictures((prev) => [
        ...prev,
        {
          uid: item.id,
          name: item.imageUrl,
          status: "done",
          url: `${API.GET_ARTICLE_IMAGE}/${item.imageUrl}`,
        },
      ])
    );
  }, [editArticle.product_images, editArticle.fileName]);

  const handleOnSubmitArticle = (e) => {
    e.preventDefault();
    // check if the article is valid to submit
    if (!checkDateValidToSubmit(closures, currentDate, data.faculty.id)) {
      alert("You can't submit article after the deadline");
      return;
    }
    // call api to update article
    dispatch(updateArticle(editArticle));
  };

  const handleChangeArticle = (e) => {
    dispatch(
      setEditArticle({
        ...editArticle,
        [e.target.name]: e.target.value,
      })
    );
  };

  // function to handle preview image
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return modalOpen ? (
    <div className="modalLayout">
      <div
        className="bg-[#FF751F] p-10 px-20 modalContainer"
        style={{
          marginTop: "0.5%",
        }}
      >
        <div className="flex justify-between items-center">
          <h5 className="modalTitle">Edit Article</h5>
          <button
            className="text-white"
            onClick={() => {
              setPictures([]);
              dispatch(
                setEditArticle({
                  id: null,
                  name: "",
                  description: "",
                  status: "pending",
                  view: 0,
                  academic_id: 1,
                  user_id: null,
                  faculty_id: null,
                  fileName: "",
                  articleImage: [],
                  product_images: [],
                })
              );
              dispatch(setModalOpen(false));
            }}
          >
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
        <div>
          <form onSubmit={handleOnSubmitArticle}>
            <div className="form-group mb-3 flex">
              {/* When user click in text it become input, and when user click Done it become text */}
              {isEdit ? (
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editArticle.name}
                  onChange={handleChangeArticle}
                />
              ) : (
                <h2
                  onClick={() => setIsEdit(true)}
                  className="text-3xl font-bold text-center text-white"
                >
                  {editArticle.name}
                </h2>
              )}
            </div>
            <div className="form-group mb-3">
              {isEdit ? (
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  value={editArticle.description}
                  onChange={handleChangeArticle}
                />
              ) : (
                <p onClick={() => setIsEdit(true)} className="text-white">
                  {editArticle.description}
                </p>
              )}
            </div>
            <div className="form-group mb-3">
              {isEdit ? (
                <button
                  onClick={() => setIsEdit(false)}
                  className="btn btn-success"
                >
                  Done
                </button>
              ) : null}
            </div>
            <div className="form-group mb-3">
              <div className="article-image">
                <Upload
                  multiple
                  listType="picture-card"
                  fileList={pictures}
                  onPreview={handlePreview}
                  customRequest={async ({ file, onSuccess }) => {
                    // console.log(file)

                    // call api to upload image
                    const res = await Promise.resolve(
                      dispatch(
                        postImage({
                          article_id: editArticle.id,
                          pictures: [file],
                        })
                      )
                    );
                    if (res.status === STATUS_CODE.SUCCESS) {
                      setPictures((prev) => [
                        ...prev,
                        {
                          uid: res.data[0].imageUrl,
                          name: res.data[0].imageUrl,
                          status: "done",
                          url: `${API.GET_ARTICLE_IMAGE}/${res.data[0].imageUrl}`,
                        },
                      ]);
                      // get all article by user id to update the article list
                      dispatch(getArticlesByUserId(data.id));
                      onSuccess("ok");
                    }
                  }}
                  accept="image/*"
                  onRemove={async (file) => {
                    console.log(file);
                    const res = await Promise.resolve(
                      dispatch(deleteImage(file.uid))
                    );
                    if (res.status === STATUS_CODE.SUCCESS) {
                      setPictures((prev) =>
                        prev.filter((item) => item.uid !== file.uid)
                      );
                      // get all article by user id to update the article list
                      dispatch(getArticlesByUserId(data.id));
                    }
                  }}
                >
                  {pictures.length >= 3 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
              <object
                data={`${API.READ_FILE}/${editArticle.fileName}`}
                width="100%"
                height="600px"
                type="application/pdf"
              >
                <embed
                  src={`${API.READ_FILE}/${editArticle.fileName}`}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
              </object>
              <div className="text-end">
                <button
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = ".doc,.docx"; // specify the file types you want to allow
                    input.onchange = async (event) => {
                      const file = event.target.files[0];
                      // call api to upload file and update the article
                      const res = await Promise.resolve(
                        dispatch(postFile({ article_id: editArticle.id, file }))
                      );
                      if (res.status === STATUS_CODE.SUCCESS) {
                        console.log(res);
                        if (res.status === STATUS_CODE.SUCCESS) {
                          // get all article by user id to update the article list
                          dispatch(getArticlesByUserId(data.id));
                          // reset the picture state
                          setPictures([]);
                          // reset the edit article and close the modal
                          dispatch(
                            setEditArticle({
                              id: null,
                              name: "",
                              description: "",
                              status: "pending",
                              view: 0,
                              academic_id: 1,
                              user_id: null,
                              faculty_id: null,
                              fileName: "",
                              articleImage: [],
                              product_images: [],
                            })
                          );
                        }
                      }
                    };
                    input.click();
                  }}
                  className="btn btn-link"
                >
                  Change File
                </button>
              </div>
            </div>
            <div className="form-group mb-3 text-end">
              <Popconfirm
                title="Are you sure to resubmit this article?"
                onConfirm={handleOnSubmitArticle}
                okText="Yes"
                cancelText="No"
              >
                <button type="submit" className="btn btn-warning">
                  Resubmit Article
                </button>
              </Popconfirm>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
