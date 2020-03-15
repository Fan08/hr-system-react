/*
 * @Descripttion: 
 * @version: 
 * @Author: 唐帆
 * @Date: 2019-12-13 11:31:17
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-03-14 15:37:27
 */
import { combineReducers} from "redux-immutable";

// import {reducer as http_request} from '../http_request/store'
import {reducer as common_store} from '../common/store'
import {reducer as organization_management} from '../organization_management/store'
import {reducer as staff_management} from '../staff_management/store'
import {reducer as working_hours_management} from '../working_hours_management/store'
import {reducer as working_task_management} from '../working_task_management/store'

const reducer = combineReducers({
    common_store: common_store,
    organization_management: organization_management,
    staff_management: staff_management,
    working_hours_management: working_hours_management,
    working_task_management: working_task_management
});

export default reducer;