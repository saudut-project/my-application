import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useForm, Controller } from 'react-hook-form';
import url from '../../config/url';

export default function UpdateCollege({ navigation, route }) {
  const { collegeId } = route.params;
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [deans, setDeans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        const collegeResponse = await fetch(`${url}college/showing/${collegeId}`);
        const deansResponse = await fetch(`${url}deans/all`);

        if (!collegeResponse.ok || !deansResponse.ok) {
          throw new Error('Failed to fetch college or deans');
        }

        const collegeData = await collegeResponse.json();
        const deansData = await deansResponse.json();

        setValue('name', collegeData.name);
        setValue('dean_id', collegeData.dean_id);
        setDeans(deansData);
      } catch (error) {
        setError(error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [collegeId, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${url}college/update/setting/${collegeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update college');
      }

      Alert.alert('Success', 'College updated successfully');
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
        <TouchableOpacity onPress={() => navigation.goBack()} className='bg-indigo-600 py-3 px-4 w-28 text-center'>
          <Text className='text-center font-cairo text-white'>الرجوع</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>اسم الكلية</Text>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'College name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='bg-slate-200 px-3 py-2'
              placeholder="Enter college name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.college_name && <Text className="text-red-500">{errors.college_name.message}</Text>}
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>اختيار العميد</Text>
        <Controller
          control={control}
          name="dean_id"
          rules={{ required: 'Dean selection is required' }}
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={onChange}
              value={value}
              items={deans.map(dean => ({ label: dean.username, value: dean.dean_id }))}
            />
          )}
        />
        {errors.dean_id && <Text className="text-red-500">{errors.dean_id.message}</Text>}
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-indigo-600 mt-4 text-white py-3 px-4 rounded-xl  ">
        <Text className="text-white text-center font-cairo">
          تحديث الكلية
        </Text>
      </TouchableOpacity>
    </View>
  );
}