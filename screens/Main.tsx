import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View,Image } from 'react-native';



export default function Main({navigation}) {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Image source={require('../assets/logo.png')} className='w-[150px] mb-3 h-[150px] mx-auto' />
     <View className='flex flex-row justify-center items-center gap-x-3'>
     <TouchableOpacity onPress={() => navigation.navigate('LoginAdmin')} className='py-6 px-6 border
      border-sky-500 rounded-lg bg-indigo-500'>
     <Image source={require('../assets/user.png')} className='w-10 h-10 mx-auto' />
     <Text className='text-white text-sm mx-auto font-cairo'>مدير نظام</Text>
     </TouchableOpacity>
     <TouchableOpacity  onPress={() => navigation.navigate('LoginDean')} className='py-6 px-6 border
      border-sky-500 rounded-lg bg-indigo-500'>
     <Image source={require('../assets/user.png')} className='w-10 h-10 mx-auto' />

      <Text className='text-white text-sm mx-auto font-cairo'>عميد كلية</Text>
     </TouchableOpacity>
     
     <TouchableOpacity  onPress={() => navigation.navigate('LoginChair')} className='py-6 px-6 border
      border-sky-500 rounded-lg bg-indigo-500'>
     <Image source={require('../assets/user.png')} className='w-10 h-10 mx-auto' />

      <Text className='text-white text-sm mx-auto font-cairo'>رئيس القسم</Text>
     </TouchableOpacity>
     </View>
     <View className='flex flex-row mt-2 gap-x-3'>
     <TouchableOpacity  onPress={() => navigation.navigate('LoginStudent')} className='py-6 px-6 border border-sky-500 rounded-lg bg-indigo-500'>
     <Image source={require('../assets/user.png')} className='w-10 h-10 mx-auto' />
 
      <Text className='text-white text-sm mx-auto font-cairo'>طالب</Text>
     </TouchableOpacity>
     <TouchableOpacity  onPress={() => navigation.navigate('LoginRepresentative')} className='py-6 px-6 border border-sky-500 rounded-lg bg-indigo-500'>
     <Image source={require('../assets/user.png')} className='w-10 h-10 mx-auto' />

      <Text className='text-white text-sm mx-auto font-cairo'>مسؤول شركة</Text>
     </TouchableOpacity>

     <TouchableOpacity  onPress={() => navigation.navigate('LoginChencelor')} className='py-6 px-6 border
      border-sky-500 rounded-lg bg-indigo-500'>
     <Image source={require('../assets/user.png')} className='w-10 h-10 mx-auto' />

      <Text className='text-white text-sm mx-auto font-cairo'>وكيل الكلية</Text>
     </TouchableOpacity>

    
     </View>
      
    </View>
  );
}

