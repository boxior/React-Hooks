import {
    GET_DAILY_ERROR,
    GET_DAILY_START,
    GET_DAILY_SUCCESS,
    GET_WEEKLY_START,
    GET_WEEKLY_SUCCESS,
    GET_WEEKLY_ERROR, SET_CITIES
} from "./constants";

export const getDailyStart = () => {
    return {
        type: GET_DAILY_START
    }
};

export const getDailySuccess = payload => {
    return {
        type: GET_DAILY_SUCCESS,
        payload
    }
};

export const getDailyError = error => {
    return {
        type: GET_DAILY_ERROR,
        error
    }
};

export const getWeeklyStart = () => {
    return {
        type: GET_WEEKLY_START
    }
};

export const getWeeklySuccess = payload => {
    return {
        type: GET_WEEKLY_SUCCESS,
        payload
    }
};

export const getWeeklyError = error => {
    return {
        type: GET_WEEKLY_ERROR,
        error
    }
};

export const setCities = payload => {
    return {
        type: SET_CITIES,
        payload
    }
};