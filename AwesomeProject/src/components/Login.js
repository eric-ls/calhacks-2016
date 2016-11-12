import React, { Component } from 'react'
import { View,
         Text,
         StyleSheet,
         Image }
from 'react-native'
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  _handlePress = () => {
    Actions.home({});
  }

  _setLoggedIn = (value) => {
    this.setState({ loggedIn: value });
  }

  render() {
    var _this = this;
    let loginBtn =
      <FBLogin style={{ marginBottom: 50, }}
          ref={(fbLogin) => { this.fbLogin = fbLogin }}
          permissions={["email","user_friends"]}
          loginBehavior={FBLoginManager.LoginBehaviors.Native}
          onLogin={function(data){
            _this.setState({ user : data.credentials });
            _this._setLoggedIn(true);
            // _this._handlePress();
          }}
          onLogout={function(){
            _this._setLoggedIn(false);
            _this.setState({ user : null });
          }}
          onLoginFound={function(data){
            _this._setLoggedIn(true);
            _this.setState({ user : data.credentials });
          }}
          onLoginNotFound={function(){
            _this._setLoggedIn(false);
            _this.setState({ user : null });
          }}
          onError={function(data){
            console.log("ERROR");
            console.log(data);
          }}
          onCancel={function(){
            console.log("User cancelled.");
          }}
          onPermissionsMissing={function(data){
            console.log("Check permissions!");
            console.log(data);
          }} />

    let profile;
    if (this.state.loggedIn) {
      profile = <UserProfile
                  name={"Eric Liang"}
                  location={"Berkeley, CA"} />
    } else {
      profile = <Text style={{marginBottom: 20,}}>Please log in!</Text>
    }

    return (
      <View style={s.loginContainer}>
        <Text style={s.loginTitle}>Elephant Meets Donkey</Text>
        {profile}
        {loginBtn}
        <Button
          disabled={!this.state.loggedIn}
          styleDisabled={{opacity: 0.4}}
          containerStyle={s.buttonContainerStyle}
          style={s.buttonTextStyle}
          onPress={this._handlePress}
          >Continue</Button>
      </View>
    );
  }
}

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={s.profileContainer}>
        <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
       style={{width: 150, height: 150, marginBottom: 20,}} />
        <Text style={{textAlign: 'center', fontWeight: '700'}}>{this.props.name}</Text>
        <Text style={{textAlign: 'center'}}>{this.props.location}</Text>
      </View>
    )
  }
}

const s = StyleSheet.create({
  loginContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 100,
  },
  loginTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
  },
  loginButton: {
    marginTop: 50,
    marginBottom: 100,
  },
  profileContainer: {
    flex: 2,
  },
  buttonContainerStyle: {
    padding: 10,
    borderRadius: 2,
    backgroundColor: '#8E44AD',
    overflow: 'hidden',
    marginBottom: 10,
    alignSelf: 'stretch',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  buttonTextStyle: {
    fontSize: 20,
    color: 'white',
  }
})