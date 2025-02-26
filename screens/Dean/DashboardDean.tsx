import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colleges from './Colleges';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RequestsDean from './RequestsDean';
import SettingsDean from './SettingsDean';
import institutionDean from './institutionDean';

const Tab = createBottomTabNavigator();


export default function DashboardDean(){
    return (
        <Tab.Navigator>
          <Tab.Screen name="الاعدادات"
            options={{
              headerTitleAlign:'center',

              tabBarLabel: 'الملف الشخصي',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user" color={color} size={size} />
              ),
            }}
          component={SettingsDean} />

<Tab.Screen name="قائمة الطلبات"
            options={{
              headerTitleAlign:'center',
              tabBarLabel: 'الطلبات',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="paper-plane" color={color} size={size} />
              ),
            }}
          component={RequestsDean} />
      {/* {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
   
    </Tab.Navigator>
    )
}