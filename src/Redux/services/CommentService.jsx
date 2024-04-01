import { API } from "../../Utils/constanst/localConstanst";
import { BaseService } from "./BaseService";

class CommentService extends BaseService {
    postComment = (data) => {
        return this.post(`${API.POST_COMMENT}`, data);
    }
}

export const commentService = new CommentService();