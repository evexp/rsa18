import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Animated, TouchableOpacity } from 'react-native';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      fadeAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000
      }
    ).start();
  }

  render() {
    return (
      <Animated.View style={[styles.container, { opacity: this.state.fadeAnim }]}>
        <View style={styles.backdropView}>
          <KeyboardAvoidingView style={styles.content} behavior="padding" enabled>
            {this.props.showWelcome && <View style={styles.welcome}>
              <Text style={styles.headline}>Bienvenido</Text>
              <Text style={styles.headline}>Welcome</Text>
              <Text style={styles.headline}>желанный</Text>
            </View>}
            <View style={styles.loginContainer}>
              {this.props.showWrongMsg && <Text style={styles.wrongText}>Usuario y contraseña incorrectos. Intente de nuevo.</Text>}
              <TextInput 
                style={styles.textInput} 
                placeholder='Usuario'
                placeholderTextColor='white'
                onChangeText={this.props.onChangeUser}
                value={this.props.userText}
                autoCorrect={false}
                underlineColorAndroid="#00000000"
                allowFontScaling={false}
                autoCapitalize="none"
              />
              <TextInput 
                style={[styles.textInput, { marginTop: 10 }]} 
                placeholder='Contraseña'
                placeholderTextColor='white'
                onChangeText={this.props.onChangePass}
                value={this.props.passText}
                autoCorrect={false}
                underlineColorAndroid="#00000000"
                allowFontScaling={false}
                autoCapitalize="none"
                secureTextEntry
              />
              <TouchableOpacity onPress={this.props.onPressButton} style={styles.buttonTouchable}>
                  <Text style={styles.buttonText}>Ingresar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backdropView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    width: '80%',
    height: '80%',
    marginTop: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
  },
  headline: {
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  },
  textInput: {
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'white',
    color: 'white',
    fontSize: 18
  },
  buttonTouchable: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: '#FF5252',
    borderRadius: 50
  },
  wrongText: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18
  }
});

export default Login;
