import { useDispatch } from "react-redux";
import { setUser, logout } from '../../states/reducers/authReducer';

export default function Logout() {
    const dispatch = useDispatch();

    return function () {
        try {
            window.sessionStorage.removeItem("user");
        } catch (error) {
            console.log(error);
        }
        finally{
            dispatch(logout());
            dispatch(setUser({}));
        }
    }
}