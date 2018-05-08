import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage, Image, Platform, TouchableOpacity, ActivityIndicator, Linking, NetInfo } from 'react-native';
import { NavigationActions } from 'react-navigation';
import call from 'react-native-phone-call';
import firebase from 'firebase';
import Card from '../Card';
import NoConnectionScreen from './NoConnectionScreen';

const hospitalIcon = require('../../assets/hospital_black.png');
const mailIcon = require('../../assets/mail_black.png');

class MoreScreen extends Component {
  constructor() {
    super();
    this.state = {
      more: null,
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
    AsyncStorage.getItem('loginCode')
      .then(response => {
        firebase.database().ref(`${response}/more`)
          .once('value', snapshot => {
              AsyncStorage.setItem('more', JSON.stringify(snapshot.val()));
              this.setState({ more: snapshot.val(), loading: false });
            });
        });
  }

  getFromStorage() {
    AsyncStorage.getItem('more')
    .then(response => {
      if (response) {
        this.setState({ more: JSON.parse(response), loading: false });
      } else {
        this.setState({ loading: false, error: true });
      }
    });
  }

  onPressJoinWhatsapp() {
    Linking.openURL(this.state.more.whatsapp).catch(console.error);
  }

  onPressCallInsurance() {
    call({ number: this.state.more.insuranceNumber, prompt: false }).catch(console.error);
  }

  onPressWebInsurance() {
    Linking.openURL(this.state.more.insuranceWeb).catch(console.error);
  }

  onPressMailAgency() {
    Linking.openURL(`mailto:${this.state.more.agencyMail}`).catch(console.error);
  }

  onPressClosestHospital() {
    Linking.openURL('https://www.google.com/maps/search/?api=1&query=hospital').catch(console.error);
  }

  onPressLogout() {
    AsyncStorage.multiRemove(['loginCode', 'home', 'logos']);
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Splash' }),
      ]
    });
    this.props.screenProps.rootNavigation.dispatch(resetAction);
  }

  renderSpinner() {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" style={{ alignSelf: 'center' }} />
      </View>
    );
  }

  renderContent() {
    const buttonColor = Platform.OS === 'ios' ? '#3F51B5' : '#FF5252';
    const whatsappLogo = { uri: 'https://seeklogo.com/images/W/whatsapp-logo-33F6A82887-seeklogo.com.png' };
    const emergencyLogo = { uri: 'https://cdn0.iconfinder.com/data/icons/education-collection-2/32/emergency_cross_contacts_circle_online-512.png' };
    const infoLogo = { uri: 'https://cdn4.iconfinder.com/data/icons/defaulticon/icons/png/256x256/info.png' };
    
    return (
      <View style={{ padding: 10 }}>
        <Card>
          <TouchableOpacity onPress={this.onPressJoinWhatsapp.bind(this)}>
            <View style={styles.rowContent}>
              <Image source={whatsappLogo} style={styles.icon} />
              <View>
                <Text style={styles.contentTitle}>Unite al grupo de WhatsApp</Text>
                <Text style={styles.contentSubtitle}>Compartí todo el viaje con tu grupo</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity onPress={this.onPressCallInsurance.bind(this)}>
            <View style={styles.rowContent}>
              <Image source={emergencyLogo} style={styles.icon} />
              <View>
                <Text style={styles.contentTitle}>Contacto de Emergencia</Text>
                <Text style={styles.contentSubtitle}>Llamada directa a tu Asistencia al Viajero</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Card>

        <Card style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={this.onPressWebInsurance.bind(this)}>
            <View style={styles.rowContent}>
              <Image source={infoLogo} style={styles.icon} />
              <View>
                <Text style={styles.contentTitle}>Asistencia Médica</Text>
                <Text style={styles.contentSubtitle}>Toda la información acerca de tu cobertura</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressMailAgency.bind(this)}>
            <View style={styles.rowContent}>
              <Image source={mailIcon} style={styles.icon} />
              <View>
                <Text style={styles.contentTitle}>Contactá la Agencia</Text>
                <Text style={styles.contentSubtitle}>Envianos un mail con lo que necesites</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressClosestHospital.bind(this)}>
            <View style={styles.rowContent}>
              <Image source={hospitalIcon} style={styles.icon} />
              <View>
                <Text style={styles.contentTitle}>Hospital más cercano</Text>
                <Text style={styles.contentSubtitle}>Mapa de hospitales de la zona</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Card>
        <View style={{ marginTop: Platform.OS === 'ios' ? 20 : 15 }}>
          <Button
            onPress={this.onPressLogout.bind(this)}
            title="Logout"
            color={buttonColor}
          />
        </View>
      </View>
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
    return this.renderContent();
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  rowContent: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start',
    padding: 10
  },
  icon: {
    height: 30,
    width: 30, 
    resizeMode: 'cover', 
    marginRight: 20
  },
  contentTitle: { 
    fontSize: 15, 
    color: '#212121'
  },
  contentSubtitle: {
    fontSize: 14, 
    color: '#757575' 
  },
  separator: { 
    height: 1,
    width: '95%', 
    backgroundColor: '#BDBDBD', 
    alignSelf: 'center' 
  }
});

export default MoreScreen;
