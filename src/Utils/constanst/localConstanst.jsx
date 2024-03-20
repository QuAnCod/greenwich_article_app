export const DOMAIN = "http://localhost:1702/api/v1/";

export const API = {

    // --------------- AUTHENTICATION ---------------
    LOGIN: DOMAIN + "users/login",
    REGISTER: DOMAIN + "users/register",

    // --------------- USER ---------------
    GET_USER: DOMAIN + "users/all",
    // UPDATE_USER: DOMAIN + "user",
    // DELETE_USER: DOMAIN + "user",

    // // --------------- ARTICLE ---------------


    // // --------------- CATEGORY ---------------


    // // --------------- TAG ---------------


    // // --------------- COMMENT ---------------
    // GET_COMMENT: DOMAIN + "comment",
    // CREATE_COMMENT: DOMAIN + "comment",
    // UPDATE_COMMENT: DOMAIN + "comment",
    // GET_COMMENT_BY_ID: DOMAIN + "comment",
    // GET_COMMENT_BY_USER: DOMAIN + "comment",
    // GET_COMMENT_BY_ARTICLE: DOMAIN + "comment",
    // GET_COMMENT_BY_DATE: DOMAIN + "comment",

    // --------------- LIKE ---------------


    // --------------- FOLLOW ---------------


    // --------------- NOTIFICATION ---------------

}

export const LOCAL_STORAGE = {
    TOKEN: "token",
    USER: {
        ID: "userId",
        EMAIL: "email",
        AVATAR: "avatar",
        ROLE: 'role',
    },
}

export const ROLE = {
    ADMIN: 5,
    STUDENT: 2,
    MARKETING_CORDINATOR: 3,
    MARKETING_MANAGER: 4,
    GUEST: 1,
}

export const STATUS_CODE = {
    SUCCESS: 200,
    ERROR: 500,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
}