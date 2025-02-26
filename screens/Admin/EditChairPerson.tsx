import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import url from "../../config/url";

export default function EditChairPerson({ route, navigation }) {
  const { chairPersonId } = route.params;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChairPerson = async () => {
      try {
        const response = await fetch(`${url}chairpersons/show/${chairPersonId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chairperson details');
        }
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChairPerson();
  }, [chairPersonId]);

  const handleUpdateChairPerson = async () => {
    if (!username || !email) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${url}chairpersons/update/${chairPersonId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to update chairperson');
      }

      Alert.alert("Success", "Chairperson updated successfully");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <View className='p-4 mt-10'>
              <Button title="Back" onPress={() => navigation.goBack()} />

      <Text className='text-lg mb-2'>Edit ChairPerson</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        className='border p-2 mb-2'
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className='border p-2 mb-4'
      />
      <Button title="Update ChairPerson" onPress={handleUpdateChairPerson} />
    </View>
  );
}