import axios from "axios";

const url = "https://marianovaldivieso.onrender.com"

export function artRequest(formData) {
    const token = localStorage.getItem("token")
    return async function a(dispatch) {
        const res = await axios.post(`${url}/artist/productRequest`, formData, {
            headers: { Authorization: "Bearer " + token },
        }, { validateStatus: false });
        if(res.status === 201){
            dispatch({type: "MESSAGE", payload: res.data})
            return "success"
        } else {
            dispatch({type: "MESSAGE", payload: res.data})
            return "error"
        }
    }
} 
  