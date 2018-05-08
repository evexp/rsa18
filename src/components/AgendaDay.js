import React from 'react';
import { StyleSheet, Text, RefreshControl, View, ActivityIndicator } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import FlightHeader from './FlightHeader';
import Card from './Card';
import AgendaMatch from './AgendaMatch';

class AgendaDay extends React.Component {
  
  renderDetail(rowData) {
    if (rowData.type === 'flight') {
      return <Card><FlightHeader {...rowData} /></Card>;
    }
    if (rowData.type === 'match') {
      return <AgendaMatch {...rowData} />;
    }
    return (
      <Card style={styles.agendaDay}>
        <Text style={{ color: '#212121', fontSize: 16, marginBottom: 5 }}>{rowData.title}</Text>
        <Text style={{ color: '#757575', fontSize: 14 }}>{rowData.description}</Text>
      </Card>
    );
  }

  render() {
    const { schedule } = this.props;

    return (
      <Timeline
        data={schedule}
        renderDetail={this.renderDetail}
        innerCircle={'circle'}
        circleSize={15}
        circleColor='#FF5252'
        lineColor='#FF5252'
        timeContainerStyle={{ minWidth: 50 }}
        options={{ removeClippedSubviews: false }}
      />
    );
  }

}

const styles = StyleSheet.create({
  agendaDay: {
    padding: 10
  }
});

export default AgendaDay;
