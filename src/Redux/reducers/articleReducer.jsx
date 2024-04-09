import { createSlice } from "@reduxjs/toolkit";
import { articleService } from "../services/ArticleService";
import { LOCAL_STORAGE, STATUS_CODE } from "../../Utils/constanst/localConstanst";
import { setModalOpen } from "./modalReducer";

const initialState = {
  articleList: [],
  articleDetail: {},
  loading: false,
  error: null,
  pagination: {
    page: 0,
    limit: 10,
    totalPages: 1,
  },
  articleListByFaculty: [],
  articleListByUserId: [],
  articleListBySearch: [],
  editArticle: {
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
  },
  allArticles: [],
};

const articleReducer = createSlice({
  name: "articleReducer",
  initialState,
  reducers: {
    setArticleList: (state, action) => {
      state.articleList = action.payload;
    },
    setArticleDetail: (state, action) => {
      state.articleDetail = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.pagination.totalPages = action.payload;
    },
    setArticleListByFaculty: (state, action) => {
      state.articleListByFaculty = action.payload;
    },
    setArticleByUserId: (state, action) => {
      state.articleListByUserId = action.payload;
    },
    setEditArticle: (state, action) => {
      console.log(action.payload);
      state.editArticle = action.payload;
    },
    setAllArticles: (state, action) => {
      state.allArticles = action.payload;
    },
  },
});

export const {
  setArticleList,
  setArticleDetail,
  setLoading,
  setError,
  setPagination,
  setCurrentPage,
  setTotalPages,
  setArticleListByFaculty,
  setArticleByUserId,
  setEditArticle,
  setAllArticles,
} = articleReducer.actions;

export default articleReducer.reducer;

// ------------- API CALLS -------------

export const postArticle = (data) => {
  return async (dispatch) => {
    try {
      //   console.log(data);
      // write code to get the newArticle data from the data you passed in
      // write code to get the file data from the data you passed in
      // write code to get the pictures data from the data you passed in
      //   console.log(JSON.parse(data.get("newArticle")));
      const newArticle = JSON.parse(data.get("newArticle"));
      const file = data.get("file");
      const pictures = data.getAll("pictures");
      // console.log(pictures[0]);
      // define form data to send file and pictures
      const formDataFile = new FormData();
      formDataFile.append("file", file);
      const formDataPictures = new FormData();
      for (let index = 0; index < pictures.length; index++) {
        formDataPictures.append("files", pictures[index]);
      }

      // call api to send email to request accept article from marketing cordinator
      // get the faculty id from the newArticle data
      const faculty_id = newArticle.faculty_id;
      const resSendMail = await articleService.sendNotification({
        faculty_id,
        url: "http://localhost:3000/accept-article",
      });
      if (resSendMail.status === STATUS_CODE.SUCCESS) {
        const resPostArticle = await articleService.postArticle(newArticle);

        //   console.log(resPostArticle);
        if (
          resPostArticle.status === STATUS_CODE.CREATED ||
          resPostArticle.status === STATUS_CODE.SUCCESS
        ) {
          // console.log("Write article success", resPostArticle.data);
          // call api to upload file
          const resPostFile = dispatch(
            postFile({ article_id: resPostArticle.data?.id, file })
          );
          const resPostImage = dispatch(
            postImage({ article_id: resPostArticle.data?.id, pictures })
          );
          const res = await Promise.all([resPostFile, resPostImage]);
          if (
            res[0].status === STATUS_CODE.SUCCESS &&
            res[1].status === STATUS_CODE.SUCCESS
          ) {
            alert("Upload article success");
          }
        }
      }
      dispatch(setModalOpen(false));
    } catch (error) {
      console.log(error);
    }
  };
};

export const postImage = (data) => {
  const { article_id, pictures } = data;
  // console.log(pictures);
  return async (dispatch) => {
    try {
      const formDataPictures = new FormData();
      for (let index = 0; index < pictures.length; index++) {
        formDataPictures.append("files", pictures[index]);
      }
      const res = await articleService.postImage(article_id, formDataPictures);
      if (res.status === STATUS_CODE.SUCCESS) {
        // alert("Upload image success");
        // console.log(res.data);
        return {
          status: STATUS_CODE.SUCCESS,
          data: res.data,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteImage = (data) => {
  return async (dispatch) => {
    try {
      const res = await articleService.deleteImage(data);
      if (res.status === STATUS_CODE.SUCCESS) {
        return {
          status: STATUS_CODE.SUCCESS,
          data: res.data,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const postFile = (data) => {
  const { article_id, file } = data;
  const formDataFile = new FormData();
  formDataFile.append("file", file);
  return async (dispatch) => {
    try {
      const res = await articleService.postFile(article_id, formDataFile);
      if (res.status === STATUS_CODE.SUCCESS) {
        // alert("Upload file success");
        return {
          status: STATUS_CODE.SUCCESS,
          data: res.data,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getArticles = (data) => {
  return async (dispatch) => {
    try {
      const res = await articleService.getArticles(data);
      console.log(res.data);
      if (res.status === STATUS_CODE.SUCCESS) {
        dispatch(setArticleList(res.data.articles));
        dispatch(setTotalPages(res.data.totalPages));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const downloadFile = (fileName) => {
  return async (dispatch) => {
    try {
      const res = await articleService.downloadFile(fileName);
      console.log(res);
      if (res.status === STATUS_CODE.SUCCESS) {
        // console.log(res.data);

        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();

        // remove the previous url
        window.URL.revokeObjectURL(url);
        link.remove();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getArticlesByUserId = (data) => {
  return async (dispatch) => {
    try {
      const res = await articleService.getArticlesByUserId(data);
      if (res.status === STATUS_CODE.SUCCESS) {
        dispatch(setArticleByUserId(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getArticlesByFacultyId = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await articleService.getArticlesByFacultyId(data);
      if (res.status === STATUS_CODE.SUCCESS) {
        dispatch(setArticleListByFaculty(res.data.articles));
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getArticlesByFacultyIdAndAcademicYearId = (data) => {
  return async (dispatch) => {
    try {
      const res = await articleService.getArticlesByFacultyIdAndAcademicYearId(
        data
      );
      if (res.status === STATUS_CODE.SUCCESS) {
        // console.log(res.data.articles);
        // console.log(res.data.articles);
        dispatch(setArticleList(res.data.articles));
        dispatch(setTotalPages(res.data.totalPages));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const downloadZipFolder = () => {
  return async (dispatch) => {
    try {
      const res = await articleService.downloadZipFolder();
      if (res.status === STATUS_CODE.SUCCESS) {
        const url = window.URL.createObjectURL(
          new Blob([res.data], { type: "application/octet-stream" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "all_files.zip");
        document.body.appendChild(link);
        link.click();
        // remove the previous url
        window.URL.revokeObjectURL(url);
        link.remove();
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateArticle = (data) => {
  return async (dispatch) => {
    try {
      const res = await articleService.updateArticle(data);
      if (res.status === STATUS_CODE.SUCCESS) {
        alert("Update article success");
        dispatch(setModalOpen(false));
        // reset the edit article, picture and file
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
        dispatch(getArticlesByUserId(data.user_id));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllArticles = () => {
  return async (dispatch) => {
    try {
      const res = await articleService.getAllArticles();
      if (res.status === STATUS_CODE.SUCCESS) {
        dispatch(setAllArticles(res.data.articles));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteArticle = (data) => {
  return async (dispatch) => {
    try {
      const res = await articleService.deleteArticle(data.id);
      if (res.status === STATUS_CODE.SUCCESS) {
        alert("Delete article success");
        dispatch(getArticlesByFacultyId(data.faculty_id));
      }
    } catch (error) {
      console.log(error);
    }
  }
}
