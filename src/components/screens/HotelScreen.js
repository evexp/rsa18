import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, AsyncStorage, ActivityIndicator, Platform, NetInfo } from 'react-native';
import firebase from 'firebase';
import HotelCard from '../HotelCard';
import NoConnectionScreen from './NoConnectionScreen';

class HotelScreen extends Component {
  constructor() {
    super();
    this.state = {
      hotels: null,
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
        firebase.database().ref(`${response}/hotels`)
          .once('value', snapshot => {
              AsyncStorage.setItem('hotels', JSON.stringify(snapshot.val()));
              this.setState({ hotels: snapshot.val(), loading: false });
            });
        });
  }

  getFromStorage() {
    AsyncStorage.getItem('hotels')
    .then(response => {
      if (response) {
        this.setState({ hotels: JSON.parse(response), loading: false });
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

  renderHotels() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageContainer}>
          {this.state.hotels.map((hotel, idx) => <HotelCard {...hotel} key={idx} />)}
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
    return this.renderHotels();
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  pageContainer: {
    padding: 10,
  }
});

export default HotelScreen;
