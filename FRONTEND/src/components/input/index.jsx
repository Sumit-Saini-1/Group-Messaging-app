import PropTypes from 'prop-types';
import Style from "./style.module.css";
export default function Input(props){
    const {placeholder,value,onChange,style,type,onKeyPress}=props;
    return (
        <input style={style?style:{}} type={type} className={Style.input} value={value} onKeyPress={onKeyPress} onChange={onChange} placeholder={placeholder}/>
    );
}

Input.defaultProps={
    placeholder:"Type message here...",
    value:""
}

Input.propTypes={
    placeholder:PropTypes.string,
    value:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    onKeyPress:PropTypes.func,
    style:PropTypes.object,
    type:PropTypes.string
}