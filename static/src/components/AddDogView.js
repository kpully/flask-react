/* eslint camelcase: 0, no-underscore-dangle: 0 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import * as actionCreators from '../actions/data';



function mapStateToProps(state) {
	return {
		data: state.data,
		token: state.auth.token
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch)
}

const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
};


@connect(mapStateToProps, mapDispatchToProps)
export default class AddDogView extends React.Component {
	constructor(props) {
		super(props);
		const redirectRoute='/main';
		this.state= {
			breed:"",
			name:"",
			user_id:"",
			redirectTo: redirectRoute,
			image:null
		};
	}

changeValue(e,type) {
	const value=e.target.value;
	const next_state={};
	next_state[type]=value;
	this.setState(next_state, () => {
		
	});
}

componentDidMount() {
        this.fetchData();
        // console.log(this.props.userName)
    }


_handleKeyPress(e) {
	if (e.key==="Enter") {
			this.save(e);
	}
}

fetchData() {
        const token = this.props.token;
        this.props.fetchProtectedData(token);
    }

save(e) {
	e.preventDefault();
	this.props.registerDog(this.state.breed,this.state.name, this.props.data.data.id, this.state.image, this.state.redirectTo);
}

render() {
	return (
		<div className="col-md-6 col-md-offset-3" onKeyPress={(e) => this._handleKeyPress(e)}>
			<Paper style={style}>
				<div className="text-center">
					<h2>Add your dog</h2>
					{
						this.props.registerStatusText &&
						<div className="alert alert-info">
						{this.props.registerStatusText}
						</div>
					}

					<div className="col-md-12">
                            <TextField
                              hintText="Name"
                              floatingLabelText="Name"
                              type="name"
                              onChange={(e) => this.changeValue(e, 'name')}
                            />
                        </div>

                       <div className="col-md-12">
                            <TextField
                              hintText="Breed"
                              floatingLabelText="Breed"
                              type="breed"
                              onChange={(e) => this.changeValue(e, 'breed')}
                            />
                        </div>

                        <div className="col-md-12">
                        <input type='file' accept="image/*" onChange={(e)=>this.changeValue(e, 'image')}  />
                        </div>

					<RaisedButton
                          disabled={this.state.disabled}
                          style={{ marginTop: 50 }}
                          label="Save"
                          onClick={(e) => this.save(e)}
                        />
                        </div>
                        </Paper>
                        </div>

		);
	}

}

AddDogView.propTypes = {
	registerDog: React.PropTypes.func,
	registerStatusText: React.PropTypes.string,
	userName: React.PropTypes.string,
    data: React.PropTypes.any,
    token: React.PropTypes.string,
};