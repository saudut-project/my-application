import React, { useEffect,useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import url from '../../config/url';

export default function EditDepartment({ navigation, route }) {
  const { departmentId } = route.params;
  const { control, handleSubmit, setValue } = useForm();
  const [colleges, setColleges] = useState([]);
  const [chairpersons, setChairpersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const departmentResponse = await fetch(`${url}departments/show/${departmentId}`);
        const collegeResponse = await fetch(url + 'colleges');
        const chairpersonResponse = await fetch(url + 'chairpersons/all');

        if (!departmentResponse.ok || !collegeResponse.ok || !chairpersonResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const departmentData = await departmentResponse.json();
        const collegesData = await collegeResponse.json();
        const chairpersonsData = await chairpersonResponse.json();

        setValue('name', departmentData.name);
        setValue('college_id', departmentData.college_id);
        setValue('chairperson_id', departmentData.chairperson_id);
        setColleges(collegesData);
        setChairpersons(chairpersonsData);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentDetails();
  }, [departmentId, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${url}departments/update/${departmentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to update department details');
      }

      Alert.alert('Success', 'Department details updated successfully');
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
          <Text className='text-center'>الرجوع</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>اسم القسم</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className='bg-slate-200 px-3 py-2'
              placeholder="Enter department name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>الكلية</Text>
        <Controller
          control={control}
          name="college_id"
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={onChange}
              value={value}
              items={colleges.map(college => ({ label: college.name, value: college.college_id }))}
            />
          )}
        />
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>رؤساء القسم</Text>
        <Controller
          control={control}
          name="chairperson_id"
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={onChange}
              value={value}
              items={chairpersons.map(chairperson => ({ label: chairperson.username, value: chairperson.chairperson_id }))}
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