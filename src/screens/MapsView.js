import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';
const array = [1, 2, 3, 4, 5, 6]
import { RFPercentage } from "react-native-responsive-fontsize";

const MapsView = () => {

    const cardsView = () => {
        return (
            <View style={{ backgroundColor: 'green',width:RFPercentage(48),marginHorizontal:RFPercentage(1.5),borderRadius:10 }}>
                <Text>Aqif</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView style={{ width: '100%', height: '80%' }}
                initialRegion={{
                    latitude: 28.4212,
                    longitude: 70.2989,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} />
            <View style={{ backgroundColor: 'red', height: '20%', width: '100%',justifyContent:'center' }}>
                <FlatList
                    data={array}
                    renderItem={cardsView}
                    horizontal
                    style={{marginVertical:RFPercentage(1),backgroundColor:'pink'}}
                />
            </View>
        </SafeAreaView>
    )
}

export default MapsView

const styles = StyleSheet.create({})