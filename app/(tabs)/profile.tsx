import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
} from "react-native";
import { colors } from "@/component/colors";
import ScrollView = Animated.ScrollView;
import React, { useEffect, useState } from "react";
import { User } from "@/services/schemas/User";
import { UserService } from "@/services/user";
import "react-native-get-random-values";
import Ionicons from "@expo/vector-icons/Ionicons";
import TableExample from "@/component/table";
import { useUserStore } from "@/services/useUserStore";

async function fetchUser(name: string, setUser: Function): Promise<void> {
  try {
    const user = await UserService.getUser(name);
    console.log(user);
    setUser(user);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

export default function Profile() {
  const [user, setUser] = useState<User>();
  const username = useUserStore((state) => state.name);

  useEffect(() => {
    fetchUser(username, setUser);
  }, []);

  if (!user) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      {/*<Text style={styles.text}>Profile</Text>*/}
      <UserName name={user?.name} ailments={user?.ailments} />
    </SafeAreaView>
  );
}

type UserNameProp = {
  name: string;
  ailments: string;
};

interface WordListProps {
  words: string;
  center: boolean;
}

const WordList: React.FC<WordListProps> = ({ words, center }) => {
  if (center) {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>{words}</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.text}>{words}</Text>
      </View>
    );
  }
};

const UserName = (props: UserNameProp) => {
  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={styles.imageProfileContainer}>
        <Image
          source={require("./../../assets/images/profile.png")}
          style={styles.imageProfile}
        />
      </View>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <Text style={styles.header}>{props.name}</Text>

      <View style={styles.profileInfo}>
        <View style={styles.profileDetails}>
          <View style={styles.profileText}>
            <Text style={styles.subtitle}>Age: </Text>
            <Text style={styles.text}>20</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.subtitle}>Sex: </Text>
            <Text style={styles.text}>F</Text>
          </View>

          <View style={styles.profileText}>
            <Ionicons
              name="home-outline"
              size={24}
              style={{ paddingRight: 10 }}
            />

            <Text style={styles.subtitle}>Address: </Text>
            <Text style={[styles.text, styles.underline]}>123 ascdfwfdd</Text>
            {/*TODO: CLICKABLE! */}
          </View>

          <View style={styles.profileText}>
            <Ionicons
              name="call-outline"
              size={24}
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.subtitle}>Phone Number: </Text>
            <Text style={[styles.text, styles.underline]}>
              514-xxx-xxxx
            </Text>{" "}
            {/*TODO: CLICKABLE! */}
          </View>

          <View style={styles.profileText}>
            <Ionicons
              name="call-outline"
              size={24}
              style={{ paddingRight: 10 }}
            />
            <Text style={[styles.subtitle, { color: "red" }]}>
              Emergency :{" "}
            </Text>
            <Text style={[styles.text, styles.underline]}>514-xxx-xxxx</Text>{" "}
            {/*TODO: CLICKABLE! */}
          </View>
        </View>
      </View>

      {/*Health information*/}
      <View style={{ margin: 20 }}>
        <Text style={styles.header2}>Health information</Text>
        <View style={styles.profileText}>
          <Text style={styles.subtitle}>Conditions: </Text>
          <WordList words={props.ailments} center={false} />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.subtitle}>Blood type: </Text>
          <Text style={styles.text}>O-</Text>
        </View>
        <View style={styles.profileText}>
          <Text style={styles.subtitle}>Allergies: </Text>
          <WordList words={"Peanuts"} center={false} />
        </View>
      </View>

      <View style={styles.lineStyle} />
      {/*Active meds */}
      <View style={{ margin: 20, alignItems: "center" }}>
        <Text style={[styles.header2]}>Active medications</Text>
        <TableExample />
      </View>

      {/*Nearest pharmacy*/}
      <View style={{ margin: 20, alignItems: "center" }}>
        <Text style={styles.header2}>Nearest pharmacy</Text>
        <Text
          style={{
            marginBottom: 10,
            fontFamily: "Gambetta",
            color: "#A6A4A4",
            fontSize: 16,
          }}
        >
          Based on current location
        </Text>
        <View style={styles.profileText}>
          <Text style={styles.subtitle}>Name: </Text>
          <Text style={styles.text}>Pharmaprix</Text>
        </View>
        <View style={styles.profileText}>
          <Text style={styles.subtitle}>Address: </Text>
          <Text style={[styles.text, styles.underline]}>123 abc</Text>
        </View>
        <View style={styles.profileText}>
          <Text style={styles.subtitle}>Phone Number: </Text>
          <Text style={[styles.text, styles.underline]}>514-xxx-xxxx</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  text: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Antic",
  },
  subtitle: {
    fontSize: 20,
    color: colors.space_cadet,
    fontFamily: "Antic",
  },
  profileText: {
    marginVertical: 5,
    flexDirection: "row",
    marginRight: 10,
  },
  header: {
    fontSize: 45,
    textAlign: "center",
    fontFamily: "Gambetta",
    marginHorizontal: 20,
    color: colors.space_cadet,
    marginBottom: 20,
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    marginHorizontal: 10,
  },
  header2: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Gambetta",
    color: colors.space_cadet,
    marginBottom: 10,
  },
  underline: { textDecorationLine: "underline" },
  headerBar: {
    backgroundColor: "white",
    alignItems: "center",
  },
  headerTitle: {
    color: "#aaaaaa",
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Gambetta",
  },

  imageProfileContainer: {
    alignSelf: "center",
    borderRadius: 50,
    width: 100, // Largeur ajustée
    height: 100, // Hauteur ajustée
    borderColor: "#fff",
    borderWidth: 1, // Ajout d'une bordure visible
    shadowColor: "#FFA500", // Couleur de l'ombre (orange foncé)
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5, // Pour les ombres sous Android
    marginVertical: 30,
    overflow: "hidden", // Pour que l'image respecte les bordures arrondies
  },
  imageProfile: {
    width: "100%", // L'image s'ajuste à la taille du conteneur
    height: "100%",
    resizeMode: "cover", // Ajuste l'image en couvrant tout l'espace
  },
  profileInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#fff",
    shadowColor: "#d9d9d9",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    padding: 20,
  },
  profileDetails: {
    flex: 1,
  },
});
