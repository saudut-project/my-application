import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import url from '../../config/url';

export default function AddDepartment({ navigation }) {
  const [name, setName] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [chairpersonId, setChairpersonId] = useState('');
  const [colleges, setColleges] = useState([]);
  const [chairpersons, setChairpersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collegeResponse = await fetch(url + 'colleges');
        const chairpersonResponse = await fetch(url + 'chairpersons/all');

        if (!collegeResponse.ok || !chairpersonResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const collegesData = await collegeResponse.json();
        const chairpersonsData = await chairpersonResponse.json();

        setColleges(collegesData);
        setChairpersons(chairpersonsData);
      } catch (error) {
        setError(error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddDepartment = async () => {
    try {
      const response = await fetch(url + 'departments/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, college_id: collegeId, chairperson_id: chairpersonId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add department');
      }

      Alert.alert('Success', 'Department added successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View className='flex flex-col bg-white'>
      <View className='flex flex-row mx-2 mt-10 justify-end'>
        <TouchableOpacity onPress={() => navigation.goBack()} className='bg-indigo-600 py-3 px-4 w-28 text-center'>
          <Text className='text-center font-cairo text-white'>الرجوع</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='font-cairo text-base'>اسم القسم</Text>
        <TextInput
          className='bg-slate-200 px-3 py-2 font-cairo'
          placeholder="ادخل اسم القسم"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='font-cairo text-base'>الكلية</Text>
        <RNPickerSelect
          onValueChange={setCollegeId}
          items={colleges.map(college => ({ label: college.name, value: college.college_id }))}
        />
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='font-cairo text-base'>العميد</Text>
        <RNPickerSelect
          onValueChange={setChairpersonId}
          items={chairpersons.map(chairperson => ({ label: chairperson.username, value: chairperson.chairperson_id }))}
        />
      </View>
      <TouchableOpacity onPress={handleAddDepartment} className="bg-indigo-600 mt-4 text-white py-3 px-4 rounded-full ">
        <Text className="text-white text-center font-cairo">
          اضافة القسم
        </Text>
      </TouchableOpacity>
    </View>
  );
}