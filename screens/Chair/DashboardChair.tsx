import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colleges from './Colleges';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RequestsChair from './RequestsChair';
import SettingsChair from './SettingsChair';
import institutionChair from './institutionChair';
import JobVacanciesListScreen from './JobVacanciesScreen';

const Tab = createBottomTabNavigator();


export default function DashboardChair(){
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
          component={SettingsChair} />

<Tab.Screen name="قائمة الطلبات"
            options={{
              headerTitleAlign:'center',
              tabBarLabel: 'الطلبات',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="paper-plane" color={color} size={size} />
              ),
            }}
          component={RequestsChair} />


<Tab.Screen name="قائمة الفرص التدريبية"
            options={{
              headerTitleAlign:'center',
              tabBarLabel: 'الفرص التدريبية',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="paper-plane" color={color} size={size} />
              ),
            }}
          component={JobVacanciesListScreen} />



      {/* {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
   
    </Tab.Navigator>
    )
}