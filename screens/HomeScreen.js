import { Avatar } from "@rneui/themed";
import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import tw from "twrnc";

const HomeScreen = ({ navigation }) => {
	const [chats, setChats] = useState([]);
	const auth = getAuth();

	useEffect(() => {
		const q = query(collection(db, "chats"));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			setChats(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
		});
		return unsubscribe;
	}, []);

	const signOutUser = () => {
		signOut(auth)
			.then(() => {
				navigation.replace("Login");
			})
			.catch((error) => {
				// An error happened.
			});
	};
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Signal",
			headerStyle: { backgroundColor: "#fff" },
			headerTitleStyle: { color: "black" },
			headerTintColor: "black",
			headerLeft: () => (
				<View>
					<TouchableOpacity style={{ marginRight: 20 }} activeOpacity={0.5} onPress={signOutUser}>
						<Avatar source={{ uri: auth?.currentUser?.photoURL }} rounded />
					</TouchableOpacity>
				</View>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: 80,
						marginRight: 20,
					}}
				>
					<TouchableOpacity activeOpacity={0.5}>
						<AntDesign name="camerao" size={24} color="black" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
						<SimpleLineIcons name="pencil" size={24} color="black" />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const enterChat = (id, chatName) => {
		navigation.navigate("Chat", {
			id: id,
			chatName: chatName,
		});
	};

	return (
		<SafeAreaView>
			<ScrollView style={tw`h-full`}>
				{chats.map(({ id, data: { chatName } }) => (
					<CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
				))}
			</ScrollView>
		</SafeAreaView>
	);
};
export default HomeScreen;
