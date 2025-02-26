import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useForm, Controller } from 'react-hook-form';
import url from '../../config/url';

export default function RegisterStudent({ navigation }) {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const [colleges, setColleges] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCollegesAndDepartments = async () => {
        try {
          const collegeResponse = await fetch(url + 'colleges');
          const departmentResponse = await fetch(url + 'departments');
  
          if (!collegeResponse.ok || !departmentResponse.ok) {
            throw new Error('Failed to fetch colleges or departments');
          }
  
          const collegesData = await collegeResponse.json();
          const departmentsData = await departmentResponse.json();
  
          setColleges(collegesData);
          setDepartments(departmentsData);
        } catch (error) {
          setError(error);
          Alert.alert('Error', error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCollegesAndDepartments();
    }, []);
  
    const handleCollegeChange = (collegeId) => {
      setValue('college_id', collegeId);
      const relatedDepartments = departments.filter(department => department.college_id === collegeId);
      setFilteredDepartments(relatedDepartments);
      setValue('department_id', null); // Reset department selection
    };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(url + 'students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register student');
      }

      Alert.alert('Success', 'Student registered successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View className='flex flex-col min-h-screen  bg-[#00509d]'>
    <View className="flex flex-col justify-end items-end w-full">
    <TouchableOpacity onPress={() =>navigation.goBack() } className="bg-sky-900 mt-8 mx-2 text-white py-3 px-4 rounded-full ">
<Text className="text-white text-center">
الرجوع
</Text>
</TouchableOpacity> 
    </View>
    <View className='flex flex-col' style={{direction:'rtl'}}>
     
      <View className='flex flex-col py-2 px-2'>
        <Text className='text-white text-right'>اسم الطالب</Text>
        <Controller
          control={control}
          name="username"
          rules={{ required: 'Username is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='bg-slate-200 px-3 py-2'
              placeholder="اسم الطالب"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && <Text className="text-red-500">{errors.username.message}</Text>}
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='text-white text-right'>كلمة المرور</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='bg-slate-200 px-3 py-2'
              placeholder="كلمة المرور"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='text-white text-right'>البريد الإلكتروني</Text>
        <Controller
          control={control}
          name="email"
          rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='bg-slate-200 px-3 py-2'
              placeholder="البريد الإلكتروني"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='text-white text-right'>الكلية</Text>
        <Controller
          control={control}
          name="college_id"
          rules={{ required: 'College is required' }}
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
            style={{
                inputIOS: {
                  backgroundColor: '#f0f0f0', // Change this to your desired color
                  padding: 10,
                  borderRadius: 5,
                },
                inputAndroid: {
                  backgroundColor: '#f0f0f0', // Change this to your desired color
                  padding: 10,
                  borderRadius: 5,
                },
                placeholder: {
                  color: '#999', // Optional: Change placeholder text color
                },
              }}
              placeholder={{
                label: 'اختر الكلية...',
                value: null,
                color: '#999', // Placeholder text color
              }}
              onValueChange={handleCollegeChange}
              value={value}
              items={colleges.map(college => ({ label: college.name, value: college.college_id }))}
            />
          )}
        />
        {errors.college_id && <Text className="text-red-500">{errors.college_id.message}</Text>}
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='text-white text-right'>القسم</Text>
        <Controller
          control={control}
          name="department_id"
          rules={{ required: 'Department is required' }}
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
            style={{
                inputIOS: {
                  backgroundColor: '#f0f0f0', // Change this to your desired color
                  padding: 10,
                  borderRadius: 5,
                },
                inputAndroid: {
                  backgroundColor: '#f0f0f0', // Change this to your desired color
                  padding: 10,
                  borderRadius: 5,
                },
                placeholder: {
                  color: '#999', // Optional: Change placeholder text color
                },
              }}
              placeholder={{
                label: 'اختر القسم...',
                value: null,
                color: '#999', // Placeholder text color
              }}
              onValueChange={onChange}
              value={value}
              items={filteredDepartments.map(department => ({ label: department.name, value: department.department_id }))}
            />
          )}
        />
        {errors.department_id && <Text className="text-red-500">{errors.department_id.message}</Text>}
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-sky-900 mt-4 text-white py-3 px-4 rounded-full ">
        <Text className="text-white text-center">
          تسجيل الطالب
        </Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}