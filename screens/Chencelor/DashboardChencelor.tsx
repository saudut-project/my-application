import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colleges from './Colleges';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RequestsChencelor from './RequestsChencelor';
import SettingsDean from './SettingsChencelor';
import institutionDean from './institutionDean';
import SettingsChencelor from './SettingsChencelor';

const Tab = createBottomTabNavigator();


export default function DashboardChencelor(){
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
          component={SettingsChencelor} />

<Tab.Screen name="قائمة الطلبات"
            options={{
              headerTitleAlign:'center',
              tabBarLabel: 'الطلبات',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="paper-plane" color={color} size={size} />
              ),
            }}
          component={RequestsChencelor} />
      {/* {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
   
    </Tab.Navigator>
    )
}