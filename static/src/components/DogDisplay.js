import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/data';
import Paper from 'material-ui/Paper';
// import Box from '@material-ui/Core/Box';


function mapStateToProps(state) {
    return {
    	data: state.data,
        token: state.auth.token,
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
        dogs: state.dogs
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

var test_data=[
    {breed:'station one',name:'000',id:1},
    {breed:'station one',name:'000',id:2},
];

@connect(mapStateToProps, mapDispatchToProps)
export default class DogDisplay extends React.Component { // eslint-disable-line react/prefer-stateless-function

	componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const token = this.props.token;
        // console.log("fetch dog data")
        this.props.fetchProtectedDogData(token);
    }

	render() {
            // console.log(this.props.test_data);
              return (
                <div>
                <h1>Dog Display</h1>
                  {this.props.data.dogs.map(i=> (
                  
                    <Paper elevation={3} key={i.id}>{i.breed}</Paper>
                    
                    ))}
                </div>

              );
            
          }
      }

	DogDisplay.propTypes = {
    fetchProtectedDogData: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    userName: React.PropTypes.string,
    data: React.PropTypes.any,
    dogs: React.PropTypes.any,
    token: React.PropTypes.string,
};




