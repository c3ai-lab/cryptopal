import React from "react";
import "./Box.css"

class Box extends React.Component {

    render () {
        return( 
        <div className="box-wrapper">
            {this.props.children}
        </div>
        );
    }
}

export default Box;