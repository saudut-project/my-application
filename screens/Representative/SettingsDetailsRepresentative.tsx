import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateInstitution({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [representativeId, setRepresentativeId] = useState('');
  const [representatives, setRepresentatives] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    




    const fetchInstitutionDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const institutionResponse = await fetch(`${url}institutions/myInstitutions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });     
           const representativeResponse = await fetch(url + 'representatives/all');
        if (!institutionResponse.ok || !representativeResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const institutionData = await institutionResponse.json();
        setName(institutionData[0].name);
        setAddress(institutionData[0].address);
       
      } catch (error) {
        setError(error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutionDetails();
  }, []);

  const handleUpdateInstitution = async () => {
    const token = await AsyncStorage.getItem('authToken');

    try {
      const response = await fetch(`${url}institutions/updateMyInstitution`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify({
         
            name:name,
            address:address,
        
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update institution');
      }

      Alert.alert('Success', 'Institution updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View className='flex flex-col'>
      <View className='flex flex-row mx-2 mt-10 justify-end'>
        <TouchableOpacity onPress={() => navigation.goBack()} className='bg-slate-400 py-3 px-4 w-28 text-center'>
          <Text className='text-center'>Back</Text>
        </TouchableOpacity>
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>Institution Name</Text>
        <TextInput
          className='bg-slate-200 px-3 py-2'
          placeholder="Enter institution name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>Address</Text>
        <TextInput
          className='bg-slate-200 px-3 py-2'
          placeholder="Enter address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity onPress={handleUpdateInstitution} className="bg-slate-600 mt-4 text-white py-3 px-4 rounded-full ">
        <Text className="text-white text-center">
          Save Changes
        </Text>
      </TouchableOpacity>
    </View>
  );
}