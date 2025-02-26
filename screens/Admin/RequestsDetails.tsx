import React from "react";
import { View,Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';

export default function RequestsDetails({navigation}){
    return (
      <ScrollView className='w-full mt-8'>

      <View className='flex flex-col'>
        <View className='flex flex-row mx-2 justify-end'>
          <TouchableOpacity onPress={() => navigation.goBack()} className='bg-slate-400 py-3 px-4 w-28 text-center'>
            <Text className='text-center'>الرجوع للخلف</Text>
          </TouchableOpacity>
        </View>
        <View className='flex flex-col py-2 px-2'>
<Text>معلومات الطلب</Text>
        </View>
       
    <View className='flex flex-col'>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>عنوان الطلب</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
          مطلوب مهندسين مدنين بدون خبرة
        </Text>
        </View>

     
     
     
      </View>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>وصف الطلب</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
          وصف مختصر
        </Text>
        </View>

     
     
     
      </View>
      <Text></Text>
    </View>


    <View className='flex flex-col py-2 px-2'>
<Text>معلومات مقدم الطلب</Text>
        </View>
       
    <View className='flex flex-col'>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>اسم مقدم الطلب</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
          ابراهيم محمد البلوي
        </Text>
        </View>

     
     
     
      </View>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>الكلية</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
          كلية الحاسبات
        </Text>
        </View>

     
     
     
      </View>

      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>القسم</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
          تقنية المعلومات
        </Text>
        </View>

     
     
     
      </View>
      <Text></Text>
    </View>



    <View className='flex flex-col py-2 px-2'>
<Text>الموافقات</Text>
        </View>
       
    <View className='flex flex-col'>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>رئيس القسم</Text>
        </View>
        <View className='py-2 px-2 bg-green-500 rounded flex items-center mt-2 h-[32px]'>
        <Text>
          تمت الموافقة
        </Text>
        </View>

     
     
     
      </View>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>عميد الكلية</Text>
        </View>
        <View className='py-2 px-2 bg-green-500 rounded flex items-center mt-2 h-[32px]'>
        <Text>
          تمت الموافقة
        </Text>
        </View>

     
     
     
      </View>

      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>جهة التدريب</Text>
        </View>
        <View className='py-2 px-2 bg-gray-500 rounded flex items-center mt-2 h-[32px]'>
        <Text className='text-white'>
          بالانتظار
        </Text>
        </View>

     
     
     
      </View>

      <View>
      <View className='py-4 px-4'>
      <TouchableOpacity onPress={() => alert('تم حذف طلب التقديم')} className="bg-red-600 mt-4 text-white py-3 px-4 rounded-full ">
    <Text className="text-white text-center">
        حذف طلب التقديم
    </Text>
</TouchableOpacity>
      </View>
      </View>
      <Text></Text>
    </View>
        </View>
        </ScrollView>

    )
}