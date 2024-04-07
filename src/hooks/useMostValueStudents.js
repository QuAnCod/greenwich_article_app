import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../Redux/reducers/articleReducer";
import { getUserListAction } from "../Redux/reducers/userReducer";
import { ROLE } from "../Utils/constanst/localConstanst";

const findStudentHaveMostArticles = (allArticles, allUser) => {
  // find all students
  const students = allUser.filter((user) => user.role.id === ROLE.STUDENT);

  // find all articles of students
  const articlesOfStudents = allArticles.filter((article) =>
    students.find((student) => student.id === article.user_id)
  );

  // count number of articles and number of accepted articles of each student
  const countArticlesOfStudents = students.map((student) => {
    const numberOfArticles = articlesOfStudents.filter(
      (article) => article.user_id === student.id
    ).length;
    const numberOfAcceptedArticles = articlesOfStudents.filter(
      (article) =>
        article.user_id === student.id && article.status === "accepted"
    ).length;
    return { ...student, numberOfArticles, numberOfAcceptedArticles };
  });

  // sort students by number of articles
  countArticlesOfStudents.sort(
    (student1, student2) =>
      student2.numberOfArticles - student1.numberOfArticles
  );

  // get 5 students have most articles
  const mostValueStudents = countArticlesOfStudents.slice(0, 5);

  return mostValueStudents;
};

export default function useMostValueStudents(props) {
  const dispatch = useDispatch();

  const { allArticles } = useSelector((state) => state.articleReducer);

  const { userList } = useSelector((state) => state.userReducer);

  useEffect(() => {
    async function fetchData() {
      await Promise.resolve(dispatch(getAllArticles()));
      await Promise.resolve(dispatch(getUserListAction()));
    }
    fetchData();
  }, []);

  const mostValueStudents = findStudentHaveMostArticles(allArticles, userList);

  return mostValueStudents;
}
