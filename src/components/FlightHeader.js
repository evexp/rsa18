import React from 'react';
import { StyleSheet, View, Text, Image, Platform } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

const planeIcon = require('../assets/plane_white.png');

const FlightHeader = ({ origin, originCity, destination, destinationCity, airline, flightNumber, backdropURL }) => {
  const { container, backgroundImage, contentContainer, origDestContainer, lowContainer, origDestText, origDestCityText, airlineText, flightNumberText } = styles;
  
  return (
    <View style={container}>
      <Image source={{ uri: backdropURL }} style={backgroundImage} />
      <View style={contentContainer}>
        <View style={origDestContainer}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={origDestText}>{origin}</Text>
            <Text style={origDestCityText}>{originCity}</Text>
          </View>
          <Image source={planeIcon} style={{ height: 26, width: 26 }} />
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={origDestText}>{destination}</Text>
            <Text style={origDestCityText}>{destinationCity}</Text>
          </View>
        </View>
        <View style={lowContainer}>
          <Text style={airlineText}>{airline}</Text>
          <Text style={flightNumberText}>{flightNumber}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(100)
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  contentContainer: {
    backgroundColor: '#00000088',
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  origDestContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 3,
    marginLeft: 10,
    marginRight: 10
  },
  lowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  origDestText: {
    color: 'white',
    fontSize: scale(32),
    fontWeight: '200',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
  },
  origDestCityText: {
    color: 'white',
    fontSize: scale(12),
    fontWeight: '200',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
  },
  airlineText: {
    color: 'white',
    marginRight: 4
  },
  flightNumberText: {
    color: 'white',
    fontWeight: 'bold',
    width: scale(60)
  }
});

export default FlightHeader;
