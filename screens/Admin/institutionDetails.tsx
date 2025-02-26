import React from "react";
import { View,Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

export default function InstitutionDetails({navigation}){
    return (
      <ScrollView className='w-full mt-8'>

      <View className='flex flex-col'>
        <View className='flex flex-row mx-2 justify-end'>
          <TouchableOpacity onPress={() => navigation.goBack()} className='bg-slate-400 py-3 px-4 w-28 text-center'>
            <Text className='text-center'>الرجوع للخلف</Text>
          </TouchableOpacity>
        </View>
        <View className='flex flex-col py-2 px-2'>
<Text>معلومات جهة التدريب</Text>
        </View>
        <View className='py-2 px-2'>
        <View className='flex flex-col py-2 px-2'>
<Text>اسم جهة التدريب</Text>
        </View>
          <TextInput className='bg-slate-200 px-3 py-2' placeholder="كلية الحاسبات" />
        </View>
      <View className='py-2 px-2'>
      <View className='flex flex-col py-2 px-2'>
<Text>مسؤول جهة التدريب</Text>
        </View>
      <View className='bg-slate-200 px-3 py-2'>
      
        <RNPickerSelect
        
      onValueChange={(value) => console.log(value)}
      
      items={[
        { label: 'د.احمد', value: 'football' },
        { label: 'د.فيصل', value: 'baseball' },
        { label: 'د.عماد', value: 'hockey' },
      ]}
    />
        </View>
      </View>
      <View className='py-4 px-4'>
      <TouchableOpacity className="bg-slate-600 mt-4 text-white py-3 px-4 rounded-full ">
    <Text className="text-white text-center">
        حفظ التغيرات
    </Text>
</TouchableOpacity>
      </View>
      <View className='py-4 px-4'>
      <TouchableOpacity onPress={() => alert('تم حذف جهة التدريب')} className="bg-red-600 mt-4 text-white py-3 px-4 rounded-full ">
    <Text className="text-white text-center">
        حذف جهة التدريب
    </Text>
</TouchableOpacity>
      </View>
        </View>
        </ScrollView>

    )
}