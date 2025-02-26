import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import url from '../../config/url';

export default function AddInstitution({ navigation }) {
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
    const fetchRepresentatives = async () => {
      try {
        const response = await fetch(url + 'representatives/all');
        if (!response.ok) {
          throw new Error('Failed to fetch representatives');
        }
        const data = await response.json();
        setRepresentatives(data);
      } catch (error) {
        setError(error);
        Alert.alert('Error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepresentatives();
  }, []);

  const handleAddInstitution = async () => {
    try {
        console.log(
            JSON.stringify({
                name,
                address,
                representative_id: representativeId,
                representative: { username, password, email }
              })
        )
      const response = await fetch(url + 'insertInstitution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          address,
          representative_id: representativeId,
          representative: { username, password, email }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add institution');
      }

      Alert.alert('Success', 'Institution added successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View className='flex flex-col bg-white'>
      <View className='flex flex-row mx-2 mt-10 justify-end'>
      <TouchableOpacity onPress={() => navigation.goBack()} className='bg-indigo-600  py-3 px-4 w-28 text-center'>
          <Text className='text-center font-cairo text-white'>الرجوع</Text>
        </TouchableOpacity>
      </View>
    
      <View className='flex flex-col py-2 px-2'>
        <Text className='font-cairo text-base'>اسم المنشأة</Text>
        <TextInput
          className='bg-slate-200 px-3 py-2 font-cairo'
          placeholder="اكتب اسم المنشأة هنا"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='font-cairo text-base'>العنوان</Text>
        <TextInput
          className='bg-slate-200 px-3 py-2 font-cairo'
          placeholder="اكتب العنوان هنا"
          value={address}
          onChangeText={setAddress}
        />
      </View>
  
      <View className='flex flex-col py-2 px-2'>
        <Text className='font-cairo text-base'>اسم المستخدم</Text>
        <TextInput
          className='bg-slate-200 px-3 py-2 font-cairo'
          placeholder="اكتب اسم المستخدم هنا"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text className='font-cairo text-base'>كلمة المرور</Text>
        <TextInput
          className='bg-slate-200 px-3 py-2 font-cairo'
          placeholder="اكتب كلمة المرور هنا"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View className='flex flex-col py-2 px-2'>
        <Text>البريد الالكتروني</Text>
        <TextInput
          className='bg-slate-200 px-3 py-2 font-cairo'
          placeholder="اكتب البريد الالكتروني هنا"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity onPress={handleAddInstitution} className="bg-indigo-600 mt-4 text-white py-3 px-4 rounded-full ">
        <Text className="text-white text-center font-cairo">
          اضافة المنشأة
        </Text>
      </TouchableOpacity>
    </View>
  );
}