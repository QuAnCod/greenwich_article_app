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
    const { page, limit, faculty_id } = data;
    return this.get(
      `${API.GET_ARTICLE}?page=${page}&limit=${limit}&faculty_id=${faculty_id}`
    );
  };

  getArticlesByFacultyIdAndAcademicYearId = (data) => {
    const { page, limit, faculty_id, academic_year_id } = data;
    return this.get(
      `${API.GET_ARTICLE}?page=${page}&limit=${limit}&faculty_id=${faculty_id}&academic_year_id=${academic_year_id}`
    );
  };

  downloadFile = (fileName) => {
    // axios.get(`/your-endpoint/${fileName}`, { responseType: 'blob' });
    return axios.get(`${API.DOWNLOAD_FILE}/${fileName}`, {
      responseType: "blob",
    });
  };
}

export const articleService = new ArticleService();
