import { useState } from "react";
import Input from "../../components/input";
import Button from "../../components/button";
import Style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../../components/dropDown";
import { SignupApi } from "../../../ReuestsToServer/User";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [region, setRegion] = useState("none");
    const [errormsg, setErrormsg] = useState("");
    const navigate = useNavigate();
    const regions=["Asia","Australia","South Africa","North America","South America","Europe","Antarctica"];

    function onChangeUserName(ev) {
        setUsername(ev.target.value);
    }
    function onChangeEmail(ev) {
        setEmail(ev.target.value);
    }
    function onChangePassword(ev) {
        setPassword(ev.target.value);
    }
    function onChangeRegion(ev) {
        setRegion(ev.target.value);
    }

    function onClickSignup() {
        const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const mailre = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        //const mailre = /^[\w+\.]+@[a-z]+([\.-]?\w+)*\.[a-z]{2,3}$/

        if (username.trim() == "") {
            alert("username must be entered");
            return false;
        }

        if (!mailre.test(email)) {
            alert("Enter a valid email");
            return;
        }
        if (!re.test(password)) {
            alert("password must be more than 8 characters and there should be atleast 1 capital letter, 1 special character, 1 digit");
            return false;
        }
        if (region.trim() == "none") {
            alert("region must be entered");
            return false;
        }
        SignupApi(username,email,password,region).then(res=>{
            if(res.status==200){
                navigate("/login");
            }
            else if(res.status==409){
                setErrormsg(res.message);
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className={Style.container}>
            <div className={Style.innerContainer}>
                <h2>Sign Up</h2>
                <Input type="text" style={{ "fontSize": "1rem", }} value={username} onChange={onChangeUserName} placeholder="Enter your username" />
                <Input type="text" style={{ "fontSize": "1rem", }} value={email} onChange={onChangeEmail} placeholder="Enter Email" />
                <Input type="password" style={{ "fontSize": "1rem", }} value={password} onChange={onChangePassword} placeholder="Enter password" />
                <Dropdown options={regions} value={region} onChange={onChangeRegion} />
                <Button onClick={onClickSignup}>Sign up</Button>
                <p className={errormsg ? Style.error : Style.hidden}>{errormsg}</p>
                <p className={Style.p}>if already registered login <Link to="/login">here</Link></p>
            </div>
        </div>
    )
}