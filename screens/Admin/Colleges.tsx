import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import url from "../../config/url";

export default function Colleges({ navigation }) {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchColleges = async () => {
    try {
      const response = await fetch(url+'colleges');
      if (!response.ok) {
        throw new Error('Failed to fetch colleges');
      }
      const data = await response.json();
      setColleges(data);
    } catch (error) {
      setError(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchColleges();
    }, [])
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView className='w-full'>
      <View className='flex flex-col'>
        <View className='flex flex-row justify-start mb-2'>
          <TouchableOpacity 
          
          onPress={() => navigation.navigate('AddCollege')} className='bg-white border border-slate-400 mt-4 text-black py-3 px-4 rounded-full '>
            <Text className='text-black text-center  font-cairo'
            
           
            
            >اضافة كلية</Text>
          </TouchableOpacity>
        </View>
        {colleges.map((college) => (
          <View key={college.college_id} className='py-4 px-5 bg-white border-b border-gray-200'>
            <TouchableOpacity onPress={() => navigation.navigate('UpdateCollege', { collegeId: college.college_id })} className='flex flex-row justify-end gap-x-3'>
              <Text>{college.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}