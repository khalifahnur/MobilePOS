import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

interface AmountInputProps {
  value: string;
  onChangeValue: (value: string) => void;
}

export default function AmountInput({ value, onChangeValue }: AmountInputProps) {
  const [focus, setFocus] = useState<boolean>(false);

  const handleChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    onChangeValue(numericText);
  };

  const formatValue = (text: string) => {
    const amount = text.slice(0, -2) || '0';
    const cents = text.slice(-2).padStart(2, '0');
    return `${amount}.${cents}`;
  };

  const handleOnFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = () => {
    setFocus(false);
  };

  return (
    <View style={[styles.container, { borderColor: focus ? 'blue' : '#999' }]}>
      <View style={{ position: 'absolute', top: 12, left: 0, paddingRight: 10, paddingLeft: 25 }}>
        <Text style={{ fontSize: 15, textAlign: 'left' }}>Ksh</Text>
      </View>

      <TextInput
        style={styles.input}
        value={formatValue(value)}
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder="Amount"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <View style={{ backgroundColor: "#F2F4F7", position: 'absolute', top: -12, left: 10 }}>
        <Text style={{ fontSize: 12, padding: 5, color: focus ? 'blue' : '#999' }}>Price</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 25,
    position: 'relative',
    alignItems: 'center',
  },
  input: {
    fontSize: 15,
    paddingVertical: 10,
    color: 'black',
    marginHorizontal: 30,
  },
});
