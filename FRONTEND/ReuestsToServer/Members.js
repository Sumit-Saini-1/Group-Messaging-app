import { SERVER_URL, getToken } from "./global";

export function GetMineGroupApi(){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/member/getMineGroup",{
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
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
export function GetMemberOfGroupApi(groupID){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/member/getMembersOfGroup",{
            method:'POST',
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
                'Authorization':getToken()
            },
            body:JSON.stringify({groupID})
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
