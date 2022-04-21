import { Button, Input } from "@rneui/base";
// import { Icon } from "@rneui/themed";
import Icon from "react-native-vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLayoutEffect, useState } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const AddChatScreen = ({ navigation }) => {
	const [input, setInput] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Add a new chat",
			headerBackTitle: "Chats",
		});
	}, [navigation]);

	const createChat = async () => {
		await addDoc(collection(db, "chats"), {
			chatName: input,
		})
			.then(() => {
				navigation.goBack();
			})
			.catch((error) => alert(error));
	};

	return (
		<View style={tw`bg-white p-12 h-full`}>
			<Input placeholder="Enter a chat name" value={input} onChangeText={(text) => setInput(text)} onSubmitEditing={createChat} leftIcon={<AntDesign name="wechat" size={20} color="black" />} />
			<Button disabled={!input} onPress={createChat} title="Create new chat" />
		</View>
	);
};
export default AddChatScreen;
