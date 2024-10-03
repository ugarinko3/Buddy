import axios from 'axios';
import {fetchGetTeam} from "./teamSlice";


export const fetchCreateCurator = async (login) => {
    try {
        await axios.post("/admin/admin-create-curator", null, {
            params: { login }
        });
    } catch (error) {

        throw new Error(error.message);
    }
};
export const fetchCreateUser = async (login) => {
    try {
        await axios.post("/admin/admin-create-user", null, {
            params: { login }
        });
    } catch (error) {
        throw new Error(error.message);
    }
};
export const fetchGeneratorCommand = async () => {
    try {
        await axios.post("/admin/generator-team", {});
        // fetchGetTeam();// Передаем пустой объект
    } catch (error) {
        throw new Error(error.message);
    }
};





