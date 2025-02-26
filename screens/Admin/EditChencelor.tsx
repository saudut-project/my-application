import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import url from '../../config/url';

export default function EditChencelor({ navigation, route }) {
  const { deanId } = route.params;
  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchDeanDetails = async () => {
      try {
        const response = await fetch(`${url}chencelor/show/${deanId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch dean details');
        }
        const data = await response.json();
        setValue('username', data.username);
        setValue('email', data.email);
        // Set other fields as necessary
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchDeanDetails();
  }, [deanId, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${url}deans/update/${deanId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to update dean details');
      }

      Alert.alert('Success', 'Dean details updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className='flex flex-col'>
      <View className='flex flex-row mx-2 mt-10 justify-end'>
        <TouchableOpacity onPress={() => navigation.goBack()} className='bg-slate-400 py-3 px-4 w-28 text-center'>
          <Text className='text-center'>الرجوع</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>الاسم</Text>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='bg-slate-200 px-3 py-2'
              placeholder="ادخل الاسم"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>البريد الالكتروني</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='bg-slate-200 px-3 py-2'
              placeholder="ادخل البريد الالكتروني"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-slate-600 mt-4 text-white py-3 px-4 rounded-full ">
        <Text className="text-white text-center">
          حفظ التغييرات
        </Text>
      </TouchableOpacity>
    </View>
  );
}