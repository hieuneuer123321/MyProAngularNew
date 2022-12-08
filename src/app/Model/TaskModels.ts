import * as moment from "moment";
import { CategoryInTaskResponse } from "./TaskCategory";
import { TaskHistoryResponseModel } from "./TasksHistoryModels";
import { UserResponseModel } from "./UserModels";
import { GeneralService as generalService } from "../services/general.service";

export class TaskDetailModel {
    mscv: string;
    chude: string;
    noidung: string;
    ngayBatDau: string;
    ngayKetThuc: string;
    fileDinhKem: string;
    nguoiTao: UserResponseModel
    nguoiChinh: UserResponseModel
    nhomCongViec: CategoryInTaskResponse;
    duAn: string;
    khachHang: string;
    danhSachNguoiChuaXuLy: Array<UserResponseModel>
    danhSachNguoiDangXuLy: Array<UserResponseModel>
    danhSachNguoiDaXuLy: Array<UserResponseModel>
    danhSachNguoiDuocXem: Array<UserResponseModel>
    danhSachNguoiXuLy: Array<UserResponseModel>
    nhatKyCongViec: Array<TaskHistoryResponseModel>
}
export class createNewTask {
    chude: string = "CHU DE"
    msda: string = null
    noidung: string = "NOI DUNG"
    ngayBatDau: string = moment().format("YYYY-MM-DD")
    ngayHoanThanhDuKien: string = moment().format("YYYY-MM-DD")
    nguoiXuLyChinh: string = ""
    laCongViecKhan: false
    nguoiTao: string = ''
    participants: Array<{ nguoiXuLy: string }> = []
    viewers: Array<{ nguoiDuocXem: string }> = []
}
export class TaskListResponseModel {
    Chude: string;
    Mscv: string;
    NgayBatDau: string;
    NgayKetThucDuKien: string;
    NgayKetThucThucTe: string;
    NguoiTaoUserId: string;
    TinhTrang: string;
    NguoiXuLyChinhUserId: string;
    NguoiTaoHoTen: string = '';
    NguoiXuLyChinhHoTen: string;
}