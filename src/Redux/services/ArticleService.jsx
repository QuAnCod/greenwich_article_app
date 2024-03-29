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

  getArticlesByUserId = (data) => {
    const { page, limit, userId } = data;
    return this.get(
      `${API.GET_ARTICLE}?page=${page}&limit=${limit}&uer_id=${userId}`
    );
  }

  getArticlesByFacultyId = (data) => {
    const { page, limit, facultyId } = data;
    return this.get(
      `${API.GET_ARTICLE}?page=${page}&limit=${limit}&faculty_id=${facultyId}`
    );
  }

  downloadFile = (fileName) => {
    // axios.get(`/your-endpoint/${fileName}`, { responseType: 'blob' });
    return axios.get(`${API.DOWNLOAD_FILE}/${fileName}`, {
      responseType: "blob",
    });
  };
}

export const articleService = new ArticleService();
