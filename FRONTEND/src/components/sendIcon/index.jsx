import { IoMdSend } from "react-icons/io";
import PropTypes from 'prop-types';
import Style from "./style.module.css";

export default function SendIcon(props){
    const {onClickSend}=props;
    return (
        <IoMdSend className={Style.sendIcon} onClick={onClickSend}/>
    );
}

SendIcon.propTypes={
    onClickSend:PropTypes.func
}