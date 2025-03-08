import { Text, View, StyleSheet } from "react-native";
import { colors } from "@/component/colors";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <UserName name={"Jane Doe"} />
    </View>
  );
}

type UserNameProp = {
  name: string;
};

const UserName = (props: UserNameProp) => {
  return (
      <View >
        <Text style={styles.header}>{props.name}</Text>
        {/*<View style={flexDirection: 'row'}>*/}
        {/*  <Text>Age: </Text>*/}
        {/*  <Text>Sexe: </Text>*/}
        {/*</View>*/}
        <Text>Emergency contact</Text>
      </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
  },
  header: {
    fontSize: 38,
    textAlign: "center",
  }
});




