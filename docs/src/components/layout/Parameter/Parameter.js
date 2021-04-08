import React from "react";
import "./Parameter.css"

class Parameter extends React.Component {

    render () {
        return( 
            <div className="parameter-wrapper">
                <div>
                    <span className="parameter-name">{this.props.name}</span>
                    <span className="parameter-type">{this.props.type}</span>
                    {this.props.required ?
                    <span className="parameter-required">required</span>
                    : null}
                </div>
                <span className="parameter-description">{this.props.description}</span>

                {/* Show Min value */}
                {this.props.minValue ?
                <div>
                    <span className="parameter-restrictions">Minimum value:</span>
                    <span className="parameter-restrictions-value">{this.props.minValue}</span>
                </div>
                : null}

                {/* Show Max value */}
                {this.props.maxValue ?
                <div>
                    <span className="parameter-restrictions">Maximum value:</span>
                    <span className="parameter-restrictions-value">{this.props.maxValue}</span>
                </div>
                : null}

                {/* Show Min length */}
                {this.props.minLength ?
                <div>
                    <span className="parameter-restrictions">Minimum length:</span>
                    <span className="parameter-restrictions-value">{this.props.minLength}</span>
                </div>
                : null}

                {/* Show Max length */}
                {this.props.maxLength ?
                <div>
                    <span className="parameter-restrictions">Maximum length:</span>
                    <span className="parameter-restrictions-value">{this.props.maxLength}</span>
                </div>
                : null}

                {/* Show Pattern */}
                {this.props.pattern ?
                <div>
                    <span className="parameter-restrictions">Pattern:</span>
                    <span className="parameter-restrictions-value">{this.props.pattern}</span>
                </div>
                : null}

                {/* Show Read only */}
                {this.props.readonly ?
                <div>
                    <span className="parameter-restrictions">Read only</span>
                </div>
                : null}
            </div>
        );
    }
}

export default Parameter;