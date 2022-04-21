import { Input, Button, Text } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import tw from "twrnc";
import { auth } from "../firebase";
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: "Back to Login",
		});
	}, [navigation]);

	const register = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((authUser) => {
				updateProfile(authUser.user, {
					displayName: name,
					photoURL: imageUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
				});
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<KeyboardAvoidingView behavior="height" style={tw`flex-1 items-center justify-center p-6 bg-white`}>
			<StatusBar style="light" />
			<Text h3 style={tw`mb-8`}>
				Create a Signal account
			</Text>

			<View style={tw``}>
				<Input containerStyle={tw`w-72`} placeholder="Full Name" autoFocus type="text" value={name} onChangeText={(text) => setName(text)} />
				<Input containerStyle={tw`w-72`} placeholder="Email" type="email" value={email} onChangeText={(text) => setEmail(text)} />
				<Input containerStyle={tw`w-72`} placeholder="Password" type="password" secureTextEntry value={password} onChangeText={(text) => setPassword(text)} />
				<Input containerStyle={tw`w-72`} placeholder="Profile Picture URL (optional)" type="text" value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register} />
			</View>

			<Button containerStyle={tw`w-42 mt-2`} raised title="Register" onPress={register} />
		</KeyboardAvoidingView>
	);
};
export default RegisterScreen;
