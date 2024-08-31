import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SocialButtons from "@/components/SocialLogo";
import { Link, useRouter } from "expo-router";
import WelcomeComponent from "@/components/WelcomeComponent";
import Animated, { Easing, FadeInUp, FadeOutUp } from "react-native-reanimated";
import axios from "axios";
import PhoneNumberInp from "@/components/PhoneNumberInp";

export default function signup() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);

  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [psswd, setPsswd] = useState<string>("");
  const [psswdErr, setPsswdErr] = useState<string>("");
  const [phoneNumber,setPhoneNumber] = useState<string>("");
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

  const router = useRouter();

  function handlePhoneNumberChange(phoneNumber: string) {
    setPhoneNumber(phoneNumber);
  }

  console.log("name","=>",fullname,"email","=>",email,"psswd","=>",psswd,"phoneNumber","=>",phoneNumber)

  const emailValidation = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setEmailErr("Email is required");
      return false;
      // } else if (!emailRegex.test(email)) {
      //   setEmailErr("Invalid Email");
      //   return false;
    } else {
      setEmailErr("");
      return true;
    }
  };

  const psswdValidation = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (password === "") {
      setPsswdErr("Password is required");
      return false;
    } else if (password.length < 6) {
      setPsswdErr("Password should contain at least 6 characters");
      return false;
    } else {
      setPsswdErr("");
      return true;
    }
  };

  const handleInputChange = (value: string, type: string) => {
    if (type === "text") {
      setFullname(value);
    } else if (type === "email") {
      setEmail(value);
      //setEmailErr(emailValidation(value));
    } else {
      setPsswd(value);
      //setPsswdErr(psswdValidation(value));
    }
  };

  const handleRegister = async () => {
    const user = {
      name: fullname,
      email: email,
      password: psswd,
      phoneNumber: phoneNumber,
    };

    const EmailValid = emailValidation(email);
    const psswdValid = psswdValidation(psswd);

    if (!EmailValid || !psswdValid) {
      Alert.alert("Invalid input", "Please check your email and password.");
      return;
    }

    setLoadingBtn(true);
    try {
      await axios.post("http://192.168.100.201:3002/api/auth/SignUp", user);
      setLoadingBtn(false);
      setTimeout(() => {
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );
        router.push("/(auth)/signin")
      }, 2000);
    } catch (error) {
      setLoadingBtn(false);
      Alert.alert("Registration failed", "An error occurred during registration.");
      console.log("error", error);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardStatus(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardStatus(false)
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const HandleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  type FieldDataProps = {
    id: number;
    label: string;
    type: "text" | "email" | "password";
  }[];

  const FieldData: FieldDataProps = [
    { id: 1, label: "Name", type: "text" },
    { id: 2, label: "Email", type: "email" },
    { id: 3, label: "Password", type: "password" },
    //{ id: 4, label: "Restaurant Name", type: "text" }
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <WelcomeComponent keyboardVisible={keyboardStatus} />
        <View style={styles.content}>

            <Animated.Text
              entering={FadeInUp.duration(1000).delay(200).easing(Easing.ease)}
              style={{
                color: "#000",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 22,
              }}
            >
              Sign Up
            </Animated.Text>

            <View>
              {FieldData.map((item, index) => (
                <Animated.View
                  key={index}
                  entering={FadeInUp.duration(1000)
                    .delay(index * 200)
                    .easing(Easing.ease)}
                  exiting={FadeOutUp}
                >
                  <InputField
                    error={
                      item.type === "email"
                        ? !!emailErr
                        : item.type === "password"
                        ? !!psswdErr
                        : false
                    }
                    labelTxt={item.label}
                    type={item.type}
                    value={
                      item.type === "text"
                        ? fullname
                        : item.type === "email"
                        ? email
                        : psswd
                    }
                    onChangeText={(value) =>
                      handleInputChange(value, item.type)
                    }
                  />
                  {item.type === "email" && emailErr ? (
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 20,
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Ionicons name="warning" size={24} color="red" />
                      <Text style={{ color: "red" }}>{emailErr}</Text>
                    </View>
                  ) : null}
                  {item.type === "password" && psswdErr ? (
                    <View
                      style={{
                        flexDirection: "row",
                        paddingHorizontal: 20,
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Ionicons name="warning" size={24} color="red" />
                      <Text style={{ color: "red" }}>{psswdErr}</Text>
                    </View>
                  ) : null}
                </Animated.View>
              ))}
              <PhoneNumberInp onPhoneNumberChange={handlePhoneNumberChange} />

              <Animated.View
                entering={FadeInUp.duration(1500)
                  .delay(200)
                  .easing(Easing.ease)}
                style={styles.btnContainer}
              >
                <TouchableOpacity
                  onPress={handleRegister}
                  style={styles.button}
                  activeOpacity={1}
                >
                  {loadingBtn ? (
                    <Text style={styles.buttonText}>Loading ...</Text>
                  ) : (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.buttonText}>Continue</Text>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color="#fff"
                        style={styles.icon}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            </View>
            <Pressable style={{ alignItems: "center", marginTop: 20 }}>
              <Link replace href="/(auth)/signin">
                <Animated.Text
                  entering={FadeInUp.duration(1500)
                    .delay(400)
                    .easing(Easing.ease)}
                  style={{ fontWeight: "500", fontSize: 15, color: "#d5dae0" }}
                >
                  Already Have An Account ?{" "}
                  <Text style={{ textDecorationLine: "underline" }}>Login</Text>
                </Animated.Text>
              </Link>
            </Pressable>

            {/* <Animated.View
              style={{ marginTop: 20 }}
              entering={FadeInUp.duration(1500).delay(300).easing(Easing.ease)}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontWeight: "500", fontSize: 15, color: "gray" }}
                >
                  Or Sign Up With
                </Text>
              </View>
              <View>
                <SocialButtons />
              </View>
            </Animated.View> */}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "navy",
    color: "#000",
  },
  content: {
    backgroundColor: "#f8f8f8",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    shadowColor: "#eee",
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
    marginTop: 10,
    flex: 0.7,
    padding:10
  },
  btnContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop:10
  },
  button: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "navy",
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  icon: {
    marginLeft: 10,
  },
});
