import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from '@react-navigation/native';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JobVacanciesRepresentative({ navigation }) {
  const [jobVacancies, setJobVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobVacancies = useCallback(async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const response = await fetch(`${url}jobVacancies/myJobVacancies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch job vacancies');
      }

      const data = await response.json();
      setJobVacancies(data);
    } catch (error) {
      setError(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchJobVacancies();
    }, [fetchJobVacancies])
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView className='w-full'>
      <View className='flex flex-col justify-start'>
        <TouchableOpacity onPress={() => navigation.navigate('AddJob')} className='flex flex-col py-2 px-3 w-[160px] justify-center items-center mt-1 mb-2 bg-green-800 text-white'>
          <Text className='text-white'>اضافة فرصة تدريبية</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col'>
      {jobVacancies.map((job) => (
          <View key={job.job_vacancy_id} className='py-4 px-5 bg-white border-b border-gray-200'>
            <TouchableOpacity onPress={() => navigation.navigate('EditJob', { jobId: job.job_vacancy_id })} className='flex flex-row justify-end gap-x-3'>
              <Text>{job.title}</Text>
              <FontAwesome name="university" color={'#000000'} size={12} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}