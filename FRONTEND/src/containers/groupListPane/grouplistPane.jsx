import PropsTypes from 'prop-types';
import * as Style from "./style.module.css";
import GroupList from '../../components/grouplist';
import Button from '../../components/Button';
import { LogoutOutlined } from '@ant-design/icons';
import Logout from '../logout/Logout';
import { IoNotifications } from "react-icons/io5";
import { Modal } from 'antd';
import { useState } from 'react';
import { getInvitationsApi, invitationResponseApi } from '../../../ReuestsToServer/invitation';

export default function GroupListPane(props) {
    const { groups, openChat, createGroup,refereshGroupList } = props;
    const [showNotification, setShowNotification] = useState(false);
    const [invitations, setInvitation] = useState([]);
    function closeNotification() {
        setShowNotification(false);
    }
    function onClickNotification() {
        getInvitationsApi().then(invitations => {
            setInvitation(invitations);
            setShowNotification(true);
        }).catch(err => {
            console.log(err.message);
            setShowNotification(true);
        })
    }
    function acceptIvitation(invitationID, groupID) {
        const response = 'A';
        // console.log(invitationID, response, groupID);
        invitationResponseApi(invitationID, response, groupID).then(accepted => {
            if (accepted) {
                setInvitation(invitations.filter(v => v._id != invitationID));
                refereshGroupList();
            }
        }).catch(err => {
            console.log(err.message);
        });
    }
    function rejectInvitation(invitationID, groupID) {
        const response = 'R';
        // console.log(invitationID, response, groupID);
        invitationResponseApi(invitationID, response, groupID).then(rejected => {
            if (rejected) {
                setInvitation(invitations.filter(v => v._id != invitationID));
            }
        }).catch(err => {
            console.log(err.message);
        });
    }
    return (
        <div className={Style.container}>
            <div className={Style.logout} title='Logout' onClick={Logout()}>
                <LogoutOutlined title='Logout' />
            </div>
            <IoNotifications className={Style.notificationbtn} onClick={onClickNotification} title='Notfications' />
            <Modal title="Notfications" maskClosable={true} footer={() => { }} open={showNotification} onOk={closeNotification} onCancel={closeNotification} >
                {
                    invitations.length == 0 ?
                        <>No Notfications</>
                        : invitations.map((v, i) => {
                            return (
                                <li className={Style.invitationList} key={i}>
                                    invitation for &quot;{v.groupID.groupname}&quot;
                                    <div className={Style.actions}>
                                        <Button onClick={() => acceptIvitation(v._id, v.groupID._id)}>Accecpt</Button>
                                        <Button onClick={() => { rejectInvitation(v._id, v.groupID._id) }} classname={'red'}>Reject</Button></div>
                                </li>
                            )
                        })
                }
            </Modal>
            <div className={Style.head}>Groups</div>
            <Button style={{ width: '85%', marginInline: '15px' }} onClick={createGroup}>Create new group</Button>
            <ul className={Style.ul}>
                {
                    groups.length == 0 ?
                        <div>You are not a member of any group. Please Create a group</div> :
                        groups.map(function (value, index) {
                            return (
                                <GroupList key={index} onClick={openChat(value.groupID)} username={value.groupID?.groupname} />
                            );
                        })
                }
            </ul>
        </div>
    );
}

GroupListPane.defaultProps = {
    groups: [],
}

GroupListPane.propTypes = {
    groups: PropsTypes.array,
    openChat: PropsTypes.func,
    checkFriendNameInServer: PropsTypes.func,
    createGroup: PropsTypes.func,
    refereshGroupList:PropsTypes.func
}