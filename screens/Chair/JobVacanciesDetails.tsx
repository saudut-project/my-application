import React from 'react';
import { View, Text, Button, Alert,ScrollView,TouchableOpacity } from 'react-native';
import url from "../../config/url";
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobVacancyDetailsScreen = ({ route, navigation }) => {
    const { job } = route.params;

    const updateJobStatus = async (id, status) => {
        const token = await AsyncStorage.getItem('authToken');

        try {
            const response = await fetch(url+`jobVacancies/update-status/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,

                },
                body: JSON.stringify({ status }),
            });
            if (response.ok) {
                Alert.alert('Success', 'تم تحديث الطلب');
                navigation.goBack(); // Go back to the list screen
            } else {
                console.log(response)
                Alert.alert('Error', 'Failed to update job status');
            }
        } catch (error) {
            console.error('Error updating job status:', error);
        }
    };

    return (
        
        <ScrollView className='w-full mt-8'>

      <View className='flex flex-col'>
        <View className='flex flex-row mx-2 justify-end'>
          <TouchableOpacity onPress={() => navigation.goBack()} className='bg-slate-400 py-3 px-4 w-28 text-center'>
            <Text className='text-center'>الرجوع للخلف</Text>
          </TouchableOpacity>
        </View>
        <View className='flex flex-col py-2 px-2'>
<Text className='text-right'>معلومات الطلب</Text>
        </View>
       
    <View className='flex flex-col'>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>عنوان الطلب</Text>
        </View>
        <View className='py-3 px-3'>
        <Text className=' mb-2'>{job.title}</Text>

        </View>

     
     
     
      </View>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>وصف الطلب</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
        {job.description}
            
        </Text>
        </View>

     
     
     
      </View>

      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>المتطلبات</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
        {job.requirements}
            
        </Text>
        </View>

     
     
     
      </View>
      <Text></Text>
    </View>
      
         <TouchableOpacity onPress={() => updateJobStatus(job.job_vacancy_id, 1)} className="bg-green-600 mt-4 text-white py-3 px-4 rounded-full ">
        <Text className="text-white text-center">
        موافقة
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateJobStatus(job.job_vacancy_id, 2)} className="bg-red-600 mt-4 text-white py-3 px-4 rounded-full ">
        <Text className="text-white text-center">
        رفض الطلب
        </Text>
      </TouchableOpacity>


    

        </View>
        </ScrollView>


        // <View>
        //     <Text>{job.title}</Text>
        //     <Text>{job.description}</Text>
        //     <Text>{job.requirements}</Text>
        //     <Button title="Approve" onPress={() => updateJobStatus(job.job_vacancy_id, 1)} />
        //     <Button title="Reject" onPress={() => updateJobStatus(job.job_vacancy_id, 2)} />
        // </View>
    );
};

export default JobVacancyDetailsScreen;