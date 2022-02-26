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
            
            localStorage.setItem('userData', JSON.stringify(res))
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