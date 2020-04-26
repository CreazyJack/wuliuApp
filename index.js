/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SomeTaskName from './SomeTaskName';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('SomeTaskName', () => SomeTaskName);
