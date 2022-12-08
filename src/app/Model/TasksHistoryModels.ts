import * as moment from "moment"
import { TaskHistoryUserResponseModel, UserResponseModel } from "./UserModels"

export class TaskHistoryResponseModel{
    nhatKyId:string
    nguoiPhanHoi: TaskHistoryUserResponseModel
    noiDung:string
    thoiGianPhanHoi:string
    fileDinhKem:String 
    nguoiXuLyKeTiep:Array<UserResponseModel>
}
export class TaskHistoryRequestModel{
        mscv: string
        nguoiPhanHoi: string
        noiDung: string
        thoiGian: string = moment().toISOString()
        danhSachNguoiXuLyKeTiepHoTen: string
        fileDinhKem: string
}