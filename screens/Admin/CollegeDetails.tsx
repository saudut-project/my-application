import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import RNPickerSelect from 'react-native-picker-select';

export default function CollegeDetails({ navigation, route }) {
  const { collegeId } = route.params;
  const { control, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        const response = await fetch(`https://9c3b-136-144-45-50.ngrok-free.app/api/college/${collegeId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch college details');
        }
        const data = await response.json();
        setValue("name", data.name);
        // Set other fields as necessary
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchCollegeDetails();
  }, [collegeId, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://9c3b-136-144-45-50.ngrok-free.app/api/college/update/${collegeId}`, {
        method: 'POST', // Use PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to update college details');
      }

      Alert.alert('Success', 'College details updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView className='w-full mt-8'>
      <View className='flex flex-col'>
        <View className='flex flex-row mx-2 justify-end'>
          <TouchableOpacity onPress={() => navigation.goBack()} className='bg-slate-400 py-3 px-4 w-28 text-center'>
            <Text className='text-center'>الرجوع للخلف</Text>
          </TouchableOpacity>
        </View>
        <View className='flex flex-col py-2 px-2'>
          <Text>معلومات الكلية</Text>
        </View>
        <View className='py-2 px-2'>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className='bg-slate-200 px-3 py-2'
                placeholder="كلية الحاسبات"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View className='py-2 px-2'>
          <View className='bg-slate-200 px-3 py-2'>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={[
                { label: 'د.احمد', value: 'dr_ahmed' },
                { label: 'د.فيصل', value: 'dr_faisal' },
                { label: 'د.عماد', value: 'dr_imad' },
              ]}
            />
          </View>
        </View>
        <View className='py-4 px-4'>
          <TouchableOpacity onPress={handleSubmit(onSubmit)} className="bg-slate-600 mt-4 text-white py-3 px-4 rounded-full ">
            <Text className="text-white text-center">
              حفظ التغيرات
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}