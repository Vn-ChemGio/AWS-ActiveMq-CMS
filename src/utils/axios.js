import axios from "axios";
// import {
//   loadingStart,
//   loadingEnd,
//
//   defaultError,
//   enqueueSnackbar as enqueueSnackbarAction,
// } from "../actions";

const instance = axios.create({
    baseURL: "http://localhost:3001"
});
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.post["Content-Method"] = 'API';
const selectSession = state => state.session;


export const injectStore = store => {
    store.subscribe(() => {
        const token = selectSession(store.getState()).jwt;
        instance.interceptors.request.use((config) => {
            // store.dispatch(loadingStart());
            if (token)
                config.headers.Authorization = token;
            return config;
        }, (err) => {
            return Promise.reject(err);
        });
        
        instance.interceptors.response.use(function(response) {
            //store.dispatch(loadingEnd());
            return response;
        }, function(error) {
            //store.dispatch(loadingEnd());
            //store.dispatch(enqueueSnackbarAction(defaultError(error)));
            //console.log(error)
            return Promise.reject(error);
        });
    });
};


export default instance;