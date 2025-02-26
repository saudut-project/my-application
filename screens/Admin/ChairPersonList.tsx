import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import url from "../../config/url";

export default function ChairPersonList({ navigation }) {
  const [chairPersons, setChairPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChairPersons = async () => {
    try {
      const response = await fetch(url + 'chairpersons/all');
      if (!response.ok) {
        throw new Error('Failed to fetch chairpersons');
      }
      const data = await response.json();
      setChairPersons(data);
    } catch (error) {
      setError(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchChairPersons();
    }, [])
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView className='w-full'>
      <View className='flex flex-col'>
        <View className='flex flex-row justify-start mb-2'>
          <TouchableOpacity onPress={() => navigation.navigate('AddChairPerson')} className='bg-white border border-slate-400 mt-4 text-black py-3 px-4 rounded-full '>
            <Text className='text-black text-center'>إضافة رؤساء القسم</Text>
          </TouchableOpacity>
        </View>
        {chairPersons.map((chairPerson) => (
          <View key={chairPerson.chairperson_id} className='py-4 px-5 bg-white border-b border-gray-200'>
            <TouchableOpacity onPress={() => navigation.navigate('EditChairPerson', { chairPersonId: chairPerson.chairperson_id })} className='flex flex-row justify-end gap-x-3'>
            <Text>{chairPerson.username}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}