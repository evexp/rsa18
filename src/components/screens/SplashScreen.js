import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, AsyncStorage, Platform, NetInfo, Keyboard } from 'react-native';
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
      showWelcome: true,
      passText: '',
      userText: '',
      loginCodes: null
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      Keyboard.addListener('keyboardDidShow', this.keyboardShow.bind(this));
      Keyboard.addListener('keyboardDidHide', this.keyboardHide.bind(this));
    }
    if (Platform.OS === 'ios') {
      fetch('https://www.google.com')
      .then(() => {
        this.checkLoginCode();
      })
      .catch(() => {
        this.checkLoginCode(false);
      });
    } else { 
      NetInfo.isConnected.fetch().done(isConnected => {
        if (isConnected) {
          this.checkLoginCode();
        } else {
          this.checkLoginCode(false);
        }
      });
    }
  }

  keyboardShow() {
    this.setState({ showWelcome: false });
  }

  keyboardHide() {
    this.setState({ showWelcome: true });
  }

  fetchLoginCodesFromFirebase(hasInternet) {
    if (hasInternet) {
      firebase.database().ref('/codes')
        .once('value', snapshot => {
          this.setState({ loginCodes: snapshot.val(), showLogin: true });
        });
    } else {
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

  onChangeUserText(text) {
    this.setState({ userText: text });
  }

  onChangePassText(text) {
    this.setState({ passText: text });
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
    if (this.state.loginCodes[this.state.userText] && this.state.loginCodes[this.state.userText] === this.state.passText) {
      try {
        await AsyncStorage.setItem('loginCode', this.state.userText);
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
            {this.state.showLogin && <Login showWelcome={this.state.showWelcome} showWrongMsg={this.state.showWrongMsg} onChangeUser={this.onChangeUserText.bind(this)} userText={this.state.userText} onChangePass={this.onChangePassText.bind(this)} passText={this.state.passText} onPressButton={this.onPressButton.bind(this)} />}
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
