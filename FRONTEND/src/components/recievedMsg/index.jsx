import PropTypes from 'prop-types';
import Style from "./style.module.css";
export default function ReceivedMsg(props){
    const {msg,time,sendBy} =props;
    return(
        <li  className={Style.msg}><div className={Style.sender}>{sendBy}</div>{msg} <span className={Style.time}>{time}</span></li>
    );
}

ReceivedMsg.defaultProps={
    msg:"Sample received msg",
    time:"00:00:00"
}

ReceivedMsg.propTypes={
    msg:PropTypes.string,
    time:PropTypes.string,
    sendBy:PropTypes.string
}