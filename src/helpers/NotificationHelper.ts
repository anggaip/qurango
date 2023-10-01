import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

class NotificationHelper {
  constructor() {
    this.requestPermissionAndroid();
  }

  requestPermissionAndroid = async (): Promise<void> => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('notifikasi dibolehkan');
      } else {
        console.log('tidak boleh');
      }
    } catch (error) {
      console.warn(error);
    }
  };

  getDeviceToken = async (): Promise<string> => {
    await messaging().registerDeviceForRemoteMessages();
    return await messaging().getToken();
  };
}

export default NotificationHelper;
