import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'

const MapsCardsFlatListView = ({ item }) => {
    console.log('Getting Items =============>>>>>>>>>>>>>>>>>>>', item)
    return (
        <TouchableOpacity
            style={{ backgroundColor: '#F5F5DC', width: RFPercentage(48), marginHorizontal: RFPercentage(1.5), borderRadius: 10, justifyContent: 'center' }}
        // onPress={()=>alert('hii')}
        >
            <View style={{  flexDirection: 'row', marginHorizontal: 5 }}>
                <View style={{}}>
                    <Image
                        source={{ uri: item.featured_image }}
                        style={{ width: RFPercentage(14), height: RFPercentage(17), borderRadius: 10 }}
                    />
                </View>
                <View style={{ width: '68%', marginLeft: 5,justifyContent:'center' }}>
                    <View style={{}}>
                        <Text style={{ fontSize: 15 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Name</Text>  {item.name.slice(0, 30)}...
                        </Text>

                        <Text style={{ marginVertical: 3 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Address</Text>  {item.addres == "" ? null : item.address}
                        </Text>
                        
                        <Text style={{}}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Timings</Text>  {item.timings}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{position:'absolute',right:0,bottom:0,backgroundColor:'yellow',paddingRight:15,paddingBottom:5,paddingLeft:3,borderTopLeftRadius:10}}>
            {
                item.is_open ? <Text style={{fontWeight:'bold'}}>Opned</Text> : <Text style={{fontWeight:'bold'}}>Closed</Text>
            }
            </View>
        </TouchableOpacity>
    )
}

export default MapsCardsFlatListView

const styles = StyleSheet.create({})