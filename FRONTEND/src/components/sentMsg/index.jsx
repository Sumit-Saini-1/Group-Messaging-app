import PropTypes from 'prop-types';
import Style from "./style.module.css";
export default function SentMsg(props){
    const {msg,time} =props;
    return(
        <li className={Style.msg} >
            {msg} <span className={Style.time}>{time}</span>
        </li>
    );
}

SentMsg.defaultProps={
    msg:"Sample sent msg",
    time:"00:00:00"
}

SentMsg.propTypes={
    msg:PropTypes.string,
    time:PropTypes.string
}