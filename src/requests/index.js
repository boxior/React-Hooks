import axios from "axios";

const apiKey = `61bb39d2705b2bde0d7e22fb542adea6`;

export const getDaily = city => {
    return axios.get(`/data/2.5/weather?q=${city}&APPID=${apiKey}`);
};

export const getWeekly = city => {
    return axios.get(`/data/2.5/forecast?q=${city}&APPID=${apiKey}`);
};