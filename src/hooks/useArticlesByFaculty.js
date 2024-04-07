// Get Data and Labels for Pie Chart displaying number of articles by Faculty

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../Redux/reducers/articleReducer";

const mapAllArticlesToData = (facultyList, articles) => {
  return facultyList.map((faculty) => {
    const articlesInFaculty = articles.filter(
      (article) => article.faculty_id === faculty.id
    );
    return articlesInFaculty.length;
  });
};

export default function useArticlesByFaculty() {
  const dispatch = useDispatch();

  const facultyList = [
    { id: 1, name: "Computer" },
    { id: 2, name: "Business" },
    { id: 3, name: "Design" },
  ];
  const { allArticles } = useSelector((state) => state.articleReducer);

  useEffect(() => {
    dispatch(getAllArticles());
  }, []);

  const labels = facultyList.map((faculty) => faculty.name);
  const data = mapAllArticlesToData(facultyList, allArticles);

  return { labels, data };
}
