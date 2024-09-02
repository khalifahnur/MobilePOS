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
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { HelloWave } from "@/components/HelloWave";
import { Svg, Path } from "react-native-svg";
import InputField from "@/components/InputField";
import { Fontisto, Ionicons, AntDesign } from "@expo/vector-icons";
import SocialButtons from "@/components/SocialLogo";
import { Link, useRouter } from "expo-router";
import Animated, {
  Easing,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOutLeft,
  FadeOutRight,
  FadeOutUp,
} from "react-native-reanimated";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SigninScreen() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailErr, setEmailErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

  const router = useRouter();

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

  const imageSize = keyboardStatus
    ? { width: 90, height: 90 }
    : { width: 150, height: 150 };

  const HandleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const HandleEmailChange = (input: string) => {
    setEmail(input);
  };

  const HandlePasswordChange = (input: string) => {
    setPassword(input);
  };

  // validation email and password
  const emailValidation = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setEmailErr("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailErr("Invalid Email");
      return false;
    } else {
      setEmailErr("");
      return true;
    }
  };

  const passwordValidation = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (password === "") {
      setPasswordErr("Password is required");
      return false;
      // } else if (!passwordRegex.test(password)) {
      //   setPasswordErr(
      //     "Password should contain at least one uppercase letter, one lowercase letter, and one number"
      //   );
      //   return false;
    } else if (password.length < 8) {
      setPasswordErr("Password should contain at least 8 characters");
      return false;
    } else {
      setPasswordErr("");
      return true;
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("AuthToken");
        if (token) {
          router.replace("/(tabs)/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginStatus();
  }, []);

  

  const handleLogin = async () => {
    const isEmailValid = emailValidation(email);
    const isPasswordValid = passwordValidation(password);
    setLoadingBtn(true);
  
    if (!isEmailValid || !isPasswordValid) {
      setLoadingBtn(false);
      console.log("Invalid email or password");
      return;
    }
  
    const user = {
      email: email,
      password: password,
    };
  
    console.log(user);
  
    try {
      const response = await axios.post("http://192.168.100.203:3002/api/auth/SignIn", user);
  
      const token = response.data.token;
      const userObj = response.data.user;
  
      console.log("userObj",userObj);
      console.log("token", token);
  
      await AsyncStorage.setItem("AuthToken", token);
      await AsyncStorage.setItem("User", JSON.stringify(userObj));
  
      setLoadingBtn(false);
      if (!userObj.restaurantId) {
        // Redirect to a screen where they can enter restaurant details
        router.replace("/(auth)/restaurant"); 
      } else {
        // User has a restaurantId, proceed to the main app
        setTimeout(() => {
          router.replace("/(tabs)/");
        }, 2000);
      }
    } catch (error) {
      setLoadingBtn(false);
  
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Status Code:", error.response.status);
          console.log("Data:", error.response.data);
  
          if (error.response.status === 401) {
            setEmailErr("Incorrect Email/Password")
            setPasswordErr("Incorrect Email/Password")
          } else if (error.response.status === 500) {
            setEmailErr("Internal Server Error")
            setPasswordErr("Internal Server Error")
          }
          // Handle other specific status codes as needed
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Error:", error.message);
        }
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 0.3,
          }}
        >
          <Animated.View
            entering={FadeInLeft.duration(1000).delay(200).easing(Easing.ease)}
            exiting={FadeOutLeft.duration(1000).delay(200).easing(Easing.ease)}
            style={{ flexDirection: "column", alignItems: "center", flex: 0.4 }}
          >
            <Image
              source={require("../../assets/images/Hi.png")}
              tintColor={"#fff"}
              style={{ width: 60, height: 60 }}
            />
            <Text
              style={{
                color: "#fff",
                fontWeight: "semibold",
                fontSize: keyboardStatus ? 20 : 32,
                paddingTop: 10,
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Welcome Back <HelloWave />
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInRight.duration(1000).delay(200).easing(Easing.ease)}
            exiting={FadeOutRight.duration(1000).delay(200).easing(Easing.ease)}
            style={{ flex: 0.6, position: "relative" }}
          >
            <View
              style={{
                position: "relative",
                transform: [
                  { translateX: keyboardStatus ? 50 : -50 },
                  { translateY: 0 },
                ],
                width: keyboardStatus ? 370 : 470,
                height: keyboardStatus ? 200 : 300,
              }}
            >
              <Svg viewBox="0 0 337.5 337.5" xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M168.75,289.9495423096761C204.14349955795512,287.9539876453925,236.28868405569028,267.69985381263393,255.3482842878406,237.8098272424261C272.27784581554357,211.26021246973895,265.26188572534073,179.00441130488718,259.19765732905523,148.10591244076673C252.76332159274307,115.32164007371881,248.3212003180965,79.70358619820273,220.64493185436706,60.98906363074351C188.3567104222263,39.155966822667025,147.35444783126405,35.255526989546674,110.33206941324117,47.44391719311772C65.699444150159,62.13772876767024,15.566079922878863,85.60020136623935,6.090435048670018,131.62401575271815C-3.2842090154050743,177.15726273189242,35.661992389783364,215.89254302758624,68.97498676296694,248.31791793192343C96.14429337796984,274.7633026671825,130.8953532792371,292.0838612601018,168.75,289.9495423096761"
                  fill="#06069a"
                />
              </Svg>
            </View>
            <View
              style={{
                transform: [
                  { translateX: keyboardStatus ? 170 : 100 },
                  { translateY: keyboardStatus ? 40 : 70 },
                ],
                position: "absolute",
              }}
            >
              <Image
                source={require("../../assets/images/share.png")}
                style={[imageSize]}
              />
            </View>
          </Animated.View>
        </View>

        <View style={styles.content}>
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
              Log In
            </Animated.Text>

            <View>
              <Animated.View
                entering={FadeInUp.duration(1050)
                  .delay(250)
                  .easing(Easing.ease)}
                exiting={FadeOutUp}
              >
                <InputField
                  labelTxt={"Email"}
                  type="email"
                  onChangeText={(value) => HandleEmailChange(value)}
                  error={emailErr ? true : false}
                />
                {emailErr ? (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 20,
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Ionicons name="warning" size={24} color="red" />
                    <Text style={{ color: "red" }}>{emailErr} </Text>
                  </View>
                ) : null}
                <InputField
                  labelTxt={"Password"}
                  type="password"
                  onChangeText={(value) => HandlePasswordChange(value)}
                  error={passwordErr ? true : false}
                />
                {passwordErr ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 20,
                      gap: 10,
                    }}
                  >
                    <Ionicons name="warning" size={24} color="red" />
                    <Text style={{ color: "red" }}>{passwordErr}</Text>
                  </View>
                ) : null}
              </Animated.View>

              <Animated.View
                entering={FadeInUp.duration(1100)
                  .delay(280)
                  .easing(Easing.ease)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Fontisto
                    onPress={HandleCheckbox}
                    name={isChecked ? "checkbox-active" : "checkbox-passive"}
                    size={20}
                    color="black"
                  />
                  <Text>Remember Me</Text>
                </View>
                <Text>Forgot Password ?</Text>
              </Animated.View>

              <Animated.View
                entering={FadeInUp.duration(1100)
                  .delay(300)
                  .easing(Easing.ease)}
                style={styles.btnContainer}
              >
                <TouchableOpacity
                  onPress={handleLogin}
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

            <Animated.View
              entering={FadeInUp.duration(1150).delay(350).easing(Easing.ease)}
              style={{ marginTop: 20 }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontWeight: "500", fontSize: 15, color: "gray" }}
                >
                  Or Log In With
                </Text>
              </View>
              <View>
                <SocialButtons />
              </View>
            </Animated.View>

            <View
              style={{
                paddingHorizontal: 20,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#d4d4d4",
                  width: "100%",
                  alignItems: "center",
                }}
              />
            </View>

            <Pressable style={{ alignItems: "center", marginTop: 20 }}>
              <Link replace href="/(auth)/">
                <Animated.Text
                  entering={FadeInUp.duration(1200)
                    .delay(400)
                    .easing(Easing.ease)}
                  style={{ fontWeight: "500", fontSize: 15, color: "gray" }}
                >
                  Don't Have An Account ?{" "}
                  <Text style={{ textDecorationLine: "underline" }}>
                    Register
                  </Text>
                </Animated.Text>
              </Link>
            </Pressable>
          </View>
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
    marginTop: 20,
    flex: 0.7,
    shadowColor: "#fff",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
  },
  btnContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 5,
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
