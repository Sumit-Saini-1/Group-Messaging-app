import { SERVER_URL,getToken } from "./global";

export function CreateGroupApi(groupname,description,listOfParticipant){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/group/createGroup",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
                'Authorization':getToken()
            },
            body:JSON.stringify({groupname,description,listOfParticipant})
        }).then(response=>{
            if(response.status==200){
                resolve(true);
            }
            else{
                resolve(false);
            }
        }).catch(err=>{
            reject(err);
        })
    });
}

export function TrendingGroupApi(){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/group/trendingGroups",{
            credentials:"include",
            headers:{
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
        })
    });
}

export function exitFromGroupApi(groupID){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/member/exitFromGroup",{
            method:'POST',
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
                'Authorization':getToken()
            },
            body:JSON.stringify({groupID})
        }).then(response=>{
            if(response.status==200){
                resolve(true);
            }
            else{
                reject(false);
            }
        }).catch(err=>{
            reject(err);
        });
    });
}