import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useGetCardsDataQuery } from '../../redux/apiSlice';
import MapsCardsFlatListView from '../components/MapsCardsFlatListView';

const MapsView = ({ item }) => {

  const {cardsContainer,container,flatList,map,markerContainer,markerDot,markerImage} = styles
  const { data: getCardsData, isLoading: cardsDataLoader, isSuccess: cardsDataIsSuccess, refetch: cardsDataRefetch } = useGetCardsDataQuery();
  const cardsView = ({ item }) => {
    return <MapsCardsFlatListView item={item} />;
  };
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [mapImage, setMapImage] = useState(null);

  const onViewableItemsChangedRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const lati = viewableItems[0].item.lat;
      const longi = viewableItems[0].item.lon;
      const thumbnail = viewableItems[0].item.thumbnail;
      setMapImage(thumbnail);
      setLat(lati);
      setLong(longi);
    }
  });

  const CustomMarker = () => (
    <View style={markerContainer}>
      <Image source={{ uri: mapImage }} style={markerImage} />
      <View style={markerDot} />
    </View>
  );

  const currentLocation = {
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    cardsDataRefetch();
  }, []);

  return (
    <SafeAreaView style={container}>
      {cardsDataLoader ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : (
        <MapView style={map} region={currentLocation}>
          <Marker coordinate={currentLocation}>
            <CustomMarker />
          </Marker>
        </MapView>
      )}

      <View style={cardsContainer}>
        {cardsDataLoader ? (
          <ActivityIndicator size={'large'} color={'black'} />
        ) : (
          <View>
            <FlatList
              data={getCardsData?.results}
              renderItem={cardsView}
              style={flatList}
              onViewableItemsChanged={onViewableItemsChangedRef.current}
              viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MapsView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  markerDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    alignSelf: 'center',
    marginTop: 3,
  },
  cardsContainer: {
    // backgroundColor: '#FFFFFF',
    // height: '20%',
    width: '100%',
    justifyContent: 'center',
    position:'absolute',
    bottom:10
  },
  flatList: {
    marginVertical: RFPercentage(1),
  },
});
