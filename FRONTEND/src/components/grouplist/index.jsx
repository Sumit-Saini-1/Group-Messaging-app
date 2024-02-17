import Style from "./style.module.css";
import PropTypes from 'prop-types'
import logo from "../../assets/react.svg";
export default function GroupList(props){
    const {username,image,onClick}=props;
    return (
        <li className={Style.li} onClick={onClick}>
            <img className={Style.img} src={image} alt="" />
            <span className={Style.span}>{username}</span>
        </li>
    );
}

GroupList.defaultProps={
    username:"user",
    image:logo
}

GroupList.propTypes={
    username:PropTypes.string,
    image:PropTypes.string,
    onClick:PropTypes.func
}