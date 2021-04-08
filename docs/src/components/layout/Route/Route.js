import React from "react";
import "./Route.css"

class Route extends React.Component {

    render () {
        let badgeColor;
        switch(this.props.method){
            case "GET":
                badgeColor = "route-badge-get"
                break;
            case "POST":
                badgeColor = "route-badge-post"
                break;
            case "PATCH":
                badgeColor = "route-badge-patch"
                break;
            case "DELETE":
                badgeColor = "route-badge-delete"
                break;
            default:
                break;
        }
        return( 
        <div className="route-wrapper">
            <div className={"route-badge " + badgeColor}>{this.props.method}</div>
            <span className="route-path">{this.props.path}</span>
        </div>
        );
    }
}

export default Route;