import { useState } from "react";
import { getUsersToInviteApi, inviteUserApi } from "../../../ReuestsToServer/invitation";
import Input from "../input";
import PropTypes from 'prop-types';
import Style from "./style.module.css";
import Button from "../Button";
export default function InviteUser(props) {
    const { group,usersToInvite, setUsersToInvite } = props;
    const [searchText, setSearchText] = useState("");

    function searchInput(ev) {
        setSearchText(ev.target.value);
    }
    function getUsersToInvite(ev) {
        if (ev.which == 13) {
            if (searchText.trim()) {
                getUsersToInviteApi(searchText.trim()).then(users => {
                    setUsersToInvite(users);
                    setSearchText("");
                }).catch(err => {
                    console.log(err.message);
                    setUsersToInvite([]);
                    setSearchText("");
                });
            }
        }
    }

    function inviteUser(userID) {
        inviteUserApi(group?._id, userID).then(invited => {
            if (invited) {
                setUsersToInvite(usersToInvite.filter(v => v._id != userID));
            }
            else {
                console.log("already exist");
            }
        }).catch(err => {
            console.log(err.message);
        })
    }
    return (
        <>
            <Input style={{ fontSize: '1rem' }} value={searchText} onKeyPress={getUsersToInvite} onChange={searchInput} />
            {
                usersToInvite.length == 0 ?
                    <>No users to show</> :
                    usersToInvite.map((v, i) => {
                        return (
                            <li className={Style.memberList} key={i}>{v.username} <Button onClick={() => inviteUser(v._id)}>Invite</Button></li>
                        );
                    })
            }
        </>
    )
}

InviteUser.propTypes = {
    group: PropTypes.object,
    usersToInvite:PropTypes.array,
    setUsersToInvite:PropTypes.func
}