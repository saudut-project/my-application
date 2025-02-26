import { View,Text, ScrollView, TouchableOpacity,Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Institutions({navigation}){
    return (
        <ScrollView className='w-full'>

        <View className='flex flex-col'>
              <View className='py-4 px-5 bg-white border-b border-gray-200'>
                <TouchableOpacity onPress={() => navigation.navigate('institutionDetails')} className='flex flex-row justify-end gap-x-3'>
            
  
                  <Text>شركة نيوم</Text>
                  <Image
                  width={20}
                  height={25}
                  
        source={{
          uri: 'https://seeklogo.com/images/N/neom-logo-8D73A48B82-seeklogo.com.png',
        }}
      />
                  </TouchableOpacity>
  
              </View>
              <View className='py-4 px-5 bg-white border-b border-gray-200'>
                <TouchableOpacity className='flex flex-row justify-end gap-x-3'>
            
  
                  <Text>شركة Mobily</Text>
                  <Image
                  width={20}
                  height={25}
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSo1Evi9gAEPB6FbTFLB9RBUhoQtk8aTp6-Q&s',
        }}
      />
                  </TouchableOpacity>
  
              </View>
        
          </View>
          </ScrollView>
    )
}