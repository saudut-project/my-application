import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import Textarea from 'react-native-textarea';
import { useForm, Controller } from 'react-hook-form';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditJob({ navigation, route }) {
  const { jobId } = route.params;
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const token = await AsyncStorage.getItem('authToken');
      try {
        const response = await fetch(`${url}jobVacancies/show/${jobId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }

        const jobData = await response.json();
        setValue('title', jobData.title);
        setValue('description', jobData.description);
        setValue('requirements', jobData.requirements);
      } catch (error) {
        setError(error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, setValue]);

  const onSubmit = async (data) => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const response = await fetch(`${url}jobVacancies/update/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update job');
      }

      Alert.alert('Success', 'Job updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View className='flex flex-col'>
      <View className='flex flex-row mx-2 mt-10 justify-end'>
        <TouchableOpacity onPress={() => navigation.goBack()} className='bg-slate-400 py-3 px-4 w-28 text-center'>
          <Text className='text-center'>الرجوع للخلف</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>عنوان الفرصة التدريبية</Text>
        <Controller
          control={control}
          name="title"
          rules={{ required: 'Title is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='bg-slate-200 px-3 py-2 placeholder:text-right'
              placeholder="Enter job title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.title && <Text className="text-red-500">{errors.title.message}</Text>}
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>وصف الفرصة التدريبية</Text>
        <Controller
          control={control}
          name="description"
          rules={{ required: 'Description is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='bg-slate-200 px-3 py-2 placeholder:text-right'
              placeholder="Enter job description"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.description && <Text className="text-red-500">{errors.description.message}</Text>}
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>متطلبات الفرصة التدريبية</Text>
        <Controller
          control={control}
          name="requirements"
          rules={{ required: 'Requirements are required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Textarea
              className='border h-[100px] border-slate-200 bg-slate-200 text-right'
              maxLength={500}
              placeholder={'الرجاء كتابة متطلبات الفرصة '}
              placeholderTextColor={'#c7c7c7'}
              underlineColorAndroid={'transparent'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.requirements && <Text className="text-red-500">{errors.requirements.message}</Text>}
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-slate-600 mt-4 text-white py-3 px-4 rounded-full ">
        <Text className="text-white text-center">
          حفظ التغيرات
        </Text>
      </TouchableOpacity>
    </View>
  );
}
