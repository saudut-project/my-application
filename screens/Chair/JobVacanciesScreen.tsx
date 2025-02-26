import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import url from '../../config/url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobVacanciesListScreen = () => {
    const [jobVacancies, setJobVacancies] = useState([]);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            fetchJobVacancies();
        }, [])
    );

    const fetchJobVacancies = async () => {
        const token = await AsyncStorage.getItem('authToken');

        try {
            const response = await fetch(url+'jobVacancies/fetching/new',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
            });
            const data = await response.json();
            setJobVacancies(data);
        } catch (error) {
            console.error('Error fetching job vacancies:', error);
        }
    };

    const renderJobItem = ({ item }) => (
        <View className='py-4 flex justify-end px-3 bg-white bodder-b'>

        <TouchableOpacity className='text-left' onPress={() => navigation.navigate('JobVacanciesDetails', { job: item })}>
            <Text className='text-right mx-2'>{item.title}</Text>
        </TouchableOpacity>
        </View>

    );

    return (
        <View>
            <FlatList
                data={jobVacancies}
                renderItem={renderJobItem}
                keyExtractor={(item) => item.job_vacancy_id.toString()}
            />
        </View>
    );
};

export default JobVacanciesListScreen;