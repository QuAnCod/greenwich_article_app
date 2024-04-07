// Get Data and Labels for Pie Chart displaying number of articles by Status

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../Redux/reducers/articleReducer";

const mapAllArticlesToData = (statusList, articles) => {
  return statusList.map((status) => {
    const articlesInStatus = articles.filter(
      (article) => article.status === status
    );
    return articlesInStatus.length;
  });
};

export default function useArticlesByStatus() {
  const dispatch = useDispatch();

  const statusList = ["pending", "accepted", "rejected", "published"];
  const { allArticles } = useSelector((state) => state.articleReducer);

  useEffect(() => {
    dispatch(getAllArticles());
  }, []);

  const labels = statusList;
  const data = mapAllArticlesToData(statusList, allArticles);

  return { labels, data };
}
