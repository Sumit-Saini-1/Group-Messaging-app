export const SERVER_URL = "http://localhost:2000";
export function getToken(){
    return JSON.parse(window.sessionStorage.getItem("user"))?.token;
}