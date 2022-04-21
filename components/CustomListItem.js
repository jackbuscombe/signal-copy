import { View, Text } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";
import tw from "twrnc";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
	const [chatMessages, setChatMessages] = useState([]);

	useEffect(() => {
		const messagesRef = query(collection(db, "chats", id, "messages"), orderBy("timestamp", "desc"));
		const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
			setChatMessages(snapshot.docs.map((doc) => doc.data()));
		});

		return unsubscribe;
	}, []);

	return (
		<ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
			<Avatar
				rounded
				source={{
					uri: chatMessages?.[0]?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title
					style={{
						fontWeight: "700",
						overflow: "hidden",
					}}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					<Text>{chatName}</Text>
				</ListItem.Title>

				<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
					{chatMessages.length != 0 ? (
						<View style={tw`flex-row`}>
							<Text style={tw`font-bold text-gray-500`}>{chatMessages?.[0]?.displayName}: </Text>
							<Text style={tw`font-bold text-gray-500`}>{chatMessages?.[0]?.message}</Text>
						</View>
					) : (
						<Text style={tw`font-bold text-blue-500`}>Start a chat!</Text>
					)}
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};
export default CustomListItem;
