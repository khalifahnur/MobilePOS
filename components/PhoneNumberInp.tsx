import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PhoneInput, { ICountry } from 'react-native-international-phone-number';

interface PhoneNumberInpProps {
  onPhoneNumberChange: (phoneNumber: string) => void;
}

export default function PhoneNumberInp({ onPhoneNumberChange }: PhoneNumberInpProps) {
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>('');

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
    onPhoneNumberChange(phoneNumber); // Pass the value to the main component
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  return (
    <View style={{ paddingHorizontal: 40, marginTop: 20, marginBottom: 10 }}>
      <Text style={{
        fontSize: 16,
        color: "#000",
        fontWeight: "500",
        marginBottom: 5,
        textAlign: "left",
      }}>Phone Number</Text>
      <PhoneInput
        value={inputValue}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
        defaultCountry='KE'
      />
    </View>
  );
}
