import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchToken} from './store/slice/tokenSlice';
import {getCookie} from './pages/cookie/getCookie';
import Loading from "./pages/loading/loading";
import Error from "./pages/error/error";

const PrivateRoute = ({element: Component}) => {
    const dispatch = useDispatch();
    const {login, error} = useSelector((state) => state.token);

    useEffect(() => {
        const loginCookie = getCookie('login');
        const tokenCookie = getCookie('access_token');

        if (!login && !error) {
            dispatch(fetchToken(loginCookie, tokenCookie));
        }
    }, [dispatch,login,error]);

    if (error && error !== 429) {
        return <Error
            code={error}
        />;
    } else if (!login) {
        return <Loading/>;
    }

    return <Component/>;
};

export default PrivateRoute;