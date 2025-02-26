import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colleges from './Colleges';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RequestsStudent from './RequestsStudent';
import SettingsStudent from './SettingsStudent';
import JobVacanciesStudent from './JobVacanciesStudent';

const Tab = createBottomTabNavigator();


export default function DashboardStudent(){
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
          component={SettingsStudent} />

<Tab.Screen name="قائمة الطلبات"
            options={{
              headerTitleAlign:'center',
              tabBarLabel: 'الطلبات',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="paper-plane" color={color} size={size} />
              ),
            }}
          component={RequestsStudent} />

<Tab.Screen name="الفرص التدريبية"
            options={{
              headerTitleAlign:'center',
              tabBarLabel: 'الفرص التدريبية',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="paper-plane" color={color} size={size} />
              ),
            }}
          component={JobVacanciesStudent} />


      {/* {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
   
    </Tab.Navigator>
    )
}