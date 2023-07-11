import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import MapView from 'react-native-maps';
const array = [1, 2, 3, 4, 5, 6]
import { RFPercentage } from "react-native-responsive-fontsize";
import { useGetCardsDataQuery } from '../../redux/apiSlice';
import MapsCardsFlatListView from '../components/MapsCardsFlatListView';

const MapsView = ({ item }) => {

    const { data: getCardsData, isLoading: cardsDataLoader, isSuccess: cardsDataIsSuccess, refetch: cardsDataRefetch } = useGetCardsDataQuery()

    const cardsView = ({item}) => {
        return <MapsCardsFlatListView item={item}/>
    }
    console.log('DATA ===================>>>>>>>>>>>>>>>', getCardsData)
    useEffect(() => {
        cardsDataRefetch()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MapView style={{ width: '100%', height: '80%' }}
                initialRegion={{
                    latitude: 28.4212,
                    longitude: 70.2989,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }} />
            <View style={{ backgroundColor: '#FFFFFF', height: '20%', width: '100%', justifyContent: 'center' }}>
                {
                    cardsDataLoader ? <ActivityIndicator size={'large'} color={'black'} />
                        :
                        <FlatList
                            data={getCardsData.results}
                            renderItem={cardsView}
                            horizontal
                            style={{ marginVertical: RFPercentage(1) }}
                        />
                }

            </View>
        </SafeAreaView>
    )
}

export default MapsView

const styles = StyleSheet.create({})