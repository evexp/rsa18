import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Animated } from 'react-native';

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
            <View style={styles.welcome}>
              <Text style={styles.headline}>Bienvenido</Text>
              <Text style={styles.headline}>Welcome</Text>
              <Text style={styles.headline}>желанный</Text>
            </View>
            <View style={styles.welcome}>
              <TextInput 
                style={styles.textInput} 
                placeholder='Ingrese su código'
                placeholderTextColor='white'
                onChangeText={this.props.onChange}
                value={this.props.loginText}
                autoCorrect={false}
                underlineColorAndroid="#00000000"
                allowFontScaling={false}
                autoCapitalize="none"
              />
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
    height: '60%',
    marginTop: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  welcome: {
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
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: 'white',
    color: 'white',
    textAlign: 'center',
    fontSize: 18
  }
});

export default Login;
