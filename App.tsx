import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main';
import { NavigationContainer } from '@react-navigation/native';
import LoginAdmin from './screens/Admin/LoginAdmin';
import LoginDean from './screens/Dean/LoginDean';
import LoginChair from './screens/Chair/LoginChair';
import LoginRepresentative from './screens/Representative/LoginRepresentative';
import LoginStudent from './screens/Student/LoginStudent';
import RegisterRepresentative from './screens/Representative/RegisterRepresentative';
import DashboardAdmin from './screens/Admin/DashboardAdmin';
import CollegeDetails from './screens/Admin/CollegeDetails';
import RequestsDetails from './screens/Admin/RequestsDetails';
import institutionDetails from './screens/Admin/institutionDetails';
import SettingsDetails from './screens/Admin/SettingsDetails';
import DashboardDean from './screens/Dean/DashboardDean';
import DashboardChair from './screens/Chair/DashboardChair';
import DashboardRepresentative from './screens/Representative/DashboardRepresentative';
import DashboardStudent from './screens/Student/DashboardStudent';
import RequestsDetailsStudent from './screens/Student/RequestsDetailsStudent';
import RequestsDetailsStudentList from './screens/Student/RequestsDetailsStudentList';
import AddJob from './screens/Representative/AddJob';
import SettingsDetailsRepresentative from './screens/Representative/SettingsDetailsRepresentative';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import AddCollege from './screens/Admin/AddCollege';
import AddDean from './screens/Admin/AddDean';
import DeanList from './screens/Admin/DeanList';
import EditDean from './screens/Admin/EditDean';
import DepartmentList from './screens/Admin/DepartmentList';
import AddDepartment from './screens/Admin/AddDepartment';
import EditDepartment from './screens/Admin/EditDepartment';
import InstitutionList from './screens/Admin/InstitutionList';
import AddInstitution from './screens/Admin/AddInstitution';
import UpdateInstitution from './screens/Admin/UpdateInstitution';
import EditJob from './screens/Representative/EditJob';
import RegisterStudent from './screens/Student/RegisterStudent';
import Colleges from './screens/Admin/Colleges';
import UpdateCollege from './screens/Admin/UpdateCollege';
import RequestsDetailsChair from './screens/Chair/RequestsDetailsChair';
import RequestsDetailsDean from './screens/Dean/RequestsDetailsDean';
import RequestsRepresentative from './screens/Representative/RequestsRepresentative';
import RequstsRepresentativeDetails from './screens/Representative/RequstsRepresentativeDetails';
import SettingsDetailsDean from './screens/Dean/SettingsDeanDetails';
import SettingsDetailsChair from './screens/Chair/SettingsDetailsChair';
import AddChairPerson from './screens/Admin/AddChairPerson';
import ChencelorList from './screens/Admin/ChencelorList';
import ChairPersonList from './screens/Admin/ChairPersonList';
import AddChencelor from './screens/Admin/AddChencelor';
import EditChencelor from './screens/Admin/EditChencelor';
import EditChairPerson from './screens/Admin/EditChairPerson';
import SettingsDetailsR from './screens/Representative/SettingsDetailsR';
import { useFonts, Cairo_400Regular, Cairo_700Bold } from '@expo-google-fonts/cairo';
import JobVacanciesListScreen from './screens/Chair/JobVacanciesScreen'
import JobVacanciesDetails from './screens/Chair/JobVacanciesDetails'
import LoginChencelor from './screens/Chencelor/LoginChencelor'
import DashboardChencelor from './screens/Chencelor/DashboardChencelor'
import RequestsDetailsChencelor from './screens/Chencelor/RequestsDetailsChencelor'
import SettingsDetailsChencelor from './screens/Chencelor/SettingsDetailsChencelor'
 
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();
export default function App() {
  let [fontsLoaded] = useFonts({
    Cairo_400Regular,
    Cairo_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" options={{headerShown:false}} component={Main} />
          {/* Admin Screens */}
          <Stack.Screen name="LoginAdmin" options={{headerShown:false}} component={LoginAdmin} />
          <Stack.Screen name="DashboardAdmin" options={{headerShown:false}} component={DashboardAdmin} />
          <Stack.Screen name="CollegeDetails" options={{headerShown:false}} component={CollegeDetails} />
          <Stack.Screen name="RequestsDetails" options={{headerShown:false}} component={RequestsDetails} />
          <Stack.Screen name="institutionDetails" options={{headerShown:false}} component={institutionDetails} />
          <Stack.Screen name="SettingsDetails" options={{headerShown:false}} component={SettingsDetails} />
          <Stack.Screen name="AddCollege" options={{headerShown:false}} component={AddCollege} />
          <Stack.Screen name="DeanList" options={{headerShown:false}} component={DeanList} />
          <Stack.Screen name="ChencelorList" options={{headerShown:false}} component={ChencelorList} />
          <Stack.Screen name="EditDean" options={{headerShown:false}} component={EditDean} />
          <Stack.Screen name="AddDean" options={{headerShown:false}} component={AddDean} />
          <Stack.Screen name="AddDepartment" options={{headerShown:false}} component={AddDepartment} />
          <Stack.Screen name="DepartmentList" options={{headerShown:false}} component={DepartmentList} />
          <Stack.Screen name="EditDepartment" options={{headerShown:false}} component={EditDepartment} />
          <Stack.Screen name="InstitutionList" options={{headerShown:false}} component={InstitutionList} />
          <Stack.Screen name="AddInstitution" options={{headerShown:false}} component={AddInstitution} />    
          <Stack.Screen name="UpdateInstitution" options={{headerShown:false}} component={UpdateInstitution} />
          <Stack.Screen name="Colleges" options={{headerShown:false}} component={Colleges} />
          <Stack.Screen name="UpdateCollege" options={{headerShown:false}} component={UpdateCollege} /> 
          <Stack.Screen name="AddChencelor" options={{headerShown:false}} component={AddChencelor} /> 
          <Stack.Screen name="EditChencelor" options={{headerShown:false}} component={EditChencelor} /> 
          {/* Dean Screens */}
          <Stack.Screen name="LoginDean" options={{headerShown:false}} component={LoginDean} />
          <Stack.Screen name="DashboardDean" options={{headerShown:false}} component={DashboardDean} />
          <Stack.Screen name="RequestsDetailsDean" options={{headerShown:false}} component={RequestsDetailsDean} />
          <Stack.Screen name="SettingsDetailsDean" options={{headerShown:false}} component={SettingsDetailsDean} />

          {/* Chencelor Screens */}
          <Stack.Screen name="LoginChencelor" options={{headerShown:false}} component={LoginChencelor} />
          <Stack.Screen name="DashboardChencelor" options={{headerShown:false}} component={DashboardChencelor} />
          <Stack.Screen name="RequestsDetailsChencelor" options={{headerShown:false}} component={RequestsDetailsChencelor} />
          <Stack.Screen name="SettingsDetailsChencelor" options={{headerShown:false}} component={SettingsDetailsChencelor} />


          {/* Chair Screens */}
          <Stack.Screen name="LoginChair" options={{headerShown:false}} component={LoginChair} />
          <Stack.Screen name="DashboardChair" options={{headerShown:false}} component={DashboardChair} />
          <Stack.Screen name="RequestsDetailsChair" options={{headerShown:false}} component={RequestsDetailsChair} /> 
          <Stack.Screen name="SettingsDetailsChair" options={{headerShown:false}} component={SettingsDetailsChair} /> 
          {/* ChairPerson Screens */}
          <Stack.Screen name="ChairPersonList" options={{headerShown:false}} component={ChairPersonList} />
          <Stack.Screen name="AddChairPerson" options={{headerShown:false}} component={AddChairPerson} />
          <Stack.Screen name="EditChairPerson" options={{headerShown:false}} component={EditChairPerson} />
          <Stack.Screen name="JobVacanciesListScreen" options={{headerShown:false}} component={JobVacanciesListScreen} />
          
          <Stack.Screen name="JobVacanciesDetails" options={{headerShown:false}} component={JobVacanciesDetails} />

          {/* Representative Screens */}
          <Stack.Screen name="LoginRepresentative" options={{headerShown:false}} component={LoginRepresentative} />
          <Stack.Screen name="RegisterRepresentative" options={{headerShown:false}} component={RegisterRepresentative} />
          <Stack.Screen name="DashboardRepresentative" options={{headerShown:false}} component={DashboardRepresentative} />
          <Stack.Screen name="SettingsDetailsRepresentative" options={{headerShown:false}} component={SettingsDetailsRepresentative} />
          <Stack.Screen name="RequestsRepresentative" options={{headerShown:false}} component={RequestsRepresentative} />
          <Stack.Screen name="RequstsRepresentativeDetails" options={{headerShown:false}} component={RequstsRepresentativeDetails} /> 
          <Stack.Screen name="EditJob" options={{headerShown:false}} component={EditJob} />
          <Stack.Screen name="SettingsDetailsR" options={{headerShown:false}} component={SettingsDetailsR} /> 
          {/* Student Screens */}
          <Stack.Screen name="LoginStudent" options={{headerShown:false}} component={LoginStudent} />
          <Stack.Screen name="DashboardStudent" options={{headerShown:false}} component={DashboardStudent} />
          <Stack.Screen name="RequestsDetailsStudent" options={{headerShown:false}} component={RequestsDetailsStudent} />
          <Stack.Screen name="RequestsDetailsStudentList" options={{headerShown:false}} component={RequestsDetailsStudentList} />
          <Stack.Screen name="AddJob" options={{headerShown:false}} component={AddJob} />
          <Stack.Screen name="RegisterStudent" options={{headerShown:false}} component={RegisterStudent} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

