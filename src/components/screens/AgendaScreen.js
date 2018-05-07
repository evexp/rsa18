import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, ScrollView, ActivityIndicator, Platform, NetInfo } from 'react-native';
import firebase from 'firebase';
import AgendaDay from '../AgendaDay.js';

class AgendaScreen extends Component {
  constructor() {
    super();
    this.state = {
      agenda: null,
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
        firebase.database().ref(`${response}/agenda`)
          .once('value', snapshot => {
              AsyncStorage.setItem('agenda', JSON.stringify(snapshot.val()));
              this.setState({ agenda: snapshot.val() });
            });
        });
  }

  getFromStorage() {
    AsyncStorage.getItem('agenda')
    .then(response => {
      this.setState({ agenda: JSON.parse(response) });
    });
  }

  renderSpinner() {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" style={{ alignSelf: 'center' }} />
      </View>
    );
  }

  renderAgenda() {
    return (
      <ScrollView>
        {this.state.agenda.map((day, index) => (
          <View style={styles.pageContainer} key={index}>
            <Text style={styles.timeLabel}>{day.weekday} {day.day} de {day.month}</Text>
            <AgendaDay schedule={day.items} />
          </View>
        ))}
      </ScrollView>
    );
  }

  render() {
    return this.state.agenda ? this.renderAgenda() : this.renderSpinner();
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  pageContainer: {
    flex: 1,
    padding: 10,
  },
  timeLabel: {
    fontSize: 16,
    color: '#3F51B5',
    marginBottom: 10
  }
});

export default AgendaScreen;
