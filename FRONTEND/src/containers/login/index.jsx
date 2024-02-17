import { useState } from "react";
import Input from "../../components/input";
import Button from "../../components/Button/index";
import Style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginApi } from "../../../ReuestsToServer/User";
import { setUser, login } from '../../states/reducers/authReducer';
import { useDispatch } from "react-redux";

export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const navigate = useNavigate();
    function onChangeEmail(ev) {
        setEmail(ev.target.value);
    }
    function onChangePassword(ev) {
        setPassword(ev.target.value);
    }

    function onClickLogin() {
        if (email == "") {
            alert("Enter email");
            return;
        }
        if (password == "") {
            alert("Enter password");
            return;
        }
        LoginApi(email, password).then(res => {
            if (res.status == 200) {
                dispatch(setUser(res.message));
                window.sessionStorage.setItem("user", JSON.stringify(res.message));
                dispatch(login());
                navigate("/");
            }
            else {
                setErrormsg(res.message);
            }
        }).catch(err => {
            console.log(err.message);
        });
    }

    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <h2>Log in</h2>
                <Input style={{ "fontSize": "1rem", }} type="text" value={email} onChange={onChangeEmail} placeholder="Enter email" />
                <Input style={{ "fontSize": "1rem", }} type="password" value={password} onChange={onChangePassword} placeholder="Enter password" />
                <Button onClick={onClickLogin}>Login</Button>
                <p className={errormsg ? Style.error : Style.hidden}>{errormsg}</p>
                <p className={Style.p}>new user can signup <Link to="/signup">here</Link></p>
            </div>
        </div>
    )
}