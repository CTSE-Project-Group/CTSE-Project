import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Button, Card, TextInput, Text } from "react-native-paper";
import { collection, query, getDocs, getDoc, doc } from "firebase/firestore";
import React, { useState, useEffect, useId } from "react";
import { Styles } from "../../../styles/CardStyles";
import { StylesLocal } from "../../../styles/LocalStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { auth, db } from "../../../firebase";

const EventManagerHome = ({ navigation, props }) => {
  const [events, setEvents] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const genID = () => useId();

  useEffect(() => {
    if (!mounted) {
      getEvents();
      setMounted(true);
    }
  }, [events]);

  let getEvents = async () => {
    try {
      const q = query(collection(db, "events"));
      const querySnapshot = await getDocs(q);
      let allEvents = [];
      querySnapshot.forEach((doc) => {
        const eventId = doc.id;
        let toDo = doc.data();
        allEvents.push({ eventId, ...toDo });
      });
      setEvents(allEvents);
    } catch (e) {
      console.log(e);
    }
  };

  let getUsers = async (id) => {
    const docRef = doc(db, "users", id);

    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const iconSetter = (iconName) => {
    return (
      //used to set icons in the tab bar
      <Icon color={"#138D75"} type="MaterialIcons" name={iconName} size={30} />
    );
  };

  return (
    <Card style={Styles.cardContainer}>
      <Card.Content style={Styles.cardContentWithoutAction}>
        <Text style={StylesLocal.cardTitle}>Browse events</Text>
        <TextInput
          // label="Search"
          value={searchQuery}
          onChangeText={(query) => setSearchQuery(query)}
          style={styles.searchInput}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          underlineColorAndroid="transparent"
          placeholder="Search events..."
        />

        <ScrollView style={Styles.staticTextView}>
          {events
            .filter((event) =>
              event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((event, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => navigation.navigate("EventView", event)}
              >
                <Card style={styles.card}>
                  <Card.Content>
                    <View style={styles.cardTitleRow}>
                      <Text style={styles.cardDietName}>{event.eventName}</Text>
                      <View style={styles.cardAuthorView}>
                        <Text style={styles.cardDietAuthor}>
                          {"By " + event.eventUserName}
                        </Text>
                      </View>
                    </View>
                    {/* <Text>{diet.dietUser}</Text> */}
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </Card.Content>
    </Card>
  );
};
const commonstaticTextViewProps = {
  borderWidth: 5,
  marginBottom: 5,
  borderRadius: 15,
  padding: 0,
  borderColor: "#BB8FCE",
};

const commonstaticSmallTextViewProps = {
  paddingRight: 7,
  borderWidth: 2,
  borderRadius: 9,
  padding: 3,
  borderColor: "#D7BDE2",
};

const searchInput = {
  fontSize: 15,
  height: 70,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  borderRadius: 12,
  marginBottom: 5,
  backgroundColor: "#FBEEE6",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  staticTextView: {
    ...commonstaticTextViewProps,
    borderColor: "#F5CBA7",
  },
  card: { ...commonstaticTextViewProps, backgroundColor: "#F5EEF8" },
  cardTitleRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  cardAuthorView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  cardDietName: {
    color: "black",
    fontSize: 19,
    // textAlign: "center",
    marginBottom: 20,
    left: "5%",
  },
  cardDietAuthor: {
    ...commonstaticSmallTextViewProps,
    // position: "absolute",
    backgroundColor: "white",
    color: "#5B2C6F",
    fontSize: 19,
    // textAlign: "center",
    marginBottom: 20,
    left: 0,
    height: 33,
    textAlign: "right",
    writingDirection: "rtl",
  },
  searchInput: {
    borderBottomWidth: 0,
    fontSize: 15,
    height: 70,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderRadius: 12,
    marginBottom: 5,
    backgroundColor: "#EAF2F8",
  },
});

export default EventManagerHome;
