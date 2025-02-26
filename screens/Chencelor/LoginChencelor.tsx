import { Text, TextInput, TouchableOpacity, View,Image } from 'react-native';
import { useState } from 'react';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginChencelor({ navigation }: { navigation: any }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userType = 'chenclor'; // Assuming the user type is fixed for this component
    const handleLogin = async () => {
        try {
            const response = await fetch(url + 'login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    user_type: userType,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const { token, user } = data;
                console.log('Login successful:', user);
                await AsyncStorage.setItem('authToken', token);
                // التنقل الى شاشة العميد
                navigation.navigate('DashboardChencelor');
                
            } else if (response.status === 401) {
                console.error('Invalid credentials');
            } else {
                console.error('An error occurred:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    return (
        <View className='flex flex-col min-h-screen bg-white'>
            <View className="flex flex-col justify-end items-end w-full">
                <TouchableOpacity onPress={() => navigation.goBack()} className="bg-indigo-500 mt-8 mx-2 text-white py-3 px-4 rounded-full">
                    <Text className="text-white text-center font-cairo">
                        الرجوع
                    </Text>
                </TouchableOpacity>
            </View>
            <View className="flex flex-col min-h-screen items-center justify-center">
                <View>
                    <View className='flex flex-row-reverse gap-x-2 mb-1 items-center '>
                    <Image source={require('../../assets/login.png')} className='w-4 rounded-lg h-4  bg-indigo-500' />
                    <Text className='text-black font-cairo'>اسم المستخدم</Text>
                    </View>
                    <View className='flex flex-row-reverse gap-x-2 mb-1 items-center '>

                    <TextInput
                        className='bg-white w-[200px] rounded-xl 
                        py-2 px-3 border border-indigo-500 font-cairo text-right'
                        value={username}
                        onChangeText={setUsername}
                    />
                    </View>
                    <View className='flex flex-row-reverse gap-x-2 mb-1 items-center '>
                    <Image source={require('../../assets/password.png')} className='w-4 rounded-lg h-4  bg-indigo-500' />

                    <Text className='text-black mt-2 font-cairo'>كلمة المرور</Text>
</View>
                    <TextInput
                        secureTextEntry={true}
                        className='bg-white w-[200px] rounded-xl 
                        py-2 px-3 border border-indigo-500 font-cairo text-right'                        placeholder='*****'
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity onPress={handleLogin} className="bg-indigo-500 mt-4 text-white py-3 px-4 rounded-full">
                        <Text className="text-white text-center font-cairo">
                            تسجيل الدخول
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}