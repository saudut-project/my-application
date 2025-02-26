import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import url from '../../config/url';

export default function JobVacanciesStudent({ navigation }) {
  const [jobVacancies, setJobVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobVacancies = async () => {
      try {
        const response = await fetch(`${url}jobVacancies/all`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch job vaecancies');
        }

        const data = await response.json();
        setJobVacancies(data);
      } catch (error) {
        setError(error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobVacancies();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView className='w-full'>
      <View className='flex flex-col'>
      {jobVacancies.map((job) => (
          <View key={job.job_vacancy_id} className='py-4 px-5 bg-white border-b border-gray-200'>
            <TouchableOpacity onPress={() => navigation.navigate('RequestsDetailsStudent', { jobId: job.job_vacancy_id })} className='flex flex-row justify-end gap-x-3'>
              <Text>{job.title}</Text>
              <FontAwesome name="university" color={'#000000'} size={12} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}