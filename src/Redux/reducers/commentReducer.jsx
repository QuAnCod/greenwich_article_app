import { createSlice } from '@reduxjs/toolkit'
import { commentService } from '../services/CommentService';
import { articleService } from '../services/ArticleService';
import { STATUS_CODE } from '../../Utils/constanst/localConstanst';
import { getArticles } from './articleReducer';

const initialState = {

}

const commentReducer = createSlice({
    name: "commentReducer",
    initialState,
    reducers: {}
});

export const { } = commentReducer.actions

export default commentReducer.reducer

// ------------- CALL API -------------

export const postComment = (data) => {
    return async (dispatch) => {
        const postComment = {
            content: data.content,
            article_id: data.article_id,
            user_id: data.user_id,
        }
        const changeArticleStatus = {
            id: data.article_id,
            status: data.status,
            fileName: data.fileName
        }
        // console.log(postComment);
        // console.log(changeArticleStatus);
        try {
            const commentRes = await commentService.postComment(postComment);
            const changeStatusRes = await articleService.changeArticleStatus(changeArticleStatus);
            if (commentRes.status === STATUS_CODE.SUCCESS || changeStatusRes.status === STATUS_CODE.SUCCESS) {
                alert("Post comment successfully");
            }
            dispatch(getArticles({ page: 0, limit: 10 }));
        } catch (error) {
            console.log(error);
        }
    };
}