import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles, setCurrentPage } from "../Redux/reducers/articleReducer";

const useInfiniteScroll = () => {
  const dispatch = useDispatch();
  const { articleList } = useSelector((state) => state.articleReducer);
  const [isLoading, setIsLoading] = useState(false);
  //   const [page, setPage] = useState(1);
  // using page limit totalPages from redux
  const { page, limit, totalPages } = useSelector(
    (state) => state.articleReducer.pagination
  );

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
      setIsLoading(true);
      dispatch(getArticles({ page: page + 1, limit }))
        .then(() => {
          setIsLoading(false);
          dispatch(setCurrentPage(page + 1));
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    console.log("page", page);
    console.log("totalPages", totalPages);
    if (page > totalPages - 1) {
      window.removeEventListener("scroll", handleScroll);
      dispatch(setCurrentPage(0));
      // call api to get articles again
      dispatch(getArticles({ page: 0, limit }));
      // scroll to top slowly
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [page]);

  return articleList;
};

export default useInfiniteScroll;
