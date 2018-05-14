import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import Card from './Card';
import FlightHeader from './FlightHeader';
import FlightColumn from './FlightColumn';

const FlightCard = (props) => {
  const { airline, arrival, departure, backdropURL, cabin, destination, destinationCity, origin, originCity, flightNumber, plane, duration } = props;
  const dataForHeader = { origin, originCity, destination, destinationCity, airline, flightNumber, backdropURL };

  return (
    <Card style={{ marginBottom: 20 }}>
      <FlightHeader {...dataForHeader} />
      <View style={styles.columnContainer}>
        <FlightColumn {...departure} />
        <View style={styles.middleColumnContainer}>
          <Text style={styles.middleText}>{duration}</Text>
          <View style={styles.middleLine} />
          <Text style={styles.middleText}>DURACIÓN</Text>
        </View>
        <FlightColumn isLanding {...arrival} />
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.textColumn}>
          <Text style={styles.footerField}>Avion</Text>
          <Text style={styles.footerValue}>{plane}</Text>
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.footerField}>Cabina</Text>
          <Text style={styles.footerValue}>{cabin}</Text>
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.footerField}>Operado por</Text>
          <Text style={styles.footerValue}>{airline}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  columnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingLeft: 6,
    paddingRight: 6
  },
  middleColumnContainer: {
    alignSelf: 'center',
    marginLeft: 6,
    marginRight: 6,
    marginTop: 16
  },
  middleText: {
    color: '#3F51B5',
    textAlign: 'center',
    fontSize: 10
  },
  middleLine: {
    backgroundColor: '#3F51B5',
    height: 2,
    marginTop: 2,
    marginBottom: 2
  },
  footerContainer: {
    backgroundColor: '#EFEFEF',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: verticalScale(50),
    marginTop: 8
  },
  footerField: {
    color: '#888888',
    fontSize: 12
  },
  footerValue: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold'
  }
});

export default FlightCard;
