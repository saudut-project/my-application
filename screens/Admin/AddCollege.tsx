import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useForm, Controller } from 'react-hook-form';
import url from '../../config/url';

export default function AddCollege({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [deans, setDeans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeans = async () => {
      try {
        const response = await fetch(`${url}deans/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch deans');
        }

        const data = await response.json();
        setDeans(data);
      } catch (error) {
        setError(error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeans();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${url}colleges/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add college');
      }

      Alert.alert('تمت الاضافة بنجاح', 'تم اضافة الكلية بنجاح');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View className='flex flex-col bg-white' style={{direction:'rtl'}}>
      <View className='flex flex-row mx-2 mt-10 justify-end'>
        <TouchableOpacity onPress={() => navigation.goBack()} className='bg-indigo-600  py-3 px-4 w-28 text-center'>
          <Text className='text-center font-cairo text-white'>الرجوع</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col py-2 mt-3 px-2'>
        <Text className='font-cairo text-base'>اسم الكلية</Text>
        <Controller
          control={control}
          name="college_name"
          rules={{ required: 'اسم الكلية مطلوب' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='bg-slate-200 px-3 py-2 font-cairo'
              placeholder="ادخل اسم الكلية"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.college_name && <Text className="text-red-500">{errors.college_name.message}</Text>}
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='font-cairo text-base'>اختيار العميد</Text>
        <Controller
          control={control}
          name="dean_id"
          rules={{ required: 'اختيار العميد مطلوب' }}
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={onChange}
              placeholder={{ label: 'اختيار العميد', value: null }}
              value={value}
              items={deans.map(dean => ({ label: dean.username, value: dean.dean_id }))}
            />
          )}
        />
        {errors.dean_id && <Text className="text-red-500">{errors.dean_id.message}</Text>}
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-indigo-600 mt-4 text-white py-3 px-4 rounded-full ">
        <Text className="text-white text-center font-cairo">
          اضافة الكلية
        </Text>
      </TouchableOpacity>
    </View>
  );
}