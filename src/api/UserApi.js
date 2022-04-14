import axios from "../utils/request";

export const getUserList = async () => {
    const result = await axios.get("/api/user/get_user_list")
    return result.data;
}
export const getUserOptions = async () => {
    const result = await axios.get("/api/user/get_user_options")
    return result.data;
}
export const getUser = async (id) => {
    const result = await axios.get("/api/user/get_user", {params: {id}})
    return result.data;
}
export const registerUser = async (username, password, nickname, role, douban_user, qywx_user, overseerr_user, pushdeer_key, bark_url, score_rule_name) => {
    const result = await axios.post("/api/user/register", {
        username,
        password,
        nickname,
        role,
        douban_user,
        qywx_user,
        overseerr_user,
        pushdeer_key,
        bark_url,
        score_rule_name
    })
    return result;
}
export const updateUser = async (uid, username, nickname, new_password, role, douban_user, qywx_user, overseerr_user, pushdeer_key, bark_url, score_rule_name) => {
    const result = await axios.post("/api/user/update_user", {
        uid, username, nickname, new_password, role, douban_user, qywx_user,
        overseerr_user,
        pushdeer_key,
        bark_url,
        score_rule_name
    })
    return result;
}
export const getUnreadSysNotify = async () => {
    const result = await axios.get("/api/user/get_unread_sys_notify")
    return result.data;
}
export const countUnreadSysNotify = async () => {
    const result = await axios.get("/api/user/count_unread_sys_notify")
    return result.data;
}
export const getAllSysNotify = async () => {
    const result = await axios.get("/api/user/get_all_sys_notify")
    return result.data;
}
export const clearSysNotify = async () => {
    const result = await axios.get("/api/user/clear_sys_notify")
    return result;
}