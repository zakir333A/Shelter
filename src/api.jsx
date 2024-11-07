import axios from "axios";

const API_URL = "http://192.168.88.79:8000/api";

var language_code = localStorage.getItem("lang_code") || "az";

export async function GetAboutUs() {
    try {
        const response = await axios.get(
            `${API_URL}/about-us?lang=${language_code}`
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        return null;
    }
}
