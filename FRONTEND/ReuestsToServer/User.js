import { SERVER_URL,getToken } from "./global";

export function SignupApi(username, email, password, region) {
    let userDetail = {
        "username": username,
        "email": email,
        "password": password,
        "region": region
    };
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userDetail })
        }).then(response => {
            if (response.status == 200) {
                resolve({ status: 200, message: "success" });
            }
            else if (response.status == 409) {
                return response.json();
            }
            else {
                resolve({ status: 500, message: "user already exist" });
            }
        }).then(res => {
            resolve({ status: 409, message: res.message });
        }).catch(err => {
            reject(err);
        });
    });
}
export function LoginApi(email, password) {
    let userDetail = {
        "email": email,
        "password": password
    };
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userDetail })
        }).then(response => {
            if (response.status == 200) {
                return response.json();
            }
            else if (response.status == 401) {
                resolve({ status: 401, message: "invalid credential" });
            }
            else if (response.status == 404) {
                resolve({ status: 404, message: "user not found" });
            }
        }).then(userDetail => {
            resolve({ status: 200, message: userDetail });
        }).catch(err => {
            reject(err);
        });
    });
}

export function LogoutApi() {
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/logout", {
            credentials: "include",
        }).then(function (response) {
            if (response.status == 200) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }).catch(function (err) {
            console.log(err);
            reject(false);
        });
    });
}

export function CheckAuthentication(token){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL + "/checkauthenticate", {
            method:"POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
        }).then(function (response) {
            if (response.status == 200) {
                resolve(true);
            }
            else {
                reject(false);
            }
        }).catch(function (err) {
            console.log(err);
            reject(false);
        });
    });
}

export function GetUserList(searchText){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/getUserList",{
            credentials:"include",
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                'Authorization':getToken()
            },
            body:JSON.stringify({searchText:searchText})
        }).then(response=>{
            if(response.status==200){
                resolve(response.json());
            }
            else{
                reject(false);
            }
        }).catch(err=>{
            reject(err);
        })
    });
}

export function GetTrendingUser(){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/getTrendingUser",{
            credentials:"include",
            headers:{
                'Authorization':getToken()
            }
        }).then(response=>{
            if(response.status==200){
                resolve(response.json());
            }
            else{
                resolve([]);
            }
        }).catch(err=>{
            reject(err);
        });
    });
}
export function GetTrendingRegion(){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/getTrendingRegion",{
            credentials:"include",
            headers:{
                'Authorization':getToken()
            }
        }).then(response=>{
            if(response.status==200){
                resolve(response.json());
            }
            else{
                resolve([]);
            }
        }).catch(err=>{
            reject(err);
        });
    });
}

