import { Avatar } from "@rneui/themed";
import { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import tw from "twrnc";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, onSnapshot, serverTimestamp, orderBy, query } from "firebase/firestore";

const ChatScreen = ({ navigation, route }) => {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Chat",
			headerTitleAlign: "left",
			headerTitle: () => (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						maxWidth: "100%",
					}}
				>
					<Avatar rounded source={{ uri: messages[messages.length - 1]?.data.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" }} />
					<View style={tw`ml-3`}>
						<Text style={tw`text-white font-bold`} numberOfLines={1}>
							{route.params.chatName}
						</Text>
						<Text numberOfLines={1} style={tw`text-white text-xs`}>
							Last Message: {messages?.[messages.length - 1]?.data.displayName}
						</Text>
					</View>
				</View>
			),
			// headerLeft: () => (
			// 	<TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
			// 		<AntDesign name="arrowleft" size={24} color="white" />
			// 	</TouchableOpacity>
			// ),
			headerRight: () => (
				<View style={{ flexDirection: "row", justifyContent: "space-between", width: 80, marginRight: 20 }}>
					<TouchableOpacity>
						<FontAwesome name="video-camera" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons name="call" size={24} color="white" />
					</TouchableOpacity>
				</View>
			),
		});
	}, [messages]);

	const sendMessage = () => {
		Keyboard.dismiss();

		addDoc(collection(db, "chats", route.params.id, "messages"), {
			timestamp: serverTimestamp(),
			message: input,
			displayName: auth.currentUser.displayName,
			email: auth.currentUser.email,
			photoURL: auth.currentUser.photoURL,
		});

		setInput("");
	};

	useLayoutEffect(() => {
		const messagesRef = query(collection(db, "chats", route.params.id, "messages"), orderBy("timestamp", "asc"));
		const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
			setMessages(
				snapshot.docs.map((message) => ({
					id: message.id,
					data: message.data(),
				}))
			);
		});

		return unsubscribe;
	}, [route]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<StatusBar style="light" />
			<KeyboardAvoidingView style={tw`flex-1`} keyboardVerticalOffset={90} behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<>
						<ScrollView contentContainerStyle={{ paddingTop: 15 }}>
							{messages.map(({ id, data }) =>
								data.email === auth.currentUser.email ? (
									<View
										key={id}
										style={{
											padding: 15,
											backgroundColor: "#2B68E6",
											alignSelf: "flex-end",
											borderRadius: 20,
											marginRight: 15,
											marginBottom: 20,
											maxWidth: "80%",
											position: "relative",
										}}
									>
										<Avatar
											source={{
												uri: data.photoURL,
											}}
											size={30}
											rounded
											position="absolute"
											bottom={-15}
											right={-15}
											// WEB
											containerStyle={{
												position: "absolute",
												bottom: -15,
												right: -5,
											}}
										/>
										<Text
											style={{
												color: "white",
												fontWeight: "500",
											}}
										>
											{data.message}
										</Text>
									</View>
								) : (
									<View
										key={id}
										style={{
											padding: 15,
											backgroundColor: "#ECECEC",
											alignSelf: "flex-start",
											borderRadius: 20,
											margin: 15,
											maxWidth: "80%",
											position: "relative",
										}}
									>
										<Avatar
											source={{
												uri: data.photoURL,
											}}
											size={30}
											rounded
											position="absolute"
											bottom={-15}
											left={-15}
											// WEB
											containerStyle={{
												position: "absolute",
												bottom: -15,
												left: -5,
											}}
										/>
										<Text
											style={{
												color: "black",
												fontWeight: "500",
											}}
										>
											{data.message}
										</Text>
										<Text
											style={{
												fontSize: 10,
												color: "gray",
												marginTop: 10,
											}}
										>
											{data.displayName}
										</Text>
									</View>
								)
							)}
						</ScrollView>
						<View style={tw`flex-row items-center w-full p-4`}>
							{/* Footer */}
							<TextInput
								placeholder="Signal Message"
								style={{
									bottom: 0,
									height: 40,
									flex: 1,
									marginRight: 15,
									backgroundColor: "#ECECEC",
									padding: 10,
									color: "gray",
									borderRadius: 30,
								}}
								value={input}
								onChangeText={(text) => setInput(text)}
								onSubmitEditing={sendMessage}
							/>
							<TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
								<Ionicons name="send" size={24} color="#2B68E6" />
							</TouchableOpacity>
						</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
export default ChatScreen;
