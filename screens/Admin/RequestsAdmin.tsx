import { View,Text, ScrollView, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function RequestsAdmin({navigation}){
    return (
        <ScrollView className='w-full'>

      <View className='flex flex-col'>
            <View className='py-4 px-5 bg-white border-b border-gray-200'>
              <TouchableOpacity onPress={() => navigation.navigate('RequestsDetails')} className='flex flex-row justify-end gap-x-3'>
          

                <Text>طلب انضمام الى شركة المهيدب #100000</Text>

                <FontAwesome name="university" color={'#000000'} size={12} />

                </TouchableOpacity>

            </View>
            <View className='py-4 px-5 bg-white border-b border-gray-200'>
              <TouchableOpacity className='flex flex-row justify-end gap-x-3'>
          

              <Text>طلب انضمام الى شركة المهيدب #100000</Text>

                <FontAwesome name="university" color={'#000000'} size={12} />

                </TouchableOpacity>

            </View>
            <View className='py-4 px-5 bg-white border-b border-gray-200'>
              <TouchableOpacity className='flex flex-row justify-end gap-x-3'>
          

              <Text>طلب انضمام الى شركة المهيدب #100000</Text>

                <FontAwesome name="university" color={'#000000'} size={12} />

                </TouchableOpacity>

            </View>
            <View className='py-4 px-5 bg-white border-b border-gray-200'>
              <TouchableOpacity className='flex flex-row justify-end gap-x-3'>
          

              <Text>طلب انضمام الى شركة المهيدب #100000</Text>

                <FontAwesome name="university" color={'#000000'} size={12} />

                </TouchableOpacity>

            </View>
            <View className='py-4 px-5 bg-white border-b border-gray-200'>
              <TouchableOpacity className='flex flex-row justify-end gap-x-3'>
          

              <Text>طلب انضمام الى شركة المهيدب #100000</Text>

                <FontAwesome name="university" color={'#000000'} size={12} />

                </TouchableOpacity>

            </View>
        </View>
        </ScrollView>
    )
}