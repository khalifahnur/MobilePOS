import React, { useRef, useState } from 'react';
import { Animated,StyleSheet, TextInput, View,} from 'react-native';

type AnimatedInputProps = {
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
  multiline?: boolean;
  numberOfLines?:number
}

export default function AnimatedInput({value, onChange, placeholder, multiline = false,numberOfLines,...TextInputProps }: AnimatedInputProps) {
    const [inputHeight, setHeight] = useState<number | null>(null);
    const [placeholderWidth, setWidth] = useState<number | null>(null);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const animation = useRef(new Animated.Value(0)).current;
  
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -inputHeight! / 2],
    });
  
    const translateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -placeholderWidth! / 4],
    });
  
    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });
  
    const onFocus = () => {
      setIsFocused(true);
      animate(1);
    };
  
    const onBlur = () => {
      setIsFocused(false);
      !value && animate(0);
    };
  
    const animate = (val: number) => {
      Animated.spring(animation, {
        toValue: val,
        bounciness: 0,
        useNativeDriver: true,
      }).start();
    };
  
    return (
      <View
        style={[
          styles.inputContainer,
          { borderColor: isFocused ? 'blue' : '#999' },
        ]}
        onLayout={e => !inputHeight && setHeight(e.nativeEvent.layout.height)}
      >
        <View style={{ height: inputHeight, ...styles.placeholderContainer }}>
          <Animated.Text
            style={[
              styles.placeholder,
              { transform: [{ translateY }, { translateX }, { scale }], color: isFocused ? 'blue' : '#999' },
            ]}
            onTextLayout={e =>
              !placeholderWidth && setWidth(e.nativeEvent.lines[0]?.width || 0)
            }
          >
            {placeholder}
          </Animated.Text>
        </View>
        <TextInput
          style={[
            styles.input,
            multiline && { height: 100, textAlignVertical: 'top' },
            { color: isFocused ? 'blue' : 'black' },
          ]}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}  // Ensure value is set here
          multiline={multiline}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#000',
        marginBottom: 25,
      },
      placeholderContainer: {
        position: 'absolute',
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
      },
      input: {
        paddingHorizontal: 10,
        fontSize: 18,
        paddingVertical: 10,
        color: 'black',
      },
      placeholder: {
        fontSize: 15,
        position: 'absolute',
        marginHorizontal: 20,
        paddingHorizontal: 5,
        backgroundColor: '#F2F4F7',
        color: '#000',
      },
})