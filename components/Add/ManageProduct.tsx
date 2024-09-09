import {
  Animated,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import axios from "axios";
import EditModal from "./EditModal";

type modalProps = {
  name: string;
  cost: number;
  title: string;
};

export default function ManageProduct({ fetchedData }) {
  const listRef = useRef<Animated.FlatList | null>(null);

  const [modalData, setModalData] = useState<modalProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const groupedData = fetchedData?.reduce((acc, item) => {
    const dataItems = item.data || [];

    dataItems.forEach((dataItem) => {
      //console.log('Processing data item:', dataItem); // Log each data item to understand its structure

      const title = dataItem?.title?.toUpperCase() || "UNKNOWN";
      const descriptionData = (dataItem?.description || []).map((desc) => ({
        id: dataItem._id || "UNKNOWN_ID",
        name: desc.name || "No Name",
        quantity: desc.quantity || "0",
        cost: (desc.cost / 100).toFixed(2) || "0",
        image: { uri: desc.image },
      }));

      const existingCategory = acc?.find((cat) => cat?.title === title);

      if (existingCategory) {
        existingCategory.description.push(...descriptionData);
      } else {
        acc.push({
          id: dataItem._id || "UNKNOWN_ID",
          title,
          description: descriptionData,
        });
      }
    });

    return acc;
  }, []);

  const HandleModal = ({ title, name, cost }: modalProps) => {
    setModalData({ title, name, cost });
    setModalVisible(true);
  };

  const handleRemoveItem = async (restaurantId, title, itemId) => {
    try {
      const response = await axios.post(
        "http://192.168.100.198:3002/api/menu/removeItem",
        {
          restaurantId,
          title,
          itemId,
        }
      );

      console.log("Item removed:", response.data);
    } catch (error: any) {
      console.error(
        "Error removing item:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Example usage (button click or event)
  // handleRemoveItem("Beirut", "Main Dishes", "66d9da1f041de7af12855c0c");

  return (
    <View>
      <Animated.FlatList
        ref={listRef}
        data={groupedData}
        renderItem={({ item, index }) => {
          return (
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
                        <TouchableOpacity
                          style={styles.btn}
                          onPress={() =>
                            HandleModal({
                              title: item.title,
                              name: descItem.name,
                              cost: parseFloat(descItem.cost),
                            })
                          }
                        >
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
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal visible={modalVisible} style={styles.modal}>
        <EditModal data={modalData} onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
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
  nameSection: {
    flexDirection: "row",
    gap: 10,
    flex: 0.4,
  },
  actionSection: {
    flexDirection: "row",
    gap: 10,
  },
  btn: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
});
