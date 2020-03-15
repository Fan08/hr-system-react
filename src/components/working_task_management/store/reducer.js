import { fromJS } from "immutable";
import * as constants from './constants.js';


const defaultState =fromJS({
    task_list_visible: false,
    father_task_information_visible:false,
    son_task_information_visible:false,
    task_list:[
        {
            no:'1',
            state:0,
            people:'name1',
            start_time:'2020-3-4',
            end_time:'2020-8-9',
            group:'group1',
            addition:'wu',
            detail:'网页开发',
            father_task:'无',
            son_task:[
                {
                    no:'3',
                    state:0,
                    people:'name1',
                    start_time:'2020-3-4',
                    end_time:'2020-8-9',
                    group:'group1',
                    addition:'wu',
                    detail:'网页开发',
                    father_task:'1',
                    son_task:[],
                    accessory:[]
                },
            ],
            accessory:[]
        },
        {
            no:'2',
            state:0,
            people:'name1',
            start_time:'2020-3-4',
            end_time:'2020-8-9',
            group:'group1',
            addition:'wu',
            detail:'网页开发',
            father_task:'无',
            son_task:[],
            accessory:[]
        }
    ],
    submit_task_list:[
        {
            no:'1',
            state:0,
            people:'name1',
            start_time:'2020-3-4',
            end_time:'2020-8-9',
            group:'group1',
            addition:'wu',
            detail:'网页开发',
            father_task:'无',
            son_task:[
                {
                    no:'3',
                    state:0,
                    people:'name1',
                    start_time:'2020-3-4',
                    end_time:'2020-8-9',
                    group:'group1',
                    addition:'wu',
                    detail:'网页开发',
                    father_task:'1',
                    son_task:[],
                    accessory:[]
                },
            ],
            accessory:[]
        },
        {
            no:'2',
            state:0,
            people:'name1',
            start_time:'2020-3-4',
            end_time:'2020-8-9',
            group:'group1',
            addition:'wu',
            detail:'网页开发',
            father_task:'无',
            son_task:[],
            accessory:[]
        }
    ],
    edit_task_visible:false
});

export default (state=defaultState, action)=> {
    switch (action.type) {
        case constants.TASK_LIST_VISIBLE:
            return state.set("task_list_visible", action.task_list_visible);
        case constants.TASK_LIST:
            return state.set("task_list", action.task_list);
        case constants.FATHER_TASK_INFORMATION_VISIBLE:
            return state.set("father_task_information_visible", action.father_task_information_visible);
        case constants.SON_TASK_INFORMATION_VISIBLE:
            return state.set("son_task_information_visible", action.son_task_information_visible);
        case constants.SUBMIT_TASK_LIST:
            return state.set("submit_task_list", action.submit_task_list);
        case constants.EDIT_TASK_VISIBLE:
            return state.set("edit_task_visible", action.edit_task_visible);
        default:
            return state
    }

}