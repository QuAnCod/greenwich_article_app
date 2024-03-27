import { data } from "jquery";
import { BaseService } from "./BaseService";
import { API } from "../../Utils/constanst/localConstanst";

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
  }
}

export const articleService = new ArticleService();
