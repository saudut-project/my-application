import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function RequestsStudent({navigation}){
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = useCallback(async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const response = await fetch(`${url}trainingRequests/myRequests`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch requests');
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
  const renderApprovalStatus = (status) => {
    switch (status) {
      case 'wait':
        return <Text className='text-black '>بالانتظار</Text>;
      case 'approved':
        return <Text className='text-green-500'>تمت الموافقة</Text>;
      case 'rejected':
        return <Text className='text-red-500'>مرفوض</Text>;
      default:
        return <Text>غير معروف</Text>;
    }
  };
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

    return (
        <ScrollView className='w-full'>

      <View className='flex flex-col'>
      {requests.map((request) => (

<TouchableOpacity key={request.training_request_id} onPress={() => navigation.navigate('RequestsDetailsStudentList', { requestId: request.training_request_id })} 
  className='py-4 flex flex-row-reverse justify-between px-5 bg-white border-b  border-gray-200'
  >
          
<View className='flex flex-row'>
  <View className='flex flex-row gap-x-1 justify-center items-center'>

  <Text className=''>
    {request.job_vacancy.title} 
  </Text>
  <FontAwesome name="university" color={'#000000'} size={12} />

  </View>


</View>
<View>
  <Text>

    {renderApprovalStatus(request.status)}
  </Text>
</View>
                </TouchableOpacity>


))}

         
        </View>
        </ScrollView>
    )
}