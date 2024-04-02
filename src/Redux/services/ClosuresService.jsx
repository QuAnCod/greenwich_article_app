import { API } from "../../Utils/constanst/localConstanst";
import { getAllClosures } from "../reducers/closuresReducer";
import { BaseService } from "./BaseService";

class ClosuresService extends BaseService {
  postClosure = (data) => {
    return this.post(`${API.POST_CLOSURE}`, data);
  };

  getAllClosures = () => {
    return this.get(`${API.GET_ALL_CLOSURES}`);
  };

  getClosuresByAcademicYear = (academicYearId) => {
    return this.get(`${API.GET_CLOSURES_BY_ACADEMIC_YEAR}/${academicYearId}`);
  };

  deleteClosure = (closureId) => {
    return this.delete(`${API.DELETE_CLOSURE}/${closureId}`);
  };

  updateClosure = (data) => {
    return this.put(`${API.UPDATE_CLOSURE}/${data.id}`, data);
  };
}

export const closuresService = new ClosuresService();
