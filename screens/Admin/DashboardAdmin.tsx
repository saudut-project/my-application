import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colleges from './Colleges';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RequestsAdmin from './RequestsAdmin';
import SettingsAdmin from './SettingsAdmin';
import Institutions from './Institutions';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import DeanList from './DeanList';
import ChencelorList from './ChencelorList';
import DepartmentList from './DepartmentList';
import InstitutionList from './InstitutionList';
import ChairPersonList from './ChairPersonList';

const Tab = createBottomTabNavigator();


export default function DashboardAdmin(){

  const { userDetails, loading, error } = useContext(UserContext);

    return (
        <Tab.Navigator>
          <Tab.Screen name="الاعدادات"
            options={{
              headerTitleAlign:'center',

              tabBarLabel: 'الملف الشخصي',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="laptop" color={color} size={size} />
              ),
            }}
          component={SettingsAdmin} />
          <Tab.Screen name="قائمة العمداء"
            options={{
              headerTitleAlign:'center',

              tabBarLabel: 'قائمة العمداء',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user-circle-o" color={color} size={size} />
              ),
            }}
          component={DeanList} />
           <Tab.Screen name="قائمة الوكلاء"
            options={{
              headerTitleAlign:'center',

              tabBarLabel: 'قائمة الوكلاء',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user-circle-o" color={color} size={size} />
              ),
            }}
          component={ChencelorList} />
           <Tab.Screen name="قائمة رؤساء القسم"
            options={{
              headerTitleAlign:'center',

              tabBarLabel: 'قائمة رؤساء القسم',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user" color={color} size={size} />
              ),
            }}
          component={ChairPersonList} />
          <Tab.Screen name="قائمة الاقسام"
            options={{
              headerTitleAlign:'center',

              tabBarLabel: 'قائمة الاقسام',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="building" color={color} size={size} />
              ),
            }}
          component={DepartmentList} />

          <Tab.Screen name="InstitutionList"
            options={{
              headerTitleAlign:'center',

              tabBarLabel: 'قائمة جهات التدريب',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="tasks" color={color} size={size} />
              ),
            }}
          component={InstitutionList} />  

 {/* <Tab.Screen name="جهات التدريب"
            options={{
              headerTitleAlign:'center',

              tabBarLabel: 'جهات التدريب',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="tasks" color={color} size={size} />
              ),
            }}
          component={Institutions} /> */}
{/* <Tab.Screen name="قائمة الطلبات"
            options={{
              headerTitleAlign:'center',
              tabBarLabel: 'الطلبات',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="paper-plane" color={color} size={size} />
              ),
            }}
          component={RequestsAdmin} /> */}
      {/* {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="الكليات" component={Colleges}
       options={{
       headerTitleAlign:'center',
        tabBarLabel: ' قائمة الكليات',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="university" color={color} size={size} />
        ),
      }}
      />
    </Tab.Navigator>
    )
}