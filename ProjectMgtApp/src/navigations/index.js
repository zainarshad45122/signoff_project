import Dashboard from '../screens/Dashboard';
import ProjectDetail from '../screens/ProjectDetail';
import Login from '../screens/Login';
import AuthLoading from '../screens/AuthLoading';
import VehicleTracker from '../screens/VehicleTracker';
import JobListing from '../screens/JobsListing';
import CustomFields from '../screens/CustomFields';
import HourlyHire from '../screens/HourlyHire';
import SignOff from '../screens/SignOff';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const AppNavigation = createStackNavigator(
  {
    Login: Login,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

const AuthNavigation = createStackNavigator(
  {
    Dashboard: Dashboard,
    ProjectDetail : ProjectDetail,
    VehicleTracker : VehicleTracker,
    JobListing : JobListing,
    CustomFields : CustomFields,
    HourlyHire : HourlyHire,
    SignOff: SignOff,
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);


export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppNavigation,
      Auth: AuthNavigation,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);