import { data } from "jquery";
import { BaseService } from "./BaseService";
import { API } from "../../Utils/constanst/localConstanst";
import axios from "axios";

class ArticleService extends BaseService {
  postArticle = (data) => {
    return this.post(API.POST_ARTICLE, data);
  };

  postFile = (article_id, data) => {
    return this.post(`${API.POST_ARTICLE}/${article_id}/file`, data);
  };

  postImage = (article_id, data) => {
    return this.post(`${API.POST_ARTICLE}/uploads/${article_id}`, data);
  };

  deleteImage = (data) => {
    return this.delete(`${API.DELETE_IMAGE}/${data}`);
  };

  sendNotification = (data) => {
    return this.post(API.SEND_NOTIFICATION, data);
  };

  getArticles = (data) => {
    const { page, limit } = data;
    return this.get(`${API.GET_ARTICLE}?page=${page}&limit=${limit}`);
  };

  getArticlesByUserId = (userId) => {
    return this.get(`${API.GET_ARTICLE_BY_ID}/user/${userId}`);
  };

  getArticlesByFacultyId = (data) => {
    return this.get(`${API.NO_PAGING}?faculty_id=${data}`);
  };

  getArticlesByFacultyIdAndAcademicYearId = (data) => {
    const { faculty_id, academic_year_id } = data;
    return this.get(
      `${API.NO_PAGING}?faculty_id=${faculty_id}&academic_year_id=${academic_year_id}`
    );
  };

  getAllArticles = () => {
    return this.get(API.NO_PAGING);
  };

  downloadFile = (fileName) => {
    // axios.get(`/your-endpoint/${fileName}`, { responseType: 'blob' });
    return axios.get(`${API.DOWNLOAD_FILE}/${fileName}`, {
      responseType: "blob",
    });
  };

  changeArticleStatus = (data) => {
    return this.put(`${API.CHANGE_ARTICLE_STATUS}/${data.id}`, data);
  };

  downloadZipFolder = () => {
    return axios.get(`${API.DOWNLOAD_ZIP_FOLDER}`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  getPicture = (imgUrl) => {
    console.log("imgUrl", imgUrl);
    return axios.get(`${API.GET_ARTICLE_IMAGE}/${imgUrl}`, {
      responseType: "blob",
    });
  };

  updateArticle = (data) => {
    return this.put(`${API.UPDATE_ARTICLE}/${data.id}`, data);
  };
}

export const articleService = new ArticleService();
