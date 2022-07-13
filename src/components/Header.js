import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component{
    render(){
        return (
            <div className="ui secondary menu headerMenu">
                <Link to="/" className="browse item">
                    <h3>Menu Information</h3>
                </Link>
                <Link to="/order" className="browse item">
                    <h3>Make Order</h3>
                </Link>
            </div>
        )
    }
}

export default Header;