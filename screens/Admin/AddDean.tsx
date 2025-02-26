import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import url from '../../config/url';

export default function AddDean({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleAddDean = async () => {
    try {
      const response = await fetch(url+ 'deans/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        console.log(response);

        throw new Error('Failed to add dean');
      }
console.log(response);
  //    Alert.alert('Success', 'Dean added successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className='flex flex-col'>
      <View className='flex flex-row mx-2 mt-10 justify-end'>
        <TouchableOpacity onPress={() => navigation.goBack()} className='bg-indigo-600  py-3 px-4 w-28 text-center'>
          <Text className='text-center font-cairo text-white'>الرجوع</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='font-cairo text-base'>الاسم</Text>
        <TextInput
          className='bg-slate-200 px-3 py-2 font-cairo'
          placeholder="ادخل الاسم"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='font-cairo text-base'>كلمة المرور</Text>
        <TextInput
          className='bg-slate-200 text-right px-3 py-2 font-cairo'
          placeholder="ادخل كلمة المرور"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='font-cairo text-base'>البريد الالكتروني</Text>
        <TextInput
          className='bg-slate-200 px-3 py-2 font-cairo'
          placeholder="ادخل البريد الالكتروني"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity onPress={handleAddDean} className="bg-slate-600 mt-4 text-white py-3 px-4 rounded-full ">
        <Text className="text-white text-center">
          حفظ
        </Text>
      </TouchableOpacity>
    </View>
  );
}