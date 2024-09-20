import {getCookie} from "../cookie/getCookie";

export async function checkToken() {
    const token = getCookie('access_token');
    const username = getCookie('login');


}