import { API } from "../../Utils/constanst/localConstanst";
import { getAllClosures } from "../reducers/closuresReducer";
import { BaseService } from "./BaseService";

class ClosuresService extends BaseService {
    getAllClosures = () => {
        return this.get(`${API.GET_ALL_CLOSURES}`);
    }

    getClosuresByAcademicYear = (academicYearId) => {
        return this.get(`${API.GET_CLOSURES_BY_ACADEMIC_YEAR}/${academicYearId}`);
    }
}

export const closuresService = new ClosuresService();