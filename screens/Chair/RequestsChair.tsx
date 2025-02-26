import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function RequestsChairperson({ navigation }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = useCallback(async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const response = await fetch(`${url}trainingRequests/chairpersonRequests`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
///s
      if (!response.ok) {
        throw new Error('Failed to fetch chairperson requests');
      }

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      setError(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRequests();
    }, [fetchRequests])
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

    return (
        <ScrollView className='w-full'>

      <View className='flex flex-col'>
      {requests.map((request) => (

            <View key={request.training_request_id} className='py-4 px-5 bg-white border-b border-gray-200'>
              <TouchableOpacity key={request.training_request_id} onPress={() => navigation.navigate('RequestsDetailsChair', { requestId: request.training_request_id })}  className='flex flex-row justify-end gap-x-3'>



          

                <Text>طلب انضمام الى {request.job_vacancy.title} #{request.training_request_id}</Text>

                <FontAwesome name="university" color={'#000000'} size={12} />

                </TouchableOpacity>

            </View>

))}
      
        </View>
        </ScrollView>
    )
}