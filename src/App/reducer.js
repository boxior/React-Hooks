import {
    GET_DAILY_ERROR,
    GET_DAILY_START,
    GET_DAILY_SUCCESS,
    GET_WEEKLY_ERROR,
    GET_WEEKLY_START,
    GET_WEEKLY_SUCCESS, SET_CITIES
} from "./constants";
import _ from "lodash";

export const initialState = {
    data: [],
    activeCity: {},
    isSendingGetDaily: false,
    isSendingGetWeekly: false,
    isSuccessGetDaily: true,
    isSuccessGetWeekly: true,
    error: null
};

function getDailySuccess(state, res) {
    const stateData = _.get(state, "data", []);
    const cityRes = _.get(res, "data", null);

    const existCity = stateData.find(city => city.id === cityRes.id);
    const existCityIndex = stateData.findIndex(city => city.id === cityRes.id);

    if (existCity) {

        const newCitiesData = stateData.map((c, cIndex) => {
            if (cIndex === existCityIndex) {
                return cityRes;
            }

            return c;
        });

        return {
            ...state,
            data: newCitiesData,
            activeCity: cityRes,
            isSendingGetDaily: false,
            isSuccessGetDaily: true
        }
    } else {
        return {
            ...state,
            data: [...stateData, cityRes],
            activeCity: cityRes,
            isSendingGetDaily: false,
            isSuccessGetDaily: true
        }
    }
}

function getWeeklySuccess(state, res) {
    const stateData = _.get(state, "data", []);
    const cityRes = _.get(res, "data", null);
    const city = _.get(cityRes, "city", {});

    const existCity = stateData.find(c => c.id === city.id);
    const existCityIndex = stateData.findIndex(c => c.id === city.id);

    if (existCity) {

        const newExistCity = {
            ...existCity,
            ...city,
            list: cityRes.list,
        };

        const newCitiesData = stateData.map((c, cIndex) => {
            if (cIndex === existCityIndex) {
                return newExistCity
            }

            return c;
        });

        return {
            ...state,
            data: newCitiesData,
            activeCity: newExistCity,
            isSendingGetWeekly: false,
            isSuccessGetWeekly: true
        }
    } else {

        const newCity = {
            ...city,
            list: cityRes.list
        };

        return {
            ...state,
            data: [...stateData, newCity],
            activeCity: newCity,
            isSendingGetWeekly: false,
            isSuccessGetWeekly: true
        }
    }
}

export default (state, action) => {
    switch (action.type) {

        case GET_DAILY_START:
            return {
                ...state,
                isSendingGetDaily: true,
                isSuccessGetDaily: false
            };

        case GET_DAILY_SUCCESS:
            return getDailySuccess(state, action.payload);

        case GET_DAILY_ERROR:
            return {
                ...state,
                error: action.error,
                isSendingGetDaily: false,
                isSuccessGetDaily: false
            };

        case GET_WEEKLY_START:
            return {
                ...state,
                isSendingGetWeekly: true,
                isSuccessGetWeekly: false
            };

        case GET_WEEKLY_SUCCESS:
            return getWeeklySuccess(state, action.payload);

        case GET_WEEKLY_ERROR:
            return {
                ...state,
                error: action.error,
                isSendingGetWeekly: false,
                isSuccessGetWeekly: false
            };

        case SET_CITIES:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
};