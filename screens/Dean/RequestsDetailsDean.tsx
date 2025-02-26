import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RequestsDetailsDean({ route, navigation }: { route: any, navigation: any }) {
  const { requestId } = route.params;
  const [requestDetails, setRequestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleApprove = async () => {
    const token = await AsyncStorage.getItem('authToken');
    console.log(token);
    try {
      const response = await fetch(`${url}training-requests/${requestId}/approve/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: 'dean',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error || 'Failed to approve request');
      }

      Alert.alert('Success', 'Training request approved successfully');
      // Optionally, refresh the request details or navigate back
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(`${url}trainingRequests/view/${requestId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch request details');
        }

        const data = await response.json();
        setRequestDetails(data);
      } catch (error) {
        setError(error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [requestId]);
  const renderApprovalStatus = (status) => {
    switch (status) {
      case 'wait':
        return <Text className='text-black '>بالانتظار</Text>;
      case 'approved':
        return <Text className='text-black'>تمت الموافقة</Text>;
      case 'rejected':
        return <Text className='text-red-500'>مرفوض</Text>;
      default:
        return <Text>غير معروف</Text>;
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
        <Text>
        {requestDetails?.job_vacancy.title}
        </Text>
        </View>

     
     
     
      </View>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>وصف الطلب</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
        {requestDetails?.job_vacancy.description}
        </Text>
        </View>

     
     
     
      </View>
      <Text></Text>
    </View>


    <View className='flex flex-col py-2 px-2'>
<Text>معلومات مقدم الطلب</Text>
        </View>
       
    <View className='flex flex-col'>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>اسم مقدم الطلب</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
          {requestDetails?.student.username}
        </Text>
        </View>

     
     
     
      </View>
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>الكلية</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
          {requestDetails?.college.name}
        </Text>
        </View>

     
     
     
      </View>

      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>القسم</Text>
        </View>
        <View className='py-3 px-3'>
        <Text>
        {requestDetails?.department.name}
        </Text>
        </View>

     
     
     
      </View>
      <Text></Text>
    </View>

    <View className='flex flex-col py-2 px-2'>
<Text>الاجراءات</Text>
        </View>

    <FlatList
      data={requestDetails?.status_lists}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View className='flex flex-row-reverse mb-2 bg-white py-2 px-2'>
          <Text className='text-black'>
            {item.note} 
          </Text>
        </View>
      )}
    />

    <View className='flex flex-col py-2 px-2'>
<Text>الموافقات</Text>
        </View>
       
    <View className='flex flex-col'>
    {requestDetails?.approves.chairperson && (

      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>رئيس القسم</Text>
        </View>
        <View className={`py-2 px-2 ${requestDetails.approves.chairperson.status === 'approved' ? 'bg-green-500' : requestDetails.approves.chairperson.status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'} rounded flex items-center mt-2 h-[32px]`}>
        <Text>
          
        {renderApprovalStatus(requestDetails.approves.chairperson.status)}
          
        </Text>
        </View>
             </View>

       )}

     
{requestDetails?.approves.dean && (

     
      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>عميد الكلية</Text>
        </View>
        <View className={`py-2 px-2 ${requestDetails.approves.dean.status === 'approved' ? 'bg-green-500' : requestDetails.approves.dean.status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'} rounded flex items-center mt-2 h-[32px]`}>
        <Text>
          
        {renderApprovalStatus(requestDetails.approves.dean.status)}
          
        </Text>
        </View>

     
     
     
      </View>


)}
{requestDetails?.approves.institution && (


      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>جهة التدريب</Text>
        </View>
        <View className={`py-2 px-2 ${requestDetails.approves.institution.status === 'approved' ? 'bg-green-500' : requestDetails.approves.institution.status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'} rounded flex items-center mt-2 h-[32px]`}>
        <Text>
          
        {renderApprovalStatus(requestDetails.approves.institution.status)}
          
        </Text>
        </View>


     
     
     
      </View>

    )}
      <View>
      <View className='py-4 px-4'>
      <TouchableOpacity onPress={handleApprove} className='bg-blue-500 mt-4 text-white py-3 px-4 rounded-full'>
      <Text className="text-white text-center">
          موافقة على الطلب
        </Text>
      </TouchableOpacity>
      <TouchableOpacity  className="bg-red-600 mt-4 text-white py-3 px-4 rounded-full "> 
        <Text className="text-white text-center">
          رفض الطلب
        </Text>
      </TouchableOpacity>
      </View>
      </View>
      <Text></Text>
    </View>

    
        </View>
        </ScrollView>

    )
}