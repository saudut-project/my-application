import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import url from "../../config/url";

export default function ChencelorList({ navigation }) {
  const [deans, setDeans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeans = async () => {
    try {
      const response = await fetch(url + 'chencelor/all');
      if (!response.ok) {
        console.log(response)
        throw new Error('Failed to fetch deans');
      }
      const data = await response.json();
      setDeans(data);
    } catch (error) {
      setError(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDeans();
    }, [])
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView className='w-full'>
      <View className='flex flex-col'>
        <View className='flex flex-row justify-start mb-2'>
          <TouchableOpacity onPress={() => navigation.navigate('AddChencelor')} className='bg-white border border-slate-400 mt-4 text-black py-3 px-4 rounded-full '>
            <Text className='text-black text-center'>إضافة وكيل</Text>
          </TouchableOpacity>
        </View>
        {deans.map((dean) => (
          <View key={dean.chenclor_id} className='py-4 px-5 bg-white border-b border-gray-200'>
            <TouchableOpacity onPress={() => navigation.navigate('EditChencelor', { deanId: dean.chenclor_id })} className='flex flex-row justify-end gap-x-3'>
              <Text>{dean.username}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}