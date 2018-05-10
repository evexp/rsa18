import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, AsyncStorage, Platform, NetInfo } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'firebase';
import Login from './Login';
import ConnectionError from './ConnectionError';

const splashImg = require('../../assets/splash_russia_background.jpg');

class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: false,
      showConnectionError: false,
      showWrongMsg: false,
      loginText: '',
      loginCodes: []
    };
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      fetch('https://www.google.com')
      .then(() => {
        this.checkLoginCode();
      })
      .catch(() => {
        console.log('no internet');
        this.checkLoginCode(false);
      });
    } else { 
      NetInfo.isConnected.fetch().done(isConnected => {
        if (isConnected) {
          this.checkLoginCode();
        } else {
          console.log('no internet');
          this.checkLoginCode(false);
        }
      });
    }
  }

  checkForInternet(successCB, failCB) {
    console.log(successCB, failCB);
  }

  fetchLoginCodesFromFirebase(hasInternet) {
    if (hasInternet) {
      firebase.database().ref('/')
        .once('value', snapshot => {
          this.setState({ loginCodes: Object.keys(snapshot.val()), showLogin: true });
        });
    } else {
      console.log('no internet');
      this.setState({ showConnectionError: true });
    }
  }

  checkLoginCode(hasInternet = true) {
    AsyncStorage.getItem('loginCode').then(response => {
      if (response) {
        this.resetNavigation('HomeRoutes');
      } else {
        this.fetchLoginCodesFromFirebase(hasInternet);
      }
    });
  }

  onChangeLoginText(text) {
    this.setState({ loginText: text });
  }

  onPressButton() {
    this.checkLoginText();
  }
  
  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: targetRoute }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }
 
  async checkLoginText() {
    if (this.state.loginCodes.includes(this.state.loginText)) {
      try {
        await AsyncStorage.setItem('loginCode', this.state.loginText);
        this.resetNavigation('HomeRoutes');
      } catch (error) {
        console.log('Error setting item in AsyncStorage');
      }
    } else {
      this.setState({ showWrongMsg: true });
    }
  }

  render() {
    return (
      <View>
        <ImageBackground
          style={styles.backdrop} 
          source={splashImg}
        >
          <View style={styles.backdropView}>
            {this.state.showConnectionError && <ConnectionError />}
            {this.state.showLogin && <Login showWrongMsg={this.state.showWrongMsg} onChange={this.onChangeLoginText.bind(this)} loginText={this.state.loginText} onPressButton={this.onPressButton.bind(this)} />}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

export default SplashScreen;
