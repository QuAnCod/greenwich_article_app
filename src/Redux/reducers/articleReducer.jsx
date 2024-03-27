import { createSlice } from "@reduxjs/toolkit";
import { articleService } from "../services/ArticleService";
import { STATUS_CODE } from "../../Utils/constanst/localConstanst";

const initialState = {};

const articleReducer = createSlice({
  name: "articleReducer",
  initialState,
  reducers: {},
});

export const {} = articleReducer.actions;

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
      console.log(pictures);
      // define form data to send file and pictures
      const formDataFile = new FormData();
      formDataFile.append("file", file);
      const formDataPictures = new FormData();
      formDataPictures.append("files", pictures);

      // call api to send email to request accept article from marketing cordinator
      //   const resSendMail = await
      const resPostArticle = await articleService.postArticle(newArticle);

      //   console.log(resPostArticle);
      if (
        resPostArticle.status === STATUS_CODE.CREATED ||
        resPostArticle.status === STATUS_CODE.SUCCESS
      ) {
        // console.log("Write article success", resPostArticle.data);
        const resPostFile = await articleService.postFile(
          resPostArticle.data?.id,
          formDataFile
        );
        if (
          resPostFile.status === STATUS_CODE.SUCCESS ||
          resPostFile.status === STATUS_CODE.CREATED
        ) {
          //   console.log("Write article with file success", resPostFile.data);
          const resPostImage = await articleService.postImage(
            resPostArticle.data?.id,
            formDataPictures
          );
          if (
            resPostImage.status === STATUS_CODE.SUCCESS ||
            resPostImage.status === STATUS_CODE.CREATED
          ) {
            // console.log("Write article with file and picture success", resPostImage.data);
            alert("Write article success");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
