import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {

    const animation = useRef(null);
    const animationPath = '../assets/animatins/animation_ljzjryqf.json'

    setTimeout(() => {

        navigation.replace('Map')
        // alert('huu')
    }, 3000)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    // width: 200,
                    // height: 200,
                    // backgroundColor: '#eee',
                    flex:1
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require(animationPath)}
            />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})