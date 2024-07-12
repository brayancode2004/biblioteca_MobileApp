import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native';
import Animated, { ZoomOut } from 'react-native-reanimated';
import 'react-native-reanimated';
import Colors from '../constants/Colors';
import { Image } from 'expo-image';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const AnimatedSplashScreen = ({
  onAnimationFinish = (isCancelled) => {},
}: {
  onAnimationFinish?: (isCancelled: boolean) => void;
}) => {
  const animation = useRef<LottieView>(null);

  return (
    <Animated.View style={styles.container}>
      <AnimatedLottieView
        exiting={ZoomOut}
        ref={animation}
        onAnimationFinish={onAnimationFinish}
        loop={false}
        autoPlay
        style={{
          width: '60%',
          height: 200,
          maxWidth: 400,
        }}
        source={require('../../assets/lottie/bookSplash.json')}
      />
      <Animated.Image source={require('../../assets/splashTitle.png')} style={{width: 230, height: 80, marginTop: -20, marginLeft: 20}} exiting={ZoomOut}/>
    </Animated.View>
  );
};

export default AnimatedSplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: Colors.light.pureWhite
  }
})