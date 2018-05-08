import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, AsyncStorage, Platform, NetInfo } from 'react-native';
import firebase from 'firebase';
import FlightCard from '../FlightCard';
import NoConnectionScreen from './NoConnectionScreen';

class FlightScreen extends Component {
  constructor() {
    super();
    this.state = {
      flights: null,
      loading: true,
      error: false
    };
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      fetch('https://www.google.com')
      .then(() => {
        this.getFromFirebase();
      })
      .catch(() => {
        this.getFromStorage();
      });
    } else { 
      NetInfo.isConnected.fetch().done(isConnected => {
        if (isConnected) {
          this.getFromFirebase();
        } else {
          this.getFromStorage();
        }
      });
    }
  }

  getFromFirebase() {
    AsyncStorage.getItem('loginCode')
      .then(response => {
        firebase.database().ref(`${response}/flights`)
          .once('value', snapshot => {
              AsyncStorage.setItem('flights', JSON.stringify(snapshot.val()));
              this.setState({ flights: snapshot.val(), loading: false });
            });
        });
  }

  getFromStorage() {
    AsyncStorage.getItem('flights')
    .then(response => {
      if (response) {
        this.setState({ flights: JSON.parse(response), loading: false });
      } else {
        this.setState({ error: true, loading: false });
      }
    });
  }

  renderSpinner() {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" style={{ alignSelf: 'center' }} />
      </View>
    );
  }

  renderFlights() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#F8F8F8' }}>
        <View style={styles.pageContainer}>
          {this.state.flights.map((flight, idx) => <FlightCard {...flight} key={idx} />)}
        </View>
      </ScrollView>
    );
  }

  renderError() {
    return <NoConnectionScreen />;
  }

  render() {
    if (this.state.loading) {
      return this.renderSpinner();
    }
    if (this.state.error) {
      return this.renderError();
    }
    return this.renderFlights();
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 10
  }
});

export default FlightScreen;
