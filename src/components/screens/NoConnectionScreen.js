import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const noConnectionImg = require('../../assets/cloud-computing.png');

const NoConnectionScreen = ({ white }) => (
  <View style={styles.container}>
    <Image source={noConnectionImg} style={styles.img} />
    <View style={styles.textContainer}>
      <Text style={white ? styles.textTitleWhite : styles.textTitle}>Oh no!</Text>
      <Text style={white ? styles.textSubtitleWhite : styles.textSubtitle}>Se ha perdido la conexión a Internet.</Text>
      <Text style={white ? styles.textSubtitleWhite : styles.textSubtitle}>Revise su conexión y vuelva a intentarlo.</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  img: { 
    height: '30%', 
    width: '80%', 
    resizeMode: 'contain'
  },
  textContainer: { 
    marginTop: 25, 
    alignItems: 'center' 
  },
  textTitle: { 
    fontSize: 30, 
    color: '#757575' 
  },
  textTitleWhite: { 
    fontSize: 30, 
    color: '#FFFFFF' 
  },
  textSubtitle: { 
    marginTop: 15, 
    fontSize: 16, 
    color: '#757575' 
  },
  textSubtitleWhite: { 
    marginTop: 15,
    fontSize: 16,
    color: '#FFFFFF' 
  },
});

export default NoConnectionScreen;
