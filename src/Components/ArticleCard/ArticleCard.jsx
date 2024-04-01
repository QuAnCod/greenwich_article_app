import { Popconfirm } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { downloadFile } from '../../Redux/reducers/articleReducer';
import { API } from '../../Utils/constanst/localConstanst';

export default function ArticleCard(props) {

    const dispatch = useDispatch();

    const { article, index, articleList } = props;

    return (
        <div className={index < articleList.length - 1 ? "my-2" : "mt-2"}>
            <div
                style={{
                    backgroundColor: "#fff",
                }}
            >
                <div className="p-10">
                    <div className="article-header flex justify-between">
                        <div className="avatar-zone flex justify-between items-stretch">
                            <img
                                src="https://i.pravatar.cc/300"
                                alt=""
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="ml-3">
                                <h5 className="m-0 font-bold">{article.user_name}</h5>
                                <p className="m-0">
                                    {article.created_at.split("T").join(" ")}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Popconfirm
                                title="Want to download this file?"
                                onConfirm={() => {
                                    dispatch(downloadFile(article.fileName));
                                }}
                                okText="Yes"
                                cancelText="No"
                                okType="text"
                                cancelButtonProps={{
                                    type: "text",
                                }}
                            >
                                <button className="btn btn-warning">
                                    <i className="fa fa-download" aria-hidden="true" />{" "}
                                    Download
                                </button>
                            </Popconfirm>
                        </div>
                    </div>
                    <div className="article-body mt-5">
                        <h3 className="font-bold">{article.name}</h3>
                        <p className="mt-2">{article.description}</p>
                        <p className="mt-2 text-warning">
                            {
                                // split file name and get all the element from 4th element to the end
                                // remove the ***-***-***-***-****_ part from the file name
                                article.fileName
                                    ?.split("-")
                                    .slice(4)
                                    .join("-")
                                    .split("_")
                                    .slice(1)
                                    .join("_")
                            }
                        </p>
                    </div>
                    <div className="article-img mt-5 grid grid-cols-3 gap-3">
                        {article.product_images?.map((image, index) => {
                            return (
                                <div key={index} className="col-span-1">
                                    {/* // use the API.GET_ARTICLE_IMAGE to get the image
                        // use the image.imageUrl to get the image name
                        // if the image is not available, use the placeholder image */}
                                    <img
                                        src={`${API.GET_ARTICLE_IMAGE}/${image?.imageUrl}`}
                                        className="w-full h-full mx-auto"
                                        alt=""
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                {
                    article.article_comment.map((comment, index) => {
                        return (
                            <div key={index} className="article-comment p-10 mt-5 border-t-2 border-black">
                                <div className="comment-header flex justify-start">
                                    <img
                                        src="https://i.pravatar.cc/300"
                                        alt=""
                                        className="w-12 h-12 rounded-full mr-2"
                                    />
                                    <div className="comment-content">
                                        <h5 className="font-bold">
                                            {comment.user.username} <span>{comment.createdAt}</span>
                                        </h5>
                                        <p>
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
