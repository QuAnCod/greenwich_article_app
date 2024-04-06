import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ROLE } from "../../Utils/constanst/localConstanst";
import { Table } from "antd";
import {
  downloadZipFolder,
  getArticlesByFacultyId,
} from "../../Redux/reducers/articleReducer";
import { logOut } from "../../Redux/reducers/userReducer";
import LineChart from "../../Components/LineChart/LineChart";
import PieChart from "../../Components/PieChart/PieChart";

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

export default function MarketingManager(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => state.userReducer.userLogin);

  const { articleListByFaculty, loading } = useSelector(
    (state) => state.articleReducer
  );

  const [facultyId, setFacultyId] = React.useState(0);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (data?.role?.id !== ROLE.MARKETING_MANAGER) {
      alert("You dont have permission to access this page");
      navigate("/login");
    }
    if (data?.userActive === false) {
      alert("You has to change password first");
      navigate("/change-password");
    }
    if (data?.active === false) {
      alert("YOU HAVE BEEN BAN BY ADMIN! CONTACT YOUR ADMIN TO UNBAN!");
      dispatch(logOut());
      navigate("/login");
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
            <h6 className="text-white text-2xl font-bold">{data?.username}</h6>
            <h6 className="text-white text-lg">
              <span>Role: </span>
              <span>{data?.role.name}</span>
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
      <div className="container my-5">
        <h3 className="text-center">Dashboard</h3>
        <div>
          <LineChart />
        </div>
      </div>
      <div className="container flex justify-around my-5">
        <div className="w-1/2">
          <h3 className="text-center">Number of articles by status</h3>
          <div>
            <PieChart />
          </div>
        </div>
        <div className="w-1/2">
          <h3 className="text-center">Number of articles by faculty</h3>
          <div>
            <PieChart />
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
          loading={loading}
          columns={columns}
          dataSource={articleListByFaculty}
        />
      </div>
    </div>
  );
}
