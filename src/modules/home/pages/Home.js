import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLogin } from '../actions/userActions';

const mapStateToDispatch = dispatch => bindActionCreators({ userLogin }, dispatch);

@connect(
  state => {
    return {
      userInfo: state.userInfo
    };
  },
  mapStateToDispatch
)
export default class Home extends React.Component {
  static asyncData(store, match) {
    console.log(match);
    const { userLogin } = mapStateToDispatch(store.dispatch);
    userLogin({
      age: 18
    });
    userLogin({
      age: 20
    });
  }

  addUserInfo = () => {
    this.props.userLogin({
      age: 18
    });
  };
  render() {
    console.log(this.props.userInfo);
    return (
      <div>
        <button onClick={this.addUserInfo}>Add User Info</button>
        Home page
      </div>
    );
  }
}
