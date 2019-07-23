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
  static asyncData(store, match, browserData) {
    const { userLogin } = mapStateToDispatch(store.dispatch);
    return Promise.all([
      userLogin({
        country: 'china'
      }),
      userLogin({
        age: 20
      })
    ]);
  }

  addUserInfo = () => {
    this.props.userLogin({
      age: 18
    });
  };
  render() {
    console.log(this.props);
    console.log(process.env);
    return (
      <div>
        <button onClick={this.addUserInfo}>Add User Info</button>
        Home page
      </div>
    );
  }
}
