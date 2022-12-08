export class TaskSampleResponseModel {
    mscv: string
    tenCV: string
    lapLai: string
}
export class TaskSampleDetailResponseModel {
    mscv: string
    chuDe: string
    noiDung: string
    duAn: string
    nguoiChinh: string
    lapLai: number = 0
    dsNguoiXuLy: Array<{
        uid: string
        hoten: string
    }> = []
    dsNguoiXem: Array<{
        uid: string
        hoten: string
    }> = []
}