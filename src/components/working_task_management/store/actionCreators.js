import * as constants from './constants.js';
import {fromJS} from 'immutable';

export const dispatchTaskListVisible = (value) => ({
    type: constants.TASK_LIST_VISIBLE,
    task_list_visible: fromJS(value),
});

export const dispatchFatherTaskInformationVisible = (value) => ({
    type: constants.FATHER_TASK_INFORMATION_VISIBLE,
    father_task_information_visible: fromJS(value),
});

export const dispatchSonTaskInformationVisible = (value) => ({
    type: constants.SON_TASK_INFORMATION_VISIBLE,
    son_task_information_visible: fromJS(value),
});

export const dispatchSubmitTaskList = (value) => ({
    type: constants.SUBMIT_TASK_LIST,
    submit_task_list: fromJS(value),
});

export const dispatchEditTaskVisible = (value) => ({
    type: constants.EDIT_TASK_VISIBLE,
    edit_task_visible: fromJS(value),
});


export const dispatchTaskList = (value) => ({
    type: constants.TASK_LIST,
    task_list: fromJS(value),
});