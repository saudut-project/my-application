import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import url from "../../config/url";

export default function AddChairPerson({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddChairPerson = async () => {
    if (!username || !email) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(url + 'chairpersons/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to add chairperson');
      }

      Alert.alert("Success", "Chairperson added successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className='p-4 mt-10'>
      <Button title="الرجوع" onPress={() => navigation.goBack()} />
      <Text className='text-lg mb-2'>إضافة رؤساء القسم</Text>
      <TextInput
        placeholder="الاسم"
        value={username}
        onChangeText={setUsername}
        className='border p-2 mb-2'
      />
      <TextInput
        placeholder="البريد الالكتروني"
        value={email}
        onChangeText={setEmail}
        className='border p-2 mb-4'
      />
        <TextInput
        className='border p-2 mb-4'
        placeholder="كلمة المرور"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      <Button title="إضافة" onPress={handleAddChairPerson} />
    </View>
  );
}