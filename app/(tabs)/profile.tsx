import {Text, View, StyleSheet, SafeAreaView, Animated} from "react-native";
import { colors } from "@/component/colors";
import ScrollView = Animated.ScrollView;
import {useEffect, useState} from "react";
import {User} from "@/services/schemas/User";
import {UserService} from "@/services/user";
import 'react-native-get-random-values';

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

    useEffect(() => {
        fetchUser("Jane Doe", setUser);
    }, []);

  if(!user){
      return <Text>Loading...</Text>
  }
  return (
    <View style={styles.container}>
      {/*<Text style={styles.text}>Profile</Text>*/}
      <UserName name={user?.name} ailments={user?.ailments} />
    </View>
  );
}

type UserNameProp = {
  name: string;
  ailments: string[];
};

interface WordListProps {
    words: string[];
    center: boolean;
}

const WordList: React.FC<WordListProps> = ({ words, center }) => {
    if(center){
        return (
            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {words.map((word, index) => (
                    <Text key={index} style={styles.text}>
                        {word}
                    </Text>
                ))}
            </View>
        )
    } else {
        return (
            <View>
                {words.map((word, index) => (
                    <Text key={index} style={styles.text}>
                        {word}
                    </Text>
                ))}
            </View>
        );
    }
};

const UserName = (props: UserNameProp) => {
  return (
      <SafeAreaView>
          <ScrollView>

        <Text style={styles.header}>{props.name}</Text>

          <View style = {{borderWidth: 1,
              borderColor: "#E7E7E7",
              marginHorizontal:20,}}/>

        <View style={{margin: 20}}>
            <View style={{display: "flex", flexDirection: "row", position: "relative", zIndex: 1, justifyContent: "flex-start" }}>
                <View style={styles.profileText}>
                    <Text style={styles.subtitle}>Age: </Text>
                    <Text style={styles.text}>20</Text>
                </View>
                <View style={styles.profileText}>
                    <Text style={styles.subtitle}>Sex: </Text>
                    <Text style={styles.text}>F</Text>
                </View>
            </View>

            <View style={styles.profileText}>
                <Text style={styles.subtitle}>Address: </Text>
                <Text style={[styles.text, styles.underline]}>123 ascdfwfdd</Text>  {/*TODO: CLICKABLE! */}
            </View>

            <View style={styles.profileText}>
                <Text style={[styles.subtitle, { color: "red" }]}>Emergency contact: </Text>
                <Text style={[styles.text, styles.underline]}>514-xxx-xxxx</Text>  {/*TODO: CLICKABLE! */}
            </View>
        </View>

          <View style = {styles.lineStyle}/>
          {/*Health information*/}
          <View style={{ margin: 20 }}>
            <Text style={styles.header2}>Health information</Text>
              <View style={styles.profileText}>
                  <Text style={styles.subtitle}>Conditions: </Text>
                  <WordList words={props.ailments} center={false}/>
              </View>
              <View style={styles.profileText}>
                    <Text style={styles.subtitle}>Blood type: </Text>
                  <Text style={styles.text}>O-</Text>
              </View>
              <View style={styles.profileText}>
                    <Text style={styles.subtitle}>Allergies: </Text>
                    <WordList words={["Peanuts", "Dust", "Pollen"]} center={false} />
              </View>
          </View>

          <View style = {styles.lineStyle}/>
          {/*Active meds */}
          <View style={{ margin: 20, alignItems:"center"}}>
              <Text style={[styles.header2]}>Active medications</Text>
                <WordList words={["Tylenol", "Advil", "Zyrtec"]} center={true} />
          </View>

          <View style = {styles.lineStyle}/>
          {/*Nearest pharmacy*/}
          <View style={{ margin: 20, alignItems:"center"}}>
              <Text style={styles.header2}>Nearest pharmacy</Text>
              <Text style={{marginBottom:10, fontFamily:"Gambetta", color:"#A6A4A4", fontSize:16}}>Based on current location</Text>
              <View style={styles.profileText}>
                    <Text style={styles.subtitle}>Name: </Text>
                    <Text style={styles.text}>Pharmaprix</Text>
              </View>
              <View style={styles.profileText}>
                  <Text style={styles.subtitle}>Address: </Text>
                  <Text style={[styles.text, styles.underline]}>123 abc</Text>
              </View>
              <View style={styles.profileText}>
                  <Text style={styles.subtitle}>Contact: </Text>
                  <Text style={[styles.text, styles.underline]}>514-xxx-xxxx</Text>
              </View>
          </View>
          </ScrollView>
      </SafeAreaView>
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
      marginVertical:5,
        flexDirection: "row",
        marginRight: 10
    },
  header: {
    fontSize: 45,
    textAlign: "center",
      fontFamily: "Gambetta",
    marginHorizontal:20,
      color: colors.space_cadet,
    marginBottom: 20,
  },
    lineStyle:{
        borderWidth: 1,
        borderColor: colors.peach_yellow,
        marginHorizontal:20,
    },
    header2 : {
        fontSize: 30,
        textAlign: "center",
        fontFamily: "Gambetta",
        color: colors.cerulean,
        marginBottom:10
    },
    underline: {textDecorationLine: 'underline'},

});




