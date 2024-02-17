import PropTypes from 'prop-types';
import logo from "../../assets/react.svg";
import Style from "./style.module.css";
import Input from '../../components/input';
import ReceivedMsg from '../../components/recievedMsg';
import SentMsg from '../../components/sentMsg';
import SendIcon from '../../components/sendIcon';
import { useEffect, useState } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { useSelector } from 'react-redux';
import { GetMessagesOfGroupApi } from '../../../ReuestsToServer/Message';
import { socket } from '../../socket';
import { FaArrowLeft, FaUsers } from "react-icons/fa";
import { Modal, Popconfirm } from 'antd';
import { GetMemberOfGroupApi } from '../../../ReuestsToServer/Members';
import { ImExit } from "react-icons/im";
import { exitFromGroupApi } from '../../../ReuestsToServer/Group';
import { TiUserAdd } from "react-icons/ti";
import InviteUser from '../../components/inviteUser';

export default function ChatPane(props) {
    const { group, image, goBack, groupLeft } = props;
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [showMembers, setShowMembers] = useState(false);
    const [invitationPanel, setInvitationPanel] = useState(false);
    const [members, setMembers] = useState([]);
    const auth = useSelector((state) => state.auth.value);
    const contentOnOne = 50||15;
    const [usersToInvite, setUsersToInvite] = useState([]);

    useEffect(() => {
        if (group?._id) {
            // console.log(group);
            loadMessages(0);
            socket.connect();
            socket.emit("open_group", group?._id);
        }
    }, [group]);

    function openInvitationPanel() {
        setInvitationPanel(true);
    }
    function closeInvitationPanel() {
        setInvitationPanel(false);
        setUsersToInvite([]);
    }

    function openMemberList() {
        GetMemberOfGroupApi(group?._id).then(members => {
            setMembers(members);
            setShowMembers(true);
        }).catch(err => {
            console.log(err.message);
        })
    }

    function closeMemberList() {
        setShowMembers(false);
    }

    function loadMessages(page) {
        GetMessagesOfGroupApi(group._id, page, contentOnOne).then(messages => {
            messages = messages.reverse();
            setChat(messages);
        }).catch(err => {
            setChat([]);
            console.log(err);
        });
    }

    function onTypeMessage(ev) {
        setMessage(ev.target.value);
    }

    function onClickSend() {
        if (message.trim()) {

            let msgobj = {
                "message": message,
                "sendBy": {
                    _id: auth.user.id,
                    username: auth.user.username
                },
                'group': group._id,
                "createdAt": new Date(),
            }
            socket.emit('chat_message', msgobj);
            setChat([...chat, msgobj]);
        }
        setMessage("");
    }

    socket.on('new_message', function (msgobj) {
        setChat([...chat, msgobj]);
    });

    function onKeyPress(ev) {
        if (ev.which == 13) {
            onClickSend();
        }
    }

    function exitFromGroup() {
        exitFromGroupApi(group?._id).then(exited => {
            if (exited) {
                console.log("exit", group?._id);
                groupLeft(group?._id);
                goBack();
            }
        }).catch(err => {
            console.log(err.message);
        });
    }

    return (
        <div className={Style.container}>
            <div className={Style.head}>
                <div>
                    <FaArrowLeft style={{ fontSize: '1.4rem', marginInline: '10px', cursor: 'pointer' }} onClick={goBack} />
                    <img className={Style.img} src={image} alt="" />
                    <span className={Style.user}>{group.groupname}</span>
                </div>
                
                <div>
                    <TiUserAdd title='Add User' style={{ marginInline: '5px', marginBlock: 'auto', cursor: 'pointer' }} onClick={openInvitationPanel} />
                    <FaUsers title='Members' style={{ marginInline: '15px', marginBlock: 'auto', cursor: 'pointer' }} onClick={openMemberList} />
                    <Popconfirm title='Exit from group' description="Are you sure to exit this group" onConfirm={exitFromGroup}>
                        <ImExit title='Exit from group' style={{ color: 'red', marginInline: '15px', marginBlock: 'auto', cursor: 'pointer', fontSize: '1.7rem' }} />
                    </Popconfirm>
                </div>
            </div>
            <Modal title="Group Members" maskClosable={true} footer={() => { }} open={showMembers} onOk={closeMemberList} onCancel={closeMemberList} >
                {
                    members.map((v, i) => {
                        return <li className={Style.memberList} key={i}>{v.username}</li>
                    })
                }
            </Modal>
            <Modal title="Invite Users" maskClosable={true} footer={() => { }} open={invitationPanel} onOk={closeInvitationPanel} onCancel={closeInvitationPanel} >
                {
                    <InviteUser group={group} usersToInvite={usersToInvite} setUsersToInvite={setUsersToInvite} />
                }
            </Modal>
            <div className={Style.chatContainer}>
                <ScrollableFeed className={Style.ul}>
                    {
                        chat.length == 0 ?
                            <div className={Style.emptyMsg}>
                                Say hello to your friends👋
                            </div>
                            : chat.map((value, index) => {
                                if (value.sendBy._id == auth.user.id) {
                                    return (
                                        <SentMsg key={index} msg={value.message} time={new Date(value.createdAt)?.toLocaleString()} />
                                    )
                                }
                                else {
                                    return (
                                        <ReceivedMsg key={index} sendBy={value.sendBy.username} msg={value.message} time={new Date(value.createdAt)?.toLocaleString()} />
                                    )
                                }
                            })
                    }
                </ScrollableFeed>
                <div>
                    <Input value={message} onKeyPress={onKeyPress} onChange={onTypeMessage} />
                    <SendIcon onClickSend={onClickSend} />
                </div>
            </div>
        </div>
    )
}

ChatPane.defaultProps = {
    username: "user",
    image: logo
}

ChatPane.propTypes = {
    group: PropTypes.object,
    image: PropTypes.string,
    goBack: PropTypes.func,
    groupLeft: PropTypes.func
}