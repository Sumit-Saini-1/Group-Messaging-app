import PropTypes from 'prop-types';
import Style from "./style.module.css";
import Input from '../../components/input';
import Button from '../../components/Button';
import { useState } from 'react';
import { GetUserList } from '../../../ReuestsToServer/User';
import { CreateGroupApi } from '../../../ReuestsToServer/Group';

export default function CreateGroup(props) {
    const { groupCreated } = props;
    const [selectedUser, setSelectedUser] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [groupDesc, setGroupDesc] = useState("");
    const [userList, setUserList] = useState([]);
    const [searchText, setSearchText] = useState("");

    function onChangeSearchText(ev) {
        setSearchText(ev.target.value);
    }

    function searchUsers(ev) {
        if (ev.which == 13) {
            console.log(searchText);
            GetUserList(searchText).then(users => {
                setUserList(users);
            }).catch(err => {
                console.log(err);
            });
            setSearchText("");
        }
    }

    function onChangeGroupName(ev) {
        setGroupName(ev.target.value);
    }

    function onChangeGroupDesc(ev) {
        setGroupDesc(ev.target.value);
    }

    function onClickUserInUserList(user) {
        if (selectedUser.indexOf(user) === -1) {
            setSelectedUser([...selectedUser, user]);
        }
    }
    function onClickUserInselectedUser(user) {
        setSelectedUser(selectedUser.filter((value) => value.username != user.username));
    }

    function onClickCreate() {
        if (groupName.trim() == "" || groupName.length > 30) {
            alert("enter group name and it cannot exceed 30 character");
            return;
        }
        if (groupDesc.trim() == "" || groupDesc.length > 80) {
            alert("enter group description and it cannot exceed 80 character");
            return;
        }
        if (selectedUser.length == 0) {
            alert("please select atleast one participant");
            return;
        }
        CreateGroupApi(groupName, groupDesc, selectedUser).then(res => {
            console.log(res);
            groupCreated();
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className={Style.container}>
            <div className={Style.head}>
                New Group
            </div>
            <div className={Style.form} >
                <Input style={{ fontSize: '1rem', }} value={groupName} onChange={onChangeGroupName} placeholder={"Enter Group name"} />
                <Input style={{ fontSize: '1rem', }} value={groupDesc} onChange={onChangeGroupDesc} placeholder={"Enter Group Description"} />
                <Button onClick={onClickCreate}>Create</Button>
            </div>
            <div className={Style.grid}>
                <ul className={Style.ul}>
                    <div><h1>Selected User</h1></div>
                    {
                        selectedUser.length == 0 ? <>No user selected</> :
                            selectedUser.map(function (value, index) {
                                return (
                                    <li className={Style.li} key={index} onClick={() => onClickUserInselectedUser(value)}>{value.username}</li>
                                );
                            })
                    }
                </ul>
                <ul className={Style.ul}>
                    <Input style={{ "fontSize": "1rem", }} value={searchText} onKeyPress={searchUsers} onChange={onChangeSearchText} placeholder={"Search user"} />
                    <div><h1>Select User to add in Group</h1></div>
                    {
                        userList.length == 0 ? <>Search user to show</> :
                            userList.map(function (value, index) {
                                return (
                                    <li className={Style.li} key={index} onClick={() => { onClickUserInUserList(value) }}>{value.username}</li>
                                );
                            })
                    }
                </ul>
            </div>
        </div>
    )
}


CreateGroup.propTypes = {
    groupCreated: PropTypes.func
}