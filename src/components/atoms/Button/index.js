import React from "react";

const Button = ({title, onClick, loading}) => {
    if(loading === true) {
        return <button className="btn disable">Loading ...</button>
    }
    return (
        <button className="btn" onClick={onClick}>{title}</button>
    )
}

export default Button;