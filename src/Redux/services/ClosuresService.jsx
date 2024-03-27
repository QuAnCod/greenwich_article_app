import { API } from "../../Utils/constanst/localConstanst";
import { getAllClosures } from "../reducers/closuresReducer";
import { BaseService } from "./BaseService";

class ClosuresService extends BaseService {
    getAllClosures = () => {
        return this.get(`${API.GET_ALL_CLOSURES}`);
    }
}

export const closuresService = new ClosuresService();