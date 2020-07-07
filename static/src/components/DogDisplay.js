import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/data';

function mapStateToProps(state) {
    return {
    	data: state.data,
        token: state.auth.token,
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
        dog: state.dog
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class DogDisplay extends React.Component { // eslint-disable-line react/prefer-stateless-function

	componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        const token = this.props.token;
        this.props.fetchProtectedDogData(token);
        console.log("after fetch");
        console.log(this.props.data.dog)

    }

	render() {
	        return (
	            <div className="col-md-8">
	                <h1>Dog Display</h1>
	                <h1>{this.props.data.dog}!</h1>
	                <hr />
	            </div>
	        );
	    }
	}

	DogDisplay.propTypes = {
    fetchProtectedDogData: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    userName: React.PropTypes.string,
    data: React.PropTypes.any,
    dog: React.PropTypes.any,
    token: React.PropTypes.string,
};




