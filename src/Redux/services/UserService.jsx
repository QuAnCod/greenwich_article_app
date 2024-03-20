import { API } from "../../Utils/constanst/localConstanst";
import { BaseService } from "./BaseService";

class UserService extends BaseService {
    login = (data) => {
        return this.post(`${API.LOGIN}`, data);
    }

    register = (data) => {
        return this.post(`${API.REGISTER}`, data);
    }

    getUser = () => {
        return this.get(`${API.GET_USER}`);
    }
}

export const userService = new UserService();