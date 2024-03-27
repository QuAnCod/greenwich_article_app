import { API } from "../../Utils/constanst/localConstanst";
import { BaseService } from "./BaseService";

class AcademicYearsService extends BaseService {
    getAllAcademicYears = () => {
        return this.get(`${API.GET_ALL_ACADEMIC_YEARS}`);
    }

    createNewAcademicYear = (data) => {
        return this.post(`${API.CREATE_NEW_ACADEMIC_YEAR}`, data);
    }

    updateAcademicYear = (data) => {
        return this.put(`${API.CREATE_NEW_ACADEMIC_YEAR}/${data.id}`, data);
    }

    deleteAcademicYear = (id) => {
        return this.delete(`${API.CREATE_NEW_ACADEMIC_YEAR}/${id}`);
    }
}

export const academicYearsService = new AcademicYearsService();