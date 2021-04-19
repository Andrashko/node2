import axios from "axios";
import { showErrorMessage } from "../messaging";

const baseUrl = "https://localhost:7443";

export default {
    async getLoginByToken(token) {
        try {
            const user = (await axios.get(
                `${baseUrl}/auth`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )).data;

            return user.login;
        } catch (err) {
            showErrorMessage(err);
            return null;
        }
    },

    async getToken(login, password) {
        try {
            const data = (await axios.post(
                `${baseUrl}/auth/login`,
                {
                    login,
                    password
                }
            )).data;
            return data.token;
        }
        catch (err) {
            showErrorMessage(err);
            return null;
        }
    },
}