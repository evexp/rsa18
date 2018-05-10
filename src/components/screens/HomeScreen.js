import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, AsyncStorage, NetInfo, Platform } from 'react-native';
import firebase from 'firebase';
import NoConnectionScreen from './NoConnectionScreen';
import NewsList from '../NewsList';
import MatchCard from '../MatchCard';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      match: null,
      news: null,
      logos: null,
      error: false,
      loading: true
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
    firebase.database().ref('home')
      .once('value', snapshot => {
        AsyncStorage.setItem('home', JSON.stringify(snapshot.val()));
        AsyncStorage.getItem('loginCode')
        .then(response => {
          firebase.database().ref(`${response}/logos`)
            .once('value', snap => {
              if (Array.isArray(snap.val())) {
                AsyncStorage.setItem('logos', JSON.stringify(snap.val()));
                this.setState({ logos: snap.val(), loading: false, match: snapshot.val().match, news: snapshot.val().news });
              } else {
                this.setState({ logos: null, loading: false, match: snapshot.val().match, news: snapshot.val().news });
              }
            });
          });
      });
  }

  getFromStorage() {
    AsyncStorage.getItem('home')
    .then(response => {
      if (response) {
        const parsed = JSON.parse(response);
        AsyncStorage.getItem('logos')
        .then(res => {
          if (res) {
            this.setState({ logos: JSON.parse(res), match: parsed.match, news: parsed.news, loading: false });
          } else {
            this.setState({ match: parsed.match, news: parsed.news, loading: false });
          }
        });
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

  renderHome() {
    return (
      <ScrollView>
        <View style={styles.pageContainer}>
          {this.state.logos &&
          <View style={styles.logosContainer}>
            {this.state.logos.map(logo => (
              <Image source={{ uri: logo }} style={styles.logoImage} />)
            )}
          </View>
          }
          <Text style={styles.title}>Próximo partido</Text>
          <MatchCard {...this.state.match} />
          <Text style={styles.title}>Noticias</Text>
          <NewsList news={this.state.news} />
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
    return this.renderHome();
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  pageContainer: {
    flex: 1,
    padding: 10
  },
  logosContainer: {
    flexDirection: 'row',
    height: 32,
    marginBottom: 6,
    alignItems: 'center'
  },
  logoImage: {
    height: '100%',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F51B5',
    marginTop: 6
  }
});

export default HomeScreen;
