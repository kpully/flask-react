import { FETCH_PROTECTED_DATA_REQUEST, FETCH_PROTECTED_DOG_DATA_REQUEST, RECEIVE_PROTECTED_DOG_DATA, RECEIVE_PROTECTED_DATA, REGISTER_DOG_REQUEST, REGISTER_DOG_SUCCESS, REGISTER_DOG_FAILURE } from '../constants/index';
import { parseJSON } from '../utils/misc';
import { data_about_user, get_token, create_dog_entry, data_about_user_dogs } from '../utils/http_functions';
import { logoutAndRedirect } from './auth';
import { browserHistory } from 'react-router';


export function receiveProtectedData(data) {
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data,
        },
    };
}

export function receiveProtectedDogData(dogs) {
    return {
        type: RECEIVE_PROTECTED_DOG_DATA,
        payload: {
            dogs,
        },
    };
}

export function fetchProtectedDataRequest() {
    return {
        type: FETCH_PROTECTED_DATA_REQUEST,
    };
}

export function fetchProtectedDogDataRequest() {
    return {
        type: FETCH_PROTECTED_DOG_DATA_REQUEST,
    };
}

export function fetchProtectedData(token) {
    return (dispatch) => {
        dispatch(fetchProtectedDataRequest());
        data_about_user(token)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedData(response.result));
            })
            .catch(error => {
                if (error.status === 401) {
                    dispatch(logoutAndRedirect(error));
                }
            });
    };
}


export function fetchProtectedDogData(token) {
    return (dispatch) => {
        dispatch(fetchProtectedDogDataRequest());
        data_about_user_dogs(token)
            .then(parseJSON)
            .then(response => {
                dispatch(receiveProtectedDogData(response.result));
            })
            .catch(error => {
                if (error.status === 401) {
                    dispatch(logoutAndRedirect(error));
                }
            });
    };
}

export function registerDog(breed, name, user_id, image) {
    return function (dispatch) {
        dispatch(registerDogRequest());
        return create_dog_entry(breed, name, user_id, image)
            .then(parseJSON)
            .then(response => {
                    dispatch(registerDogSuccess(response.name));
                    browserHistory.push('/main');
                });
  
            }
        }

export function registerDogRequest() {
    return {
        type: REGISTER_DOG_REQUEST,
    };
}

export function registerDogSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: REGISTER_DOG_SUCCESS,
        payload: {
            token,
        },
    };
}

export function registerDogFailure(error) {
    localStorage.removeItem('token');
    return {
        type: REGISTER_DOG_FAILURE,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText,
        },
    };
}
