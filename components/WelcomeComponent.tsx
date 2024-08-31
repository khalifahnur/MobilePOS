import { Link } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';
import { View, Text, Image } from 'react-native';
import Animated, {Easing, FadeInLeft, FadeInRight, FadeInUp, FadeOutLeft, FadeOutRight } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
type welcomeProps = {
  keyboardVisible:boolean
}
const WelcomeComponent = ({keyboardVisible}:welcomeProps) => {
  const imageSize = keyboardVisible ? { width: 90, height: 90 } : { width: 150, height: 150 };
  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.3,
        justifyContent: 'space-between',
      }}
    >
      <Animated.View entering={FadeInLeft.duration(1000).delay(200).easing(Easing.ease)}  exiting={FadeOutLeft.duration(1000).delay(200).easing(Easing.ease)} style={{ flex:.6,flexShrink: 0, flexGrow: 0, position: 'relative', width: 350 }}>
        <SvgContainer keyboardVisible={keyboardVisible} />
        <ImageContainer keyboardVisible={keyboardVisible} />
      </Animated.View>

      <Animated.View entering={FadeInRight.duration(1000).delay(200).easing(Easing.ease)}  exiting={FadeOutRight.duration(1000).delay(200).easing(Easing.ease)}  style={{ flexDirection: 'column', alignItems: 'center', flex:.4 }}>
        <Image
          source={require('../assets/images/Hi.png')}
          tintColor={'#fff'}
          style={{ width: 60, height: 60 }}
        />
        <Text
          style={{
            color: '#fff',
            fontWeight: 'semibold',
            fontSize: keyboardVisible?20:32,
            paddingTop: 10,
            textAlign: 'center',
          }}
        >
          Get Started 
        </Text>
        
       
      </Animated.View>
    </View>
  );
};

const SvgContainer = ({keyboardVisible}:welcomeProps) => {
  return (
    <View
      style={{
        position: 'relative',
        transform: [{ translateX: -150 }, { translateY: 0 }],
        width: keyboardVisible?400:470, 
        height: keyboardVisible?200:300,
      }}
    >
      <Svg viewBox="0 0 337.5 337.5" xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M168.75,289.9495423096761C204.14349955795512,287.9539876453925,236.28868405569028,267.69985381263393,255.3482842878406,237.8098272424261C272.27784581554357,211.26021246973895,265.26188572534073,179.00441130488718,259.19765732905523,148.10591244076673C252.76332159274307,115.32164007371881,248.3212003180965,79.70358619820273,220.64493185436706,60.98906363074351C188.3567104222263,39.155966822667025,147.35444783126405,35.255526989546674,110.33206941324117,47.44391719311772C65.699444150159,62.13772876767024,15.566079922878863,85.60020136623935,6.090435048670018,131.62401575271815C-3.2842090154050743,177.15726273189242,35.661992389783364,215.89254302758624,68.97498676296694,248.31791793192343C96.14429337796984,274.7633026671825,130.8953532792371,292.0838612601018,168.75,289.9495423096761"
          fill="#06069a"
        />
      </Svg>
    </View>
  );
};

const ImageContainer = ({keyboardVisible}:welcomeProps) => {
  return (
    <View
      style={{
        transform: [{ translateX: -10 }, { translateY:keyboardVisible?40:70 }],
        position: 'absolute',
      }}
    >
      <Image
        source={require('../assets/images/share.png')}
        style={[keyboardVisible ? { width: 90, height: 90 } : { width: 150, height: 150 }]}
      />
    </View>
  );
};

export default WelcomeComponent;
