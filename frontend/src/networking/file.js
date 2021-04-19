import axios from "axios";
import { showErrorMessage } from "../messaging";

const baseUrl = "https://localhost:7443";

export default {
    async uploadImage(image) {
        try {
            console.log(image);
            let img = new FormData();
            img.append("image", image);
            let uploadFile = (await axios.post(
                `${baseUrl}/file`,
                img,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )).data;
            console.log(uploadFile);
            return uploadFile;
        } catch (err) {
            showErrorMessage(err);
            return null;
        }
    },
}