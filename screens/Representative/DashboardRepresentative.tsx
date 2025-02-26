import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colleges from './Colleges';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RequestsRepresentative from './RequestsRepresentative';
import SettingsRepresentative from './SettingsRepresentative';
import JobVacanciesRepresentative from './JobVacanciesRepresentative';

const Tab = createBottomTabNavigator();


export default function DashboardRepresentative(){
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
          component={SettingsRepresentative} />

<Tab.Screen name="قائمة الطلبات"
            options={{
              headerTitleAlign:'center',
              tabBarLabel: 'الطلبات',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="paper-plane" color={color} size={size} />
              ),
            }}
          component={RequestsRepresentative} />

<Tab.Screen name="الفرص التدريبية"
            options={{
              headerTitleAlign:'center',
              tabBarLabel: 'الفرص التدريبية',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="paper-plane" color={color} size={size} />
              ),
            }}
          component={JobVacanciesRepresentative} />


      {/* {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
   
    </Tab.Navigator>
    )
}