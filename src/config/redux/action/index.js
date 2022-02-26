import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { push, ref, onValue, set, remove } from "firebase/database";
import { database } from "../../firebase";

// asyncronus
export const actionUserName = (dispatch) => {
  return setTimeout(() => {
    return dispatch({ type: "CHANGE_USER", value: "Reza Bagus Pratama" });
  }, 2000);
};

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    setTimeout(() => {
      createUserWithEmailAndPassword(data.auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          dispatch({ type: "CHANGE_LOADING", value: false });
          resolve(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          dispatch({ type: "CHANGE_LOADING", value: false });
          reject(false);
        });
    }, 5000);
  });
};

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    setTimeout(() => {
      signInWithEmailAndPassword(data.auth, data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log(user)
          const dataUser = {
            email: user.email,
            uid: user.uid,
            emailVerified: user.emailVerified,
            refreshToken: user.refreshToken,
          };
          dispatch({ type: "CHANGE_LOADING", value: false });
          dispatch({ type: "CHANGE_LOGIN", value: true });
          dispatch({ type: "CHANGE_USER", value: dataUser });
          resolve(dataUser);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          dispatch({ type: "CHANGE_LOADING", value: false });
          dispatch({ type: "CHANGE_LOGIN", value: false });
          reject(false);
        });
    }, 5000);
  });
};

export const addDataAPI = (data) => (dispatch) => {
  push(ref(database, "notes/" + data.userId), {
    title: data.title,
    content: data.content,
    date: data.date,
  });
};

export const getDataAPI = (userId) => (dispatch) => {
  const urlNotes = ref(database, "notes/" + userId);
  return new Promise((resolve, reject) => {
    onValue(urlNotes, (snapshot) => {
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        data.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
    //   console.log("get Data", data);
      dispatch({ type: "CHANGE_NOTES", value: data });
      // updateStarCount(postElement, data);
      resolve(snapshot.val());
    });
  });
};

export const updateDataAPI = (data) => (dispatch) => {
  const urlNotes = ref(database, `notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
      set(urlNotes, {
        title: data.title,
        content: data.content,
        date: data.date,
      }, (err) => {
          if(err) {
              reject(false)
          } else {
              resolve(true)
          }
      })
  });
};

export const deleteDataAPI = (data) => (dispatch) => {
  const urlNotes = ref(database, `notes/${data.userId}/${data.noteId}`);
  return new Promise((resolve, reject) => {
      remove(urlNotes)
  });
};
