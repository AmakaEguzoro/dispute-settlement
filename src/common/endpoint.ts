import { environment } from "environments/environment.prod";

const  BASE_URL = environment.production ? "http://197.253.19.76:6200/api/v1/" : "http://197.253.19.76:6200/api/v1/";
const auth = `${BASE_URL}/auth`;
const agency = `${BASE_URL}/transaction/agents`
// const auth =  "http://localhost:8000/api/";

export const Endpoint = {
    AUTH: {
        login: `${auth}/login`,
        logout: `${auth}/logout`,
    },

    AGENCY_BANKING: {
        url: agency
    }


}