import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SplashScreen = ({navigation}) => {

    setTimeout(() => {

        navigation.navigate('Map')
        // alert('huu')
    }, 2000)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>SplashScreen</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})