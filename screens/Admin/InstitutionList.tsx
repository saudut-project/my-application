import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import url from "../../config/url";

export default function InstitutionList({ navigation }) {
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInstitutions = async () => {
    try {
      const response = await fetch(url + 'institutions/all');
      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to fetch institutions');
      }
      const data = await response.json();
      setInstitutions(data);
    } catch (error) {
      setError(error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchInstitutions();
    }, [])
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <ScrollView className='w-full'>
      <View className='flex flex-col'>
        <View className='flex flex-row justify-start mb-2'>
          <TouchableOpacity onPress={() => navigation.navigate('AddInstitution')} className='bg-white border border-slate-400 mt-4 text-black py-3 px-4 rounded-full '>
            <Text className='text-black text-center font-cairo'>اضافة المنشأة</Text>
          </TouchableOpacity>
        </View>
        {institutions.map((institution) => (
          <View key={institution.institution_id} className='py-4 px-5 bg-white border-b border-gray-200'>
            <TouchableOpacity onPress={() => navigation.navigate('UpdateInstitution', { institutionId: institution.institution_id })} className='flex flex-row justify-end gap-x-3'>
              <Text>{institution.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}