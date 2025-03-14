import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Animated,
  Image,
  Linking,
  Alert,
  TouchableOpacity,
} from "react-native";
import { colors } from "@/component/colors";
import React, { useCallback, useEffect, useState } from "react";
import { User } from "@/services/schemas/User";
import { UserService } from "@/services/user";
import "react-native-get-random-values";
import Ionicons from "@expo/vector-icons/Ionicons";
import TableExample from "@/component/table";
import { useUserStore } from "@/services/useUserStore";
// Removed unused NotificationManager
const { ScrollView } = Animated;

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
  const [user, setUser] = useState<User | null>(null);
  const username = useUserStore((state) => state.name);

  useEffect(() => {
    fetchUser(username, setUser);
  }, [username]);

  if (!user) {
    return <Text>Loading...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <UserName user={user} />
    </SafeAreaView>
  );
}

interface WordListProps {
  words: string;
  center: boolean;
}

const WordList: React.FC<WordListProps> = ({ words, center }) => {
  if (center) {
    return (
      <View style={styles.centeredContainer}>
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

const supportedURL = "https://maps.app.goo.gl/1ceodaCrVgR2X7BG9";

type OpenURLButtonProps = {
  url: string;
  text: string;
};

const OpenURLButton: React.FC<OpenURLButtonProps> = ({ url, text }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.text, styles.underline]}>{text}</Text>
    </TouchableOpacity>
  );
};

type UserNameProps = {
  user: User;
};

const UserName: React.FC<UserNameProps> = ({ user }) => {
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

      <Text style={styles.header}>{user.name}</Text>

      <View style={styles.profileInfo}>
        <View style={styles.profileDetails}>
          <View style={styles.profileText}>
            <Text style={styles.subtitle}>Age: </Text>
            <Text style={styles.text}>{user.age}</Text>
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
            <Text style={[styles.text, styles.underline]}>
              123 rue Edouard Monpetit
            </Text>
          </View>

          <View style={styles.profileText}>
            <Ionicons
              name="call-outline"
              size={24}
              style={{ paddingRight: 10 }}
            />
            <Text style={styles.subtitle}>Phone Number: </Text>
            <Text style={[styles.text, styles.underline]}>514-232-1414</Text>
          </View>

          <View style={styles.profileText}>
            <Ionicons
              name="call-outline"
              size={24}
              style={{ paddingRight: 10 }}
            />
            <Text style={[styles.subtitle, { color: "red" }]}>Emergency :</Text>
            <Text style={[styles.text, styles.underline]}>514-777-8888</Text>
          </View>
        </View>
      </View>

      {/* Health information */}
      <View style={{ margin: 20 }}>
        <Text style={styles.header2}>Health information</Text>
        <View style={styles.profileText}>
          <Text style={styles.subtitle}>Conditions: </Text>
          <WordList words={user.ailments} center={false} />
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
      {/* Active medications */}
      <View style={{ margin: 20, alignItems: "center" }}>
        <Text style={styles.header2}>Active medications</Text>
        <TableExample namePills={[]} amount={[]} isPast={[]} />
      </View>

      {/* Nearest pharmacy */}
      <View style={{ margin: 20, alignItems: "center" }}>
        <Text style={styles.header2}>Nearest pharmacy</Text>
        <Text style={styles.subheader}>Based on current location</Text>
        <View style={styles.profileText}>
          <Text style={styles.subtitle}>Name: </Text>
          <Text style={styles.text}>Pharmaprix</Text>
        </View>
        <View style={styles.profileText}>
          <Text style={styles.subtitle}>Address: </Text>
          <OpenURLButton url={supportedURL} text={"4999 Chemin Queen Mary"} />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.subtitle}>Phone Number: </Text>
          <Text style={[styles.text, styles.underline]}>514-737-5454</Text>
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
    fontSize: 14,
    fontFamily: "Antic",
  },
  subtitle: {
    fontSize: 14,
    color: colors.space_cadet,
    fontFamily: "Antic",
  },
  profileText: {
    marginVertical: 5,
    flexDirection: "row",
    marginRight: 10,
  },
  header: {
    fontSize: 28,
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
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Gambetta",
    color: colors.space_cadet,
    marginBottom: 10,
  },
  underline: {
    textDecorationLine: "underline",
  },
  headerBar: {
    backgroundColor: "white",
    alignItems: "center",
  },
  headerTitle: {
    color: "#aaaaaa",
    fontSize: 14,
    marginBottom: 8,
    fontFamily: "Gambetta",
  },
  centeredContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imageProfileContainer: {
    alignSelf: "center",
    borderRadius: 50,
    width: 100,
    height: 100,
    borderColor: "#fff",
    borderWidth: 1,
    shadowColor: "#FFA500",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 30,
    overflow: "hidden",
  },
  imageProfile: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
  subheader: {
    marginBottom: 10,
    fontFamily: "Gambetta",
    color: "#A6A4A4",
    fontSize: 16,
  },
});
