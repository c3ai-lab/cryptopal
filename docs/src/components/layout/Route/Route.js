import React from "react";
import "./Route.css"

class Route extends React.Component {

    render () {
        return( 
        <div className="route-wrapper">
            <div className="route-badge">{this.props.method}</div>
            <span className="route-path">{this.props.path}</span>
        </div>
        );
    }
}

export default Route;