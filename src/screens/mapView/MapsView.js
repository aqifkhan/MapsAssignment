import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView from 'react-native-maps';
const array = [1, 2, 3, 4, 5, 6]
import { RFPercentage } from "react-native-responsive-fontsize";
import { useGetCardsDataQuery } from '../../redux/apiSlice';
import MapsCardsFlatListView from '../components/MapsCardsFlatListView';
import { Marker } from "react-native-maps";

const MapsView = ({ item }) => {
    const { data: getCardsData, isLoading: cardsDataLoader, isSuccess: cardsDataIsSuccess, refetch: cardsDataRefetch } = useGetCardsDataQuery()
    const cardsView = ({ item }) => {
        return <MapsCardsFlatListView item={item} />
    }
    const [lat, setLat] = useState()
    const [long, setLong] = useState()


    const onViewableItemsChangedRef = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            // const item = viewableItems[0].item;
            const lati = viewableItems[0].item.lat
            const longi = viewableItems[0].item.lon
            console.log('Getting Item =====>>>>%%%', lati, 'Longi is ===>>>', longi)
            setLat(lati)
            setLong(longi)
            // alert(
            //     'Item Visible',
            //     `Item ${viewableItems} is now visible on the screen.`
            // );
        }
    });
    console.log('Latitude is ============>>>>', lat)
    console.log('Longitude  is ============>>>>', long)

    const currentLocation = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    useEffect(() => {
        cardsDataRefetch()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                cardsDataLoader ?
                    <ActivityIndicator size={'large'} color={'black'} />
                    :
                    <MapView style={{ width: '100%', height: '80%' }}
                        // initialRegion={{
                        //     latitude: 28.4212,
                        //     longitude: 70.2989,
                        //     latitudeDelta: 0.0922,
                        //     longitudeDelta: 0.0421,
                        // }}
                        region={currentLocation}

                    >
                        <Marker coordinate={currentLocation} pinColor="green"
                            title='Its me'
                            description='hello how are you'

                        />
                    </MapView>
            }

            <View style={{ backgroundColor: '#FFFFFF', height: '20%', width: '100%', justifyContent: 'center' }}>
                {cardsDataLoader ? (
                    <ActivityIndicator size={'large'} color={'black'} />
                ) : (
                    <View // Wrapper component to attach onViewableItemsChanged listener
                    // style={{ flex: 1 }}
                    // onLayout={({ nativeEvent }) => {
                    //     const { width } = nativeEvent.layout;
                    //     // Calculate item width based on your card component
                    //     const itemWidth = width / 2;
                    //     // Calculate the number of items that can be shown at once
                    //     const visibleItemsCount = Math.ceil(width / itemWidth);
                    //     // Adjust the threshold based on the visibleItemsCount
                    //     const viewAreaCoveragePercentThreshold = (1 / visibleItemsCount) * 100;
                    //     // Update the viewability config
                    //     onViewableItemsChangedRef.current.viewabilityConfig = {
                    //         viewAreaCoveragePercentThreshold,
                    //     };
                    // }}
                    >
                        <FlatList
                            data={getCardsData?.results}
                            renderItem={cardsView}
                            horizontal
                            style={{ marginVertical: RFPercentage(1) }}
                            onViewableItemsChanged={onViewableItemsChangedRef.current}
                            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default MapsView

const styles = StyleSheet.create({})
