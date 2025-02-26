import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity } from 'react-native';
import url from '../../config/url';

export default function RequestsDetailsStudentList({ route, navigation }: { route: any, navigation: any }) {
  const { requestId } = route.params;
  const [requestDetails, setRequestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <Text className='text-black w-[300px]'>
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
<Text>الموافقات</Text>
        </View>
       
    <View className='flex flex-col'>
    {requestDetails?.approves.chairperson && (

      <View className='flex flex-row-reverse  bg-white'>
        <View className='py-3 px-3'>
          <Text>رئيس القسم</Text>
        </View>
        <View className={`py-2 px-2 ${requestDetails.approves.chairperson.status === 'approved' ? 'bg-green-500' : requestDetails.approves.dean.status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'} rounded flex items-center mt-2 h-[32px]`}>
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
        <View className={`py-2 px-2 ${requestDetails.approves.dean.status === 'approved' ? 'bg-green-500' : requestDetails.approves.dean.status === 'rejected' ? 'bg-red-500' : 'bg-gray-500'} rounded flex items-center mt-2 h-[32px]`}>
        <Text>
          
        {renderApprovalStatus(requestDetails.approves.dean.status)}
          
        </Text>
        </View>


     
     
     
      </View>

    )}
      <View>
      <View className='py-4 px-4'>
   
      </View>
      </View>
      <Text></Text>
    </View>
        </View>
        </ScrollView>

    )
}