import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LOCAL_STORAGE, ROLE } from "../../Utils/constanst/localConstanst";
import { Table } from "antd";
import {
  downloadZipFolder,
  getArticlesByFacultyId,
} from "../../Redux/reducers/articleReducer";
import { logOut } from "../../Redux/reducers/userReducer";
import LineChart from "../../Components/LineChart/LineChart";
import PieChart from "../../Components/PieChart/PieChart";
import useDataForLineChart from "../../hooks/useDataForLineChart";
import useArticlesByStatus from "../../hooks/useArticlesByStatus";
import useArticlesByFaculty from "../../hooks/useArticlesByFaculty";
import MostValueStudents from "../../Components/MostValueUsers/MostValueStudents";

const columns = [
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) => <span>{new Date(text).toDateString()}</span>,
  },
  {
    title: "Title",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Author",
    dataIndex: "user_name",
    key: "user_name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
];

// Line chart need labels (x-axis): 2023, 2024, 2025, ...
//  and data (y-axis): array of number of student and array number of articles.
// Pie chart 1 need labels (faculty name) and data (number of articles by faculty)
// Pie chart 2 need labels (status name) and data (number of articles by status)
// Find 5 users with the most articles

export default function MarketingManager(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const { articleListByFaculty, loading } = useSelector(
    (state) => state.articleReducer
  );

  const [facultyId, setFacultyId] = React.useState(0);

  const dataForLineChart = useDataForLineChart();
  const articlesByStatus = useArticlesByStatus();
  const articlesByFaculty = useArticlesByFaculty();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      if (
        data?.role?.id !== ROLE.MARKETING_MANAGER &&
        JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.role_id !==
        ROLE.MARKETING_MANAGER
      ) {
        alert("You dont have permission to access this page");
        navigate("/login");
      }
      if (
        data?.userActive === false &&
        JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.userActive ===
        false
      ) {
        alert("You has to change password first");
        navigate("/change-password");
      }
      if (
        data?.active === false &&
        JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.active === false
      ) {
        alert("YOU HAVE BEEN BAN BY ADMIN! CONTACT YOUR ADMIN TO UNBAN!");
        dispatch(logOut());
        navigate("/login");
      }
    }
    dispatch(getArticlesByFacultyId(facultyId));
  }, []);

  return (
    <div>
      <div className="bg-[#FF751F] p-10 px-20">
        <div className="flex justify-start items-center">
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginRight: "20px",
            }}
            src={require("../../assets/img/ava_icon.jpg")}
            alt=""
          />
          <div className="text-start">
            <h6 className="text-white text-2xl font-bold">
              {
                data?.username ? data?.username :
                  JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.username
              }
            </h6>
            <h6 className="text-white text-lg">
              <span>Role: </span>
              <span>
                {
                  data?.role ? data?.role.name : "MARKETING_MANAGER"
                }
              </span>
            </h6>
          </div>
          <div className="ml-auto">
            <button
              className="btn btn-danger"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#235895] h-[50px] flex items-center">
        <div className="w-full">
          <form className="flex justify-around">
            <select
              className="w-1/4 rounded-xl"
              aria-label="Default select example"
              onChange={(e) => {
                setFacultyId(e.target.value);
                dispatch(getArticlesByFacultyId(e.target.value));
              }}
            >
              <option selected value={0}>
                Choose Faculty
              </option>
              <option value={1}>Computing</option>
              <option value={2}>Business</option>
              <option value={3}>Design</option>
            </select>
            <button
              className="btn btn-warning"
              type="button"
              onClick={() => {
                // download all article zip
                dispatch(downloadZipFolder());
              }}
            >
              <i className="fa fa-download" aria-hidden="true"></i> Download all
              article ZIP
            </button>
          </form>
        </div>
      </div>
      <div className="p-10">
        <Table
          rowKey={(record) => record.id}
          loading={loading}
          columns={columns}
          dataSource={articleListByFaculty}
        />
      </div>
      <div className="container-fluid my-5">
        <div>
          <LineChart dataForLineChart={dataForLineChart} />
        </div>
      </div>
      <div className="container-fluid flex justify-around my-5">
        <div className="w-1/2">
          <div>
            <PieChart
              key="articlesByStatus"
              dataForPieChart={articlesByStatus}
              title={"Number of articles by status"}
            />
          </div>
        </div>
        <div className="w-1/2">
          <div>
            <PieChart
              key="articlesByFaculty"
              dataForPieChart={articlesByFaculty}
              title={"Number of articles by faculty"}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid my-5">
        <h3 className="text-center">Students with the most articles</h3>
        <MostValueStudents />
      </div>
    </div>
  );
}
