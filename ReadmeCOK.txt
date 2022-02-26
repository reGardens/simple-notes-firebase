// Index Firebase

import firebase from 'firebase/compat/app'
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
// // import  'firebase/compat/auth';
// // import 'firebase/firestore';
// // import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: "AIzaSyD3gkPxabKPUNWWjC9AS-2rRI1s2bpUg_0",
    authDomain: "simple-notes-firebase-28ebc.firebaseapp.com",
    projectId: "simple-notes-firebase-28ebc",
    storageBucket: "simple-notes-firebase-28ebc.appspot.com",
    messagingSenderId: "942715549620",
    appId: "1:942715549620:web:42f62414fb328e474024e1",
    measurementId: "G-K7H08SQ6R7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // firebase.initializeApp(firebaseConfig);
  export const database = getDatabase(app);

//   const analytics = getAnalytics(app);

export default firebase;


// Index Reducer

const initState = {
    popup: false,
    login: false,
    isLoading: false,
    user: {}
  }
  
  const reducer = (state = initState, action) => {
    if (action.type === 'CHANGE_POPUP') {
      return {
        ...state,
        popup: action.value
      }
    };
    if (action.type === 'CHANGE_LOGIN') {
      return {
        ...state,
        login: action.value
      }
    }
    if (action.type === 'CHANGE_USER') {
      return {
        ...state,
        user: action.value
      }
    }
    if (action.type === 'CHANGE_LOADING') {
      return {
        ...state,
        isLoading: action.value
      }
    }
    return state
  }

  export default reducer;
  
  
// Index Action

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { push, ref, set } from "firebase/database";
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
  

// Index Login

import React, { Component } from "react";
import { connect } from "react-redux";
import { getAuth } from "firebase/auth";
import Button from "../../../components/atoms/Button";
import { loginUserAPI } from "../../../config/redux/action";

class Login extends Component {
    // changeName = () => {
    //     this.props.changeUserName()
    // }

    state = {
        email: '',
        password: '',
    }

    handleChange = (e) => {
        // console.log(e)
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    

    handelLoginSubmit = async () => {
        // console.log(this.state.email)
        // console.log(this.state.password)
        const {email, password} = this.state;
        const auth = getAuth();
        // let navigate = useNavigate(this.props);
        const { history } = this.props;
        // let navigate = useNavigate();
        const res = await this.props.loginAPI({email: email, password: password, auth: auth}).catch(err => err)
        if(res) {
            console.log('Login Success', res);
            this.setState({
                email: '',
                password: ''
            })
            history.push('/')
        } else {
            console.log('Login Failed');
        }
    }
    
    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                <p className="auth-title">Login Pages</p>
                <input type="text" className="input" id="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
                <input type="password" className="input" id="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                <Button onClick={this.handelLoginSubmit} title="Login" loading={this.props.isLoading} />
                </div>
                {/* <button>Go to Dahhboard</button> */}
            </div>
        )
    }
}

// const stateProps = (state) => {
//     return {
//         popup: state.popup,
//         userName: state.user
//     }
// }

// const dispatchProps = (dispatch) => {
//     return {
//         changeUserName: () => dispatch(actionUserName(dispatch))
//     }
// }

const reduxState = (state) => {
    return {
      isLoading: state.isLoading
    }
  }
  
  const reduxDispatch = (dispatch) => {
    return {
      loginAPI: (data) => dispatch(loginUserAPI(data))
    }
  }

// export default connect(stateProps, dispatchProps)(Login);
export default connect(reduxState, reduxDispatch)(Login);


// Index Dashboard

import React, { Component } from "react";
import { connect } from "react-redux";
import { addDataAPI } from "../../../config/redux/action";
import './Dashboard.scss'

class Dashboard extends Component {
  state = {
    title: '',
    content: '',
    date: ''
  }
  
  handleSaveNotes = () => {
    const { saveNotes } = this.props
    const { title, content } = this.state;
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: this.props.userData.uid
    }
    saveNotes(data)
    console.log(data)
  }

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    })
  }
  
    render() {
      const { title, content } = this.state
      
        return (
            <div className="container">
                <div className="input-form">
                <p className="judul">Dashboard Pages</p>
                <input placeholder="title" className="input-title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                <textarea placeholder="content" className="input-content" value={content} onChange={(e) => this.onInputChange(e, 'content')} >
                </textarea>
                <button className="save-btn" onClick={this.handleSaveNotes}>simpan</button>
                </div>
                <hr />
                <div className="card-container">
                    <p className="title">Title</p>
                    <p className="date">18 Feb 2022</p>
                    <p className="content">Content Notes</p>
                </div>
            </div>
        )
    }
}

const reduxState = (state) => {
  return {
    userData: state.user
  }
}

const reduxDispatch = (dispatch) => {
  return {
    saveNotes: (data) => dispatch(addDataAPI(data))
  }
}

export default connect(reduxState, reduxDispatch)(Dashboard);