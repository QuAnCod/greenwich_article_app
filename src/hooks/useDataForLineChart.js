// Get Data and Labels for Line Chart

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAcademicYears } from "../Redux/reducers/academicYearsReducer";
// import { getUserListAction } from "../Redux/reducers/userReducer";
import { getAllArticles } from "../Redux/reducers/articleReducer";

const mapAcademicYearsToLabels = (academicYears) => {
  return academicYears.map((academicYear) => academicYear.year);
};

const mapAllArticlesToData = (academicYears, articles) => {
  return academicYears.map((academicYear) => {
    const articlesInYear = articles.filter(
      (article) => article.academic_year_id === academicYear.id
    );
    return articlesInYear.length;
  });
};

export default function useDataForLineChart() {
  const dispatch = useDispatch();

  const { academicYears } = useSelector((state) => state.academicYearsReducer);
  const { allArticles } = useSelector((state) => state.articleReducer);

  useEffect(() => {
    dispatch(getAllAcademicYears());
    // dispatch(getUserListAction());
    dispatch(getAllArticles());
  }, []);

  const labels = mapAcademicYearsToLabels(academicYears);
  const data = mapAllArticlesToData(academicYears, allArticles);

  return { labels, data };
}
