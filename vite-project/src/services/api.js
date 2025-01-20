import axios from 'axios';
import router from "@/router/index.ts";

const apiClient = axios.create({
    baseURL: 'http://localhost/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('auth_token');
            router.push({ name: 'Login' });
        }
        throw error;
    }
);

import { reactive, provide, computed } from 'vue';


const state = reactive({
    authToken: localStorage.getItem("auth_token") || null
});


function setAuthToken(token) {
    state.authToken = token;
    if (token) {
        localStorage.setItem("auth_token", token);
    } else {
        localStorage.removeItem("auth_token");
    }
}

const isLoggedIn = computed(() => state.authToken !== null);

provide('isLoggedIn', isLoggedIn);
provide('setAuthToken', setAuthToken);

export default apiClient;
