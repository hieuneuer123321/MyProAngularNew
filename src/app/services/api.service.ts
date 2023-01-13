import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GeneralService } from './general.service';
import { timeout, catchError } from 'rxjs/operators';
import { UserDetailComponent } from '../admin/user-detail/user-detail.component';

@Injectable({
  providedIn: 'root',
})
export class ApiservicesService {
  apiLists = {
    login: '/api/Users/token',
    getUserByID: '/api/Users/GetUserByUserId/',
    getAllUsers: '/api/Users/GetAllUsers',

    updateUserInfo: '/api/Users/UpdateUser',
    getTasks: '/api/Tasks/GetAllTasks/',

    File: '/api/File/',
    FilesUpload: '/api/File/Upload',

    getTaskDetail: '/api/Tasks/GetTaskDetail/',
    createNewTask: '/api/Tasks/CreateNewTask',
    getAllUserGroups: '/api/Groups/GetAllGroups',
    uploadFile: '/api/File/Upload?subDirectory',
    downloadFile: '/api/File/Download',

    getAllGroupsByUserld: '/api/Users/GetAllGroupsByUserId/', // nhóm theo userId
    deleteUser: '/api/Users/DeleteUser', // Xóa người dùng 'rồi '
    addNewUser: '/api/Users/AddNewUser/', // thêm người dùng 'rồi '
    removeOneSelectedGroupFromUser: '/api/Users/RemoveOneSelectedGroupFromUser', // xóa 1 nhóm khỏi người dùng /
    assignMultiRightsToUser: '/api/Users/AssignMultiRightsToUser', //gán nhiều quyền cho người dùng / r
    removeAllRightFromUser: '/api/Users/RemoveOneRightFromUser', //Xóa tất cả quyền khỏi người dùng / r
    assignMultiGroupsToUser: '/api/Users/AssignOneGroupToUser', // gán nhiều nhóm/phòng ban cho người dùng / 
    removeMultiSelectedGroupsFromUser: '/api/Users/RemoveMultiSelectedGroupsFromUser', //xóa nhiều nhóm được chỉ định cho khỏi người dùng /
    getUserByUserName: '/api/Users/GetUserByUserName/', // Lấy thông tin chi tiết người dùng theo Username 
    lockUserById: '/api/Users/LockUserById', // Khóa User
    getAllUsersByStatus: '/api/Users/GetAllUsersByStatus', // Trạng thái user
    resetUserPasswordById: '/api/Users/ResetUserPasswordById',//reset mật khẩu



    GetAllTasksCategoryByUserId: '/api/Tasks/GetAllTasksCategoryByUserId',
    DeleteTask: '/api/Tasks/DeleteTask',
    UpdateTaskTitle: '/api/Tasks/UpdateTaskTitle',
    AddCategoryToTask: '/api/Tasks/AddCategoryToTask',
    AssignNewParticipantToTask: '/api/Tasks/AssignNewParticipantToTask',
    AssignNewViewerToTask: '/api/Tasks/AssignNewViewerToTask',
    DelayTask: '/api/Tasks/DelayTask',
    AssignNewListParticipantToTask: '/api/Tasks/AssignNewListParticipantToTask',
    AssignNewListViewerToTask: '/api/Tasks/AssignNewListViewerToTask',
    FollowATask: '/api/Tasks/FollowATask',
    UnfollowATask: '/api/Tasks/UnfollowATask',
    StopNotification: '/api/Tasks/StopNotification',
    EnableNotification: '/api/Tasks/EnableNotification',
    ChangeMajorAssignment: '/api/Tasks/ChangeMajorAssignment',
    RequestFinishATask: '/api/Tasks/RequestFinishATask',
    FinishATask: '/api/Tasks/FinishATask',
    AddNewTaskHistory: '/api/Tasks/AddNewTaskHistory',
    GetAllTasksProject: '/api/Tasks/GetAllTasksProject',
    getAllRights: '/api/Rights/GetAllRights',
    getAllRightsByUserld: '/api/Users/GetAllRightsByUserId/',
    UpdateTasksCategory: '/api/Tasks/UpdateTasksCategory',
    DeleteATasksCategory: '/api/Tasks/DeleteATasksCategory',
    CreateNewTasksCategory: '/api/Tasks/CreateNewTasksCategory',
    GetAllTasksByCategory: '/api/Tasks/GetAllTasksByCategory',
    RemoveListOfTasksFromCategory: '/api/Tasks/RemoveListOfTasksFromCategory',
    GetAllTasksNotInAnyCategory: '/api/Tasks/GetAllTasksNotInAnyCategory',
    AddTasksToCategory: '/api/Tasks/AddTasksToCategory',
    GetAllTasksByProjectId: '/api/Tasks/GetAllTasksByProjectId',
    UpdateTasksProject: '/api/Tasks/UpdateTasksProject',
    CreateATasksProject: '/api/Tasks/CreateATasksProject',
    DeleteTasksProject: '/api/Tasks/DeleteTasksProject',
    RemoveTasksFromProject: 'api/Tasks/RemoveTasksFromProject',
    GetAllTasksNotInAnyProject: '/api/Tasks/GetAllTasksNotInAnyProject',
    AddTasksToProject: '/api/Tasks/AddTasksToProject',
    GetAllTasksSample: '/api/Tasks/GetAllTasksSample',
    TasksSampleDetail: '/api/Tasks/TasksSampleDetail',
    TaskChecked: '/api/Tasks/TaskChecked',
    RatingParticipantFromTask: '/api/Tasks/RatingParticipantFromTask',
    TaskRating: '/api/Tasks/TaskRating',
    //////////////////////////////////////////////////////////////// Location: '/api/'
    GetAllLocations: '/api/Event/GetAllLocation',
    UpdateLocation: '/api/Event/UpdateLocation',
    DeleteLocation: '/api/Event/DeleteLocation',
    AddLocation: '/api/Event/AddNewLocation',
    ///////
    GetAllEventSample: '/api/Event/GetAllEventSample',
    GetEventDetailById: '/api/Event/GetEventDetailById',
    AddNewEventSample: '/api/Event/AddNewEventSample',
    DeleteEventSample: '/api/Event/DeleteEventSample',
    UpdateEventSample: '/api/Event/UpdateEventSample',
    //// Event
    GetAllEventByType: '/api/Event/GetAllEventByType',
    CreateNewEvent: '/api/Event/CreateNewEvent',
    AcceptAllEventRequest: '/api/Event/AcceptAllEventRequest',
    UpdateEvent: '/api/Event/UpdateEvent',
    CancelAllEvent: '/api/Event/CancelAllEvent',
    DeleteEvent: '/api/Event/DeleteEvent',
    //commment
    GetAllCommentFromIdAndType: '/api/Comment/GetAllCommentFromIdAndType',
    addComment: '/api/Comment/addComment',
    GetTasksTotalsByGroup: '/api/Tasks/GetTasksTotalsByGroup',
    GetAllGroups: '/api/Groups/GetAllGroups',
    //// Event User
    GetUserEvent: '/api/UserEvents/GetUserEvent',
    GetUserEventsByUserId: '/api/UserEvents/GetUserEventsByUserId',
    CreateNewUserEvents: '/api/UserEvents/CreateNewUserEvents',
    DeleteUserEvent: '/api/UserEvents/DeleteUserEvent',
    GetUserEventDetail: '/api/UserEvents/GetUserEventDetail',
    UpdateUserEvent: '/api/UserEvents/UpdateUserEvent',
    //Ho so
    CreateNewFileFromCabinet: '/api/UserEvents/CreateNewFileFromCabinet',
    GetFilesFromCabinet: '/api/UserEvents/GetFilesFromCabinet',
    GetSharingFilesFromCabinet: '/api/UserEvents/GetSharingFilesFromCabinet',
    FileDetailFromCabinet: '/api/UserEvents/FileDetailFromCabinet',
    FileDeleteFromCabinet: '/api/UserEvents/FileDeleteFromCabinet',
    FilesUpdateFromCabinet: '/api/UserEvents/FilesUpdateFromCabinet',
    // danh thiếp
    CreateBusinessCard: '/api/UserEvents/CreateBusinessCard',
    getBusinessCardByUser: '/api/UserEvents/getBusinessCardByUser',
    updateBusinessCard: '/api/UserEvents/updateBusinessCard',
    deleteBusinessCard: '/api/UserEvents/deleteBusinessCard',
    DetailBusinessCard: '/api/UserEvents/DetailBusinessCard',
    // nhóm công việc
    CreateWorkingGroup: '/api/UserEvents/CreateWorkingGroup',
    GetWorkingGroup: '/api/UserEvents/GetWorkingGroup',
    DetailWorkingGroup: '/api/UserEvents/DetailWorkingGroup',
    UpdateWorkingGroup: '/api/UserEvents/UpdateWorkingGroup',
    DeleteWorkingGroup: '/api/UserEvents/DeleteWorkingGroup',
    ///////////////////////////// Văn Bản
    // nguồn văn bàn
    GetAllSourceDocuments: '/api/Documents/GetAllSourceDocuments',
    CreateNewDocumentsSource: '/api/Documents/CreateNewDocumentsSource',
    UpdateDocumentsSource: '/api/Documents/UpdateDocumentsSource',
    DeleteDocumentsSource: '/api/Documents/DeleteDocumentsSource',
    // thư mục văn bản
    GetAllDocumentsFolder: '/api/Documents/GetAllDocumentsFolder',
    CreateNewDocumentsFolder: '/api/Documents/CreateNewDocumentsFolder',
    UpdateDocumentsFolder: '/api/Documents/UpdateDocumentsFolder',
    DeleteDocumentsFolder: '/api/Documents/DeleteDocumentsFolder',
    // Văn Bản
    GetAllDocumentByType: '/api/Documents/GetAllDocumentByType',
    CreateNewDocuments: '/api/Documents/CreateNewDocuments',
    GetDocumentDetail: '/api/Documents/GetDocumentDetail',
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private generalService: GeneralService
  ) { }
  defaultTimeout = 10000;
  async uploadFile(fileToUpload: [File], Folder: string, IdContent: string) {
    const formData: FormData = new FormData();
    fileToUpload.forEach(x => {
      formData.append('formFiles', x, x.name);
    })
    await this.httpCall(this.apiLists.FilesUpload + `?subDirectory=FilesUpload%2F${Folder}%2F${IdContent}`, {}, formData, 'post', true);
  }
  postFile(fileToUpload: [File], url, header, taskID, showErr) {
    url =
      this.generalService.appConfig.API_BASE_URL +
      url +
      `${taskID}%2F${this.generalService.currentUser.userId}`;
    if (this.generalService.userData != null) {
      header['Authorization'] = 'Bearer ' + this.generalService.userData.token;
      header['enctype'] = 'multipart/form-data';
    }
    const formData: FormData = new FormData();
    fileToUpload.forEach((file) => {
      formData.append('formFiles', file, file.name);
    });
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, formData, { headers: header }).subscribe(
        (res) => {
          console.log(res);
          resolve(res);
        },
        (err) => {
          console.log(err);
          if (showErr)
            this.generalService.showErrorToast(
              0,
              'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.'
            );
          reject(err);
        }
      );
    });
  }
  httpCall(url, header, body, method, showErr) {
    //Ở đây đã có code sẵn truyền.
    url = this.generalService.appConfig.API_BASE_URL + url;
    if (this.generalService.userData != null) {
      header['Authorization'] = `Bearer ${this.generalService.userData.token}`;
    }

    return new Promise((resolve, reject) => {
      //use angular http

      if (method == 'get') {
        this.httpClient
          .get(url, { headers: header, params: body })
          .pipe(
            timeout(this.defaultTimeout),
            catchError((e) => {
              return Promise.reject(e);
            })
          )
          .subscribe(
            (res) => {
              console.log(res);
              resolve(res);
            },
            (err) => {
              console.log(err);

              if (showErr)
                this.generalService.showErrorToast(
                  0,
                  'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.'
                );
              reject(err);
            }
          );
      } else if (method == 'post') {
        this.httpClient
          .post(url, body, { headers: header })
          .pipe(
            timeout(this.defaultTimeout),
            catchError((e) => {
              return Promise.reject('TimeOut');
            })
          )
          .subscribe(
            (res) => {
              console.log(res);
              resolve(res);
            },
            (err) => {
              console.log(err);
              if (showErr)
                this.generalService.showErrorToast(
                  0,
                  'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.'
                );
              reject(err);
            }
          );
      } else if (method == 'patch') {
        this.httpClient
          .patch(url, body, { headers: header })
          .pipe(
            timeout(this.defaultTimeout),
            catchError((e) => {
              return Promise.reject('TimeOut');
            })
          )
          .subscribe(
            (res) => {
              console.log(res);
              resolve(res);
            },
            (err) => {
              console.log(err);
              if (showErr)
                this.generalService.showErrorToast(
                  0,
                  'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.'
                );
              reject(err);
            }
          );
      } else if (method == 'put') {
        this.httpClient
          .put(url, body, { headers: header })
          .pipe(
            timeout(this.defaultTimeout),
            catchError((e) => {
              return Promise.reject('TimeOut');
            })
          )
          .subscribe(
            (res) => {
              console.log(res);
              resolve(res);
            },
            (err) => {
              console.log(err);
              if (showErr)
                this.generalService.showErrorToast(
                  0,
                  'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.'
                );
              reject(err);
            }
          );
      } else if (method == 'delete') {
        this.httpClient
          .delete(url, { headers: header })
          .pipe(
            timeout(this.defaultTimeout),
            catchError((e) => {
              return Promise.reject('TimeOut');
            })
          )
          .subscribe(
            (res) => {
              console.log(res);
              resolve(res);
            },
            (err) => {
              console.log(err);
              if (showErr)
                this.generalService.showErrorToast(
                  0,
                  'Đã xảy ra lỗi kết nối với hệ thống. Xin vui lòng thử lại.'
                );
              reject(err);
            }
          );
      }
    });
  }

  async initDataFromServer() {
    this.getUserInfo();
    this.getAllUsers(null, null);
  }

  async getUserInfo() {
    try {
      let res = await this.httpCall(
        this.apiLists.getUserByID + this.generalService.userData.userID,
        {},
        {},
        'get',
        false
      );
      let result = <any>res;
      if (result.succeeded) {
        this.generalService.currentUser = result.data;
      }
    } catch (error) { }
  }

  async getAllUsers(pageNum, pageSize) {
    try {
      if (pageNum == null || pageSize == null) {
        pageNum = 1;
        pageSize = 200;
      }
      let res = await this.httpCall(
        this.apiLists.getAllUsers,
        {},
        {
          PageNumber: pageNum,
          PageSize: pageSize,
        },
        'get',
        false
      );
      let result = <any>res;
      if (result.succeeded) {
        this.generalService.allUsers = result.data;
        this.generalService.allUsersWithGroups = this.generalService.groupByKey(
          result.data,
          'groupChinhName'
        );
        this.generalService.allUserGroupsKey = Object.keys(
          this.generalService.allUsersWithGroups
        );
      }
    } catch (error) { }
  }
}
