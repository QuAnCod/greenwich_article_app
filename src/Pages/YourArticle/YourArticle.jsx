import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignOutBtn from '../../Components/Buttons/SignOutBtn/SignOutBtn'
import { Table } from 'antd'
import { filterArticleByStatus } from '../../Utils/function/helperFunc'
import { getArticlesByUserId } from '../../Redux/reducers/articleReducer'
import ArticleCard from '../../Components/ArticleCard/ArticleCard'
import ArticleCardWithEdit from '../../Components/ArticleCard/ArticleCardWithEdit'
import EditArticleModal from '../../Components/EditArticle/EditArticleModal'
import { useNavigate } from 'react-router'
import { ROLE } from '../../Utils/constanst/localConstanst'

export default function YourArticle(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { data } = useSelector((state) => state.userReducer.userLogin)

    const { articleListByUserId } = useSelector((state) => state.articleReducer)

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
        if (data?.role?.id !== ROLE.STUDENT) {
            alert('You dont have permission to access this page')
            navigate('/')
        }
        //get article by user id
        dispatch(getArticlesByUserId(data?.id))
    }, [])

    const acceptedArticles = filterArticleByStatus(articleListByUserId, 'accepted')
    const pendingArticles = filterArticleByStatus(articleListByUserId, 'pending')
    const rejectedArticles = filterArticleByStatus(articleListByUserId, 'rejected')

    return (
        <div>
            <div className='bg-[#FF751F] p-10 px-20 flex justify-between'>
                <div className='flex justify-start items-center'>
                    <img style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }} src={require("../../assets/img/ava_icon.jpg")} alt='avatar' />
                    <div className='text-start'>
                        <h6 className="text-white text-2xl font-bold">{data?.username}</h6>
                        <h6 className="text-white text-lg">
                            <span>Role: </span>
                            <span className="uppercase">{data?.role.name}</span>
                        </h6>
                        <h6 className="text-white text-lg">
                            <span>Faculty: </span>
                            <span className="uppercase">{data?.faculty.name}</span>
                        </h6>
                    </div>
                </div>
                <div className='flex justify-end items-center'>
                    <SignOutBtn />
                </div>
            </div>
            <div className=''>
                <div className="bg-[#235895]">
                    <ul className="nav nav-tabs h-[50px]" id="myTab" role="tablist">
                        <li
                            style={{
                                width: "33.333333%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                            className="nav-item"
                            role="presentation"
                        >
                            <button
                                className="nav-link w-full active"
                                id="accepted-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#accepted"
                                type="button"
                                role="tab"
                                aria-controls="accepted"
                                aria-selected="true"
                            >
                                Accepted
                            </button>
                        </li>
                        <li
                            style={{
                                width: "33.333333%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                            className="nav-item"
                            role="presentation"
                        >
                            <button
                                className="nav-link w-full"
                                id="pending-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#pending"
                                type="button"
                                role="tab"
                                aria-controls="pending"
                                aria-selected="false"
                            >
                                Pending
                            </button>
                        </li>
                        <li
                            style={{
                                width: "33.333333%",
                                display: "flex",
                                justifyContent: "center",
                            }}
                            className="nav-item"
                            role="presentation"
                        >
                            <button
                                className="nav-link w-full"
                                id="rejected-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#rejected"
                                type="button"
                                role="tab"
                                aria-controls="rejected"
                                aria-selected="false"
                            >
                                Rejected
                            </button>
                        </li>
                    </ul>
                </div>
                {/* Tab panes */}
                <div className="tab-content">
                    <div className='container-fluid text-end'>
                        <button onClick={(e) => {
                            e.preventDefault()
                            navigate(-1)
                        }} className='font-medium btn btn-link'><i className="fas fa-backward" /> Back
                        </button>
                    </div>
                    <div
                        className="tab-pane active"
                        id="accepted"
                        role="tabpanel"
                        aria-labelledby="accepted-tab"
                    >

                        {acceptedArticles?.map((article, index) => {
                            return (
                                <div key={index} className='w-1/2 mx-auto'>
                                    <ArticleCard key={article.id} article={article} index={index} articleList={acceptedArticles} />
                                </div>
                            )
                        })}

                    </div>
                    <div
                        className="tab-pane"
                        id="pending"
                        role="tabpanel"
                        aria-labelledby="pending-tab"
                    >
                        {pendingArticles?.map((article, index) => {
                            return (
                                <div key={index} className='w-1/2 mx-auto'>
                                    <ArticleCardWithEdit key={article.id} article={article} index={index} articleList={pendingArticles} />
                                </div>
                            )
                        })}
                    </div>
                    <div
                        className="tab-pane"
                        id="rejected"
                        role="tabpanel"
                        aria-labelledby="rejected-tab"
                    >
                        {rejectedArticles?.map((article, index) => {
                            return (
                                <div key={index} className='w-1/2 mx-auto'>
                                    <ArticleCard key={article.id} article={article} index={index} articleList={rejectedArticles} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <EditArticleModal />
        </div>
    )
}
