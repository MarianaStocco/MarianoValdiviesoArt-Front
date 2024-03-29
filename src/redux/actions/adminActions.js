import axios from "axios";

const GET_PAINT_BY_ID = "GET_PAINT_BY_ID";

const url = "https://marianovaldivieso.onrender.com";

export function productPost(formData) {
  console.log(formData, "form en el action");
    async function a(dispatch) {
      console.log(formData, "form en el action despues del return");
      const post = await axios
        .post(`${url}/paints/createProducts`, formData)
        .then((response) => response.data)
        .catch((error) => console.log(error));
    }
    return a();
}

export function banUser(user) {
  const token = localStorage.getItem("token");
    return async (dispatch) => {
      const response = await axios.put(`${url}/adminActions/banUser`, user, {
        headers: { Authorization: "Bearer " + token },
      }, { validateStatus: false });
      return dispatch({type: "MESSAGE", payload: response.data})
    };
}

export function giveAdmin(user) {
  const token = localStorage.getItem("token");
    return async (dispatch) => {
      const response = await axios.put(`${url}/adminActions/giveAdmin`, user, {
        headers: { Authorization: "Bearer " + token },
      }, { validateStatus: false });
      return dispatch({type: "MESSAGE", payload: response.data})
    };
}

export function giveArtist(user) {
  const token = localStorage.getItem("token");
    return async (dispatch) => {
      const response = await axios.put(`${url}/adminActions/giveArtist`, user, {
        headers: { Authorization: "Bearer " + token },
      }, { validateStatus: false });
      return dispatch({type: "MESSAGE", payload: response.data})
    };
}

export function turnArtist(user){
  const token = localStorage.getItem("token");
    return async (dispatch) => {
      const response = await axios.put(`${url}/adminActions/artistUser`, user, {
        headers: { Authorization: "Bearer " + token },
      }, { validateStatus: false });
      return dispatch({type: "MESSAGE", payload: response.data})
    };
}

export function getRequests(){
  const token = localStorage.getItem("token");
    return async () => {
      const response = await axios.get(`${url}/adminActions/getArtistRequest`, {
        headers: { Authorization: "Bearer " + token },
      });
      return response.data
    };
}

export function getArtRequests(){
  const token = localStorage.getItem("token");
    return async () => {
      const response = await axios.get(`${url}/adminActions/getArtRequest`, {
        headers: { Authorization: "Bearer " + token },
      });
      return response.data
    };
}

export function approveArtRequest(object){
  const token = localStorage.getItem("token");
    return async (dispatch) => {
      const response = await axios.post(`${url}/adminActions/approveArt`, object, {
        headers: { Authorization: "Bearer " + token },
      }, { validateStatus: false });
      dispatch({type: "MESSAGE", payload: response.data})
    };
}

export function commentDeleteAdmin(id){
  const token = localStorage.getItem("token")
    return async function(dispatch){
        const res = await axios.put(`${url}/adminActions/deleteCommentAdmin`, {commentId: id}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }, { validateStatus: false })
        dispatch({type: "MESSAGE", payload: res.data})
    }
}

export function checkArtwork(id){
  const token = localStorage.getItem("token")
  return async function(dispatch){
    const res = await axios.put(`${url}/adminActions/checkProduct/${id}`, {}, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }, { validateStatus: false })
  dispatch({type: "MESSAGE", payload: res.data})
}
}

export function getUnchecked(){
  const token = localStorage.getItem("token")
  return async function(dispatch){
    const res = await axios.get(`${url}/adminActions/getUnchecked`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }, { validateStatus: false })
  dispatch({type: "GET_UNCHECKED", payload: res.data})
}
}

export function getAllProductsAdmin() {
  return async function (dispatch) {
    const res = await axios.get(`${url}/adminActions/allpaintsAdmin`);
    dispatch({
      type: "GET_ALL_PRODUCTS",
      payload: res.data,
    });
  };
}

export function getPaintByIdAdmin(id) {
  return async function (dispatch) {
    const res = await axios.get(`${url}/adminActions/getOnePaintAdmin/${id}`);
    dispatch({
      type: GET_PAINT_BY_ID,
      payload: res.data,
    });
  };
}

export function getProductSearchbarAdmin(input){
  return async function (dispatch) {
    const res = await axios.get(`${url}/adminActions/allpaintsAdmin?art=${input}`);
    dispatch({
      type: "GET_PRODUCT_SEARCHBAR",
      payload: res.data,
    });
  }
};



// export function getAllUsers() {
//   console.log("getAllUsers", "antes del return");
//   return async function (dispatch) {
//     console.log("getAllUsers");
//     const allUsers = await axios.get(`${url}/adminActions/getAllUsers`);
//     dispatch({ type: "GET_ALL_USERS", payload: allUsers.data });
//   };
// }
