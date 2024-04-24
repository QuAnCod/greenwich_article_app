import { API } from "../../Utils/constanst/localConstanst";
import { BaseService } from "./BaseService";

class FacultiesService extends BaseService {
    getAllFaculties = () => {
        return this.get(`${API.GET_ALL_FACULTIES}`)
    }
}

export const facultiesService = new FacultiesService();