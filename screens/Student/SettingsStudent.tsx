import { View,Text, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function SettingsStudent({navigation}){
    return (
        <ScrollView className='w-full'>

        <View className='flex flex-col'>
              <View className='py-4 px-5 bg-white border-b border-gray-200'>
                <TouchableOpacity onPress={() => navigation.navigate('SettingsDetails')} className='flex flex-row justify-end gap-x-3'>
            
  
                  <Text>تعديل المعلومات الشخصية</Text>
  
                  <FontAwesome name="user" color={'#000000'} size={12} />
  
                  </TouchableOpacity>
  
              </View>
              <View className='py-4 px-5 bg-white border-b border-gray-200'>
                <TouchableOpacity onPress={() => navigation.navigate('Main')} className='flex flex-row justify-end gap-x-3'>
            
  
                <Text>تسجيل الخروج</Text>
  
                  <FontAwesome name="external-link" color={'#000000'} size={12} />
  
                  </TouchableOpacity>
  
              </View>
            
          </View>
          </ScrollView>
    )
}