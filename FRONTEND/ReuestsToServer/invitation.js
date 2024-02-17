import { SERVER_URL, getToken } from "./global";

export function getUsersToInviteApi(searchText){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/invitation/getUsersToInvite",{
            method:'POST',
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
                'Authorization':getToken()
            },
            body:JSON.stringify({searchText})
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
export function inviteUserApi(groupID,user){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/invitation/inviteUsers",{
            method:'POST',
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
                'Authorization':getToken()
            },
            body:JSON.stringify({groupID,user})
        }).then(response=>{
            if(response.status==200){
                resolve(true);
            }
            else{
                resolve(false);
            }
        }).catch(err=>{
            reject(err);
        });
    });
}
export function getInvitationsApi(){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/invitation/getInvitations",{
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
                'Authorization':getToken()
            },
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
export function invitationResponseApi(invitationID,response,groupID){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/invitation/invitationResponse",{
            method:'POST',
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
                'Authorization':getToken()
            },
            body:JSON.stringify({invitationID,response,groupID})
        }).then(response=>{
            if(response.status==200){
                resolve(true);
            }
            else{
                resolve(false);
            }
        }).catch(err=>{
            reject(err);
        });
    });
}