import {requestStaffList} from "./store/actionCreators";

export const getStaffList = (staff_list, inode)=>{
    let department_staff_list = null;
    if (staff_list.get(inode)){
        department_staff_list = staff_list.get(inode);
        department_staff_list = department_staff_list.toJS();
    }
    else if(inode !== null && staff_list.get(inode) === undefined){
        requestStaffList(staff_list, inode)
    }
    return department_staff_list;
};