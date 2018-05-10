import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import NoConnectionScreen from './NoConnectionScreen';

class ConnectionError extends Component {
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
        <NoConnectionScreen white />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  backdropView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    height: '30%', 
    width: '60%', 
    resizeMode: 'contain'
  }
});

export default ConnectionError;
