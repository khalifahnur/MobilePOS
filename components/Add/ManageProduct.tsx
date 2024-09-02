import { Animated, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import data from '../Data';
import HeaderComponent from './HeaderComponent';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function ManageProduct() {
  const listRef = useRef<Animated.FlatList | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View>
      <Animated.FlatList
        ref={listRef}
        data={data}
        renderItem={({ item, index }) => (
          <View key={index}>
            <View style={{ backgroundColor: "#ffff", padding: 10 }}>
              <Text style={styles.Title}>{item.title}</Text>
            </View>
            <View style={{ flex: 1 }}>
              {item.description?.map((descItem, descIndex: number) => (
                <View key={descIndex}>
                  <View style={styles.Description}>
                    {/* Name and image section */}
                    <View style={styles.nameSection}>
                    <View>
                      <Image
                        source={descItem.image}
                        style={styles.ImageStyle}
                      />
                    </View>
                    <View>
                      <Text style={styles.TextName}>{descItem.name}</Text>
                      <Text
                        style={styles.TextDesc}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                      >
                        {descItem.quantity}
                      </Text>
                      </View>
                      
                    </View>

                    {/* Price section */}
                    <View>
                      <Text style={styles.TextCost}>Ksh.{descItem.cost}</Text>
                    </View>

                    {/* action part */}
                    <View style={styles.actionSection}>
                      <TouchableOpacity style={styles.btn}>
                        <Feather name="edit-2" size={20} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.btn}>
                        <AntDesign name="delete" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                    
                  </View>
                  {descIndex < item.description.length - 1 && (
                    <View style={styles.Divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
       // ListHeaderComponent={HeaderComponent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Title: {
    fontFamily: "PlusJakartaSansMedium",
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  Description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  TextName: {
    fontFamily: "PlusJakartaSansMedium",
    fontSize: 14,
    fontWeight: "700",
    paddingBottom: 2,
  },
  TextDesc: {
    fontFamily: "PlusJakartaSansMedium",
    fontSize: 12,
    fontWeight: "300",
    textAlign: "justify",
    paddingBottom: 2,
  },
  TextCost: {
    fontFamily: "PlusJakartaSansMedium",
    fontSize: 12,
    fontWeight: "700",
  },
  Divider: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    width: "100%",
  },
  ImageStyle: {
    width: 20,
    height: 20,
    borderRadius: 2,
  },
  nameSection:{
    flexDirection:'row',
    gap:10,
    flex:.4
  },
  actionSection:{
    flexDirection:'row',
    gap:10,
  },
  btn:{
    padding:10,
    backgroundColor:'#fff',
    borderRadius:20
  },
});