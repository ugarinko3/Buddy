import {fetchToken} from '../../store/slice/tokenSlice';
import {useEffect, useState} from "react";
import {getCookie} from "../cookie/getCookie";
import {useDispatch, useSelector} from "react-redux";

export function useCheckToken() {
    const dispatch = useDispatch();
    const [hasCheckedToken, setHasCheckedToken] = useState(false);

    const {login, role, create} = useSelector((state) => state.token);

    useEffect(() => {
        const loginCookie = getCookie('login');
        const tokenCookie = getCookie('access_token');

        const fetchAndCheckToken = async () => {
            if (!hasCheckedToken) {
                await dispatch(fetchToken(loginCookie, tokenCookie));
                setHasCheckedToken(true);
            }
        };

        fetchAndCheckToken();
    }, [dispatch]);

    return {login, role, create};
}
