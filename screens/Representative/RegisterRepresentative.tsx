import { Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function RegisterRepresentative({navigation}){
    return (
        <View className='flex flex-col min-h-screen  bg-[#00509d]'>
            <View className="flex flex-col justify-end items-end w-full">
            <TouchableOpacity onPress={() =>navigation.goBack() } className="bg-sky-900 mt-8 mx-2 text-white py-3 px-4 rounded-full ">
    <Text className="text-white text-center">
        الرجوع
    </Text>
</TouchableOpacity> 
            </View>
            <View className="flex flex-col min-h-screen items-center justify-center">

            <View>
            <Text className='text-white'>اسم المستخدم</Text>
            <TextInput className='bg-white w-[200px] rounded-full text-right ' placeholder='اكتب ايميلك هنا' />

            <Text className='text-white'>البريد الالكتروني</Text>
            <TextInput className='bg-white w-[200px] rounded-full text-right ' placeholder='اكتب ايميلك هنا' />

            <Text className='text-white'>كلمة المرور</Text>
            <TextInput secureTextEntry={true} className='bg-white w-[200px] rounded-full placeholder:text-right ' placeholder='*****' />

<View className='flex flex-row justify-center'>
<TouchableOpacity className="bg-sky-900 mt-4 text-white py-3 px-4 rounded-full ">
    <Text className="text-white text-center">
        تسجيل جديد
    </Text>
</TouchableOpacity>


</View>

            </View>
            </View>

        </View>
    )
}