import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import url from "../../config/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsDetailsR({ navigation }: { navigation: any }) {

    const { control, handleSubmit, setValue, setError } = useForm();
    const [id,setId] = useState(null);
    useEffect(() => {
        const fetchUserDetails = async () => {
          const storedToken = await AsyncStorage.getItem('authToken');
    console.log(storedToken);
          try {
            const response = await fetch(url + 'representatives/fetch/myData', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
              },
            });
    
            if (response.ok) {
              const userData = await response.json();
              setValue("username", userData.username);
      setValue("email", userData.email);
      setId(userData.chair_id);
            } else {
                console.log(response);
              console.error('Failed to fetch user details:', response.statusText);
              setError('Failed to fetch user details');
            }
          } catch (error) {
            console.error('An error occurred:', error.message);
            setError('An error occurred while fetching user details');
          } finally {
          
          }
        };
    
        fetchUserDetails();
      }, []);


  const onSubmit = async (data) => {
    const token = await AsyncStorage.getItem('authToken');
    console.log('Submitting data:', data);
    try {
      const response = await fetch(url + `representatives/update/my/password`, {
        method: 'POST', // or 'PUT' if you're updating an existing resource
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      // Log the response for debugging
      const text = await response.text();
      console.log('Response:', text);

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to update user details');
      }

      const result = JSON.parse(text);
      Alert.alert('Success', 'User details updated successfully');
      navigation.goBack();
      console.log(result);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error(error);
    }
  };



  return (
    <ScrollView className='w-full mt-8'>
      <View className='flex flex-col'>
        <View className='flex flex-row mx-2 justify-end'>
          <TouchableOpacity onPress={() => navigation.goBack()} className='bg-slate-400 py-3 px-4 w-28 text-center'>
            <Text className='text-center'>الرجوع للخلف</Text>
          </TouchableOpacity>
        </View>
        <View className='flex flex-col py-2 px-2'>
          <Text>معلومات المستخدم</Text>
        </View>
        <View className='py-2 px-2'>
          <View className='flex flex-col py-2 px-2'>
            <Text>اسم المستخدم</Text>
          </View>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='bg-slate-200 px-3 py-2'
                placeholder="احمد"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View className='py-2 px-2'>
          <View className='flex flex-col py-2 px-2'>
            <Text>البريد الالكتروني</Text>
          </View>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='bg-slate-200 px-3 py-2 placeholder:text-right'
                placeholder="ahmadx93@gmail.com"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View className='py-2 px-2'>
          <View className='flex flex-col py-2 px-2'>
            <Text>كلمة المرور</Text>
          </View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='bg-slate-200 px-3 py-2 placeholder:text-right'
                secureTextEntry={true}
                placeholder="**********"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View className='py-2 px-2'>
          <View className='flex flex-col py-2 px-2'>
            <Text>تاكيد كلمة المرور</Text>
          </View>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='bg-slate-200 px-3 py-2 placeholder:text-right'
                secureTextEntry={true}
                placeholder="**********"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View className='py-4 px-4'>
          <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-slate-600 mt-4 text-white py-3 px-4 rounded-full ">
            <Text className="text-white text-center">
              حفظ التغيرات
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}