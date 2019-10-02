import { environment } from "environments/environment.prod";

const  BASE_URL = environment.production ? "" : "http://localhost:8000/api";
const auth = `${BASE_URL}/auth`;
// const auth =  "http://localhost:8000/api/";

export const Endpoint = {
    AUTH: {
        login: `${auth}/login`,
        logout: `${auth}/logout`,
    },

    AGENCY_BANKING: {
        url: `${BASE_URL}`
    }


}