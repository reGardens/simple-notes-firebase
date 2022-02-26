import React, { Component } from "react";
import { getAuth } from "firebase/auth";
import './Register.scss';
import Button from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action";

class Register extends Component {
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
    

    handelChangeSubmit = async () => {
        // console.log(this.state.email)
        // console.log(this.state.password)
        const {email, password} = this.state;
        const auth = getAuth();
        const res = await this.props.registerAPI({email: email, password: password, auth: auth}).catch(err => err)
        if (res) {
          this.setState({
            email: '',
            password: ''
          })
        }
    }
    
  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Register Pages</p>
          <input type="text" className="input" id="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} />
          <input type="password" className="input" id="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} />
          <Button onClick={this.handelChangeSubmit} title="Register" loading={this.props.isLoading} />
        </div>
        {/* <button>Go to Dahhboard</button> */}
      </div>
    );
  }
}

const reduxState = (state) => {
  return {
    isLoading: state.isLoading
  }
}

const reduxDispatch = (dispatch) => {
  return {
    registerAPI: (data) => dispatch(registerUserAPI(data))
  }
}

export default connect(reduxState, reduxDispatch)(Register);
