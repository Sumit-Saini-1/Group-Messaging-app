import { SERVER_URL, getToken } from "./global";

export function GetMessagesOfGroupApi(groupId, page, contentOnOne){
    return new Promise((resolve, reject) => {
        fetch(SERVER_URL+"/message/getMessageOfGroup",{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
                'Authorization':getToken()
            },
            body:JSON.stringify({groupId, page, contentOnOne})
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