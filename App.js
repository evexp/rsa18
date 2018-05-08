import React from 'react';
import { Text, Platform } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import RNSplashScreen from 'react-native-splash-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './src/components/screens/HomeScreen';
import AgendaScreen from './src/components/screens/AgendaScreen';
import MyTripScreen from './src/components/screens/MyTripScreen';
import MoreScreen from './src/components/screens/MoreScreen';
import Login from './src/components/screens/Login';
import SplashScreen from './src/components/screens/SplashScreen';

Text.defaultProps.allowFontScaling = false;
console.disableYellowBox = true;

class App extends React.Component {
  componentDidMount() {
    RNSplashScreen.hide();
    const config = {
      apiKey: 'AIzaSyBh72i6uNdTBGj-j4FfG0O6DTZuXKFkeCs',
      authDomain: 'evexp-rsa2018.firebaseapp.com',
      databaseURL: 'https://evexp-rsa2018.firebaseio.com',
      projectId: 'evexp-rsa2018',
      storageBucket: 'evexp-rsa2018.appspot.com',
      messagingSenderId: '135549760815'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <SplashLoginStack />
    );
  }
}

// ROUTING - NAVIGATION

const HomeStack = StackNavigator({
  HomeRoot: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Inicio',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#3F51B5',
        borderBottomWidth: 0
      }
    }
  }
});

const AgendaStack = StackNavigator({
  AgendaRoot: {
    screen: AgendaScreen,
    navigationOptions: {
      title: 'Agenda',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#3F51B5',
        borderBottomWidth: 0
      }
    }
  }
});

const MyTripStack = StackNavigator({
  MyTripRoot: {
    screen: MyTripScreen,
    navigationOptions: {
    title: ' Mi Viaje ',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#3F51B5',
        borderBottomWidth: 0
      }
    }
  }
});

const MoreStack = StackNavigator({
  MoreRoot: {
    screen: ({ screenProps }) =>
      <MoreScreen screenProps={{ rootNavigation: screenProps.rootNavigation }} />,
    navigationOptions: {
      title: 'Más',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#3F51B5',
        borderBottomWidth: 0
      }
    }
  }
});

const TabNav = TabNavigator(
  {
    Inicio: { screen: HomeStack },
    Agenda: { screen: AgendaStack },
    MiViaje: { screen: MyTripStack },
    Más: { screen: ({ screenProps }) =>
      <MoreStack screenProps={{ rootNavigation: screenProps.rootNavigation }} />
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (Platform.OS === 'ios') {
          if (routeName === 'Inicio') {
            iconName = `ios-home${focused ? '' : '-outline'}`;
          } else if (routeName === 'Agenda') {
            iconName = `ios-list-box${focused ? '' : '-outline'}`;
          } else if (routeName === 'MiViaje') {
            iconName = `ios-briefcase${focused ? '' : '-outline'}`;
          } else if (routeName === 'Más') {
            iconName = `ios-menu${focused ? '' : '-outline'}`;
          }
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        }
        if (routeName === 'Inicio') {
          iconName = 'home';
        } else if (routeName === 'Agenda') {
          iconName = 'format-list-bulleted';
        } else if (routeName === 'MiViaje') {
          iconName = 'work';
        } else if (routeName === 'Más') {
          iconName = 'menu';
        }
        return <MaterialIcons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#B0B0B0',
      style: {
        backgroundColor: '#3F51B5',
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

const SplashLoginStack = StackNavigator(
  {
    Splash: {
      screen: SplashScreen
    },
    Login: {
      screen: Login
    },
    HomeRoutes: {
      screen: ({ navigation }) =>
        <TabNav screenProps={{ rootNavigation: navigation }} />
    }
  },
  {
    headerMode: 'none',
    gesturesEnabled: false
  }
);

export default App;
