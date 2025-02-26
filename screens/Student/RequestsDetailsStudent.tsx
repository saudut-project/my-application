import React, { useEffect, useState } from "react";
import { View,Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import url from "../../config/url";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RequestsDetailsStudent({navigation,route}){
  const { jobId } = route.params;
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${url}jobVacancies/show/${jobId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }

        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        setError(error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);
  const handleApply = async () => {
    const token = await AsyncStorage.getItem('authToken');
    try {
      const response = await fetch(`${url}trainingRequests/store`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          job_vacancy_id: jobId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(response)
        throw new Error(errorData.error || 'Failed to submit application');
      }

      Alert.alert('Success', 'Application submitted successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
    return (
      <ScrollView className='w-full mt-8'>

      <View className='flex flex-col'>
        <View className='flex flex-row mx-2 justify-end'>
          <TouchableOpacity onPress={() => navigation.goBack()} className='bg-slate-400 py-3 px-4 w-28 text-center'>
            <Text className='text-center'>الرجوع للخلف</Text>
          </TouchableOpacity>
        </View>
        <View className='flex flex-col py-2 px-2'>
<Text>معلومات الطلب</Text>
        </View>
       
    <View className='flex flex-col'>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>عنوان الطلب</Text>
        </View>
        <View className='py-3 px-3'>
        <Text className=' mb-2'>{jobDetails.title}</Text>

        </View>

     
     
     
      </View>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>وصف الطلب</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
        {jobDetails.description}
            
        </Text>
        </View>

     
     
     
      </View>

      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>المتطلبات</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
        {jobDetails.requirements}
            
        </Text>
        </View>

     
     
     
      </View>
      <Text></Text>
    </View>
    <TouchableOpacity onPress={handleApply} className="bg-green-600 mt-4 text-white py-3 px-4 rounded-full ">
        <Text className="text-white text-center">
          طلب التقديم
        </Text>
      </TouchableOpacity>

    

        </View>
        </ScrollView>

    )
}