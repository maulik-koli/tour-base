
const KEY = "request_session_id";

const getSessionID = () => {
    return sessionStorage.getItem(KEY);
}

const setSessionID = (sessionId: string) => {
    sessionStorage.setItem(KEY, sessionId);
}

const removeSessionID = () => {
    sessionStorage.removeItem(KEY);
}

export class RequestSessionHelper {
    static getSessionID = getSessionID;
    static setSessionID = setSessionID;
    static removeSessionID = removeSessionID;
}