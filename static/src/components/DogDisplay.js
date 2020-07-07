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

const style = {
    marginTop: 50,
    paddingBottom: 50,
    paddingTop: 25,
    width: '50%',
    textAlign: 'center',
    display: 'inline-block',
};


@connect(mapStateToProps, mapDispatchToProps)
export default class DogDisplay extends React.Component { // eslint-disable-line react/prefer-stateless-function

	componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const token = this.props.token;
        this.props.fetchProtectedDogData(token);
    }

    deleteDog() {
        const token = this.props.token;
    }

	render() {
            // console.log(this.props.test_data);
            console.log(this.props.data.dogs.length<50);
              return (
                <div>
                {this.props.data.dogs.length==0
                  ? <h1> you got no dogs...</h1>
                    :
                    <div>
                    <h1>Your dogs</h1> 
                    {this.props.data.dogs.map(i=> (
                            <Paper style={style} elevation={3} key={i.id}>
                            <p>Name: {i.name}</p>
                            <p> Breed: {i.breed}</p>
                            <div>
                            <button>Delete</button>
                            </div>
                            </Paper> 
                            
                    ))}
                    </div>
   
                }
                </div>
                
              );
            
          }
      }

	DogDisplay.propTypes = {
    fetchProtectedDogData: React.PropTypes.func,
    deleteDog: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    userName: React.PropTypes.string,
    data: React.PropTypes.any,
    dogs: React.PropTypes.any,
    token: React.PropTypes.string,
};




