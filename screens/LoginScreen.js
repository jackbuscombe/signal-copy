import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
				navigation.replace("Home");
			}
		});

		return unsubscribe;
	}, []);

	const signIn = () => {
		signInWithEmailAndPassword(auth, email, password).catch((error) => alert(error));
	};
	return (
		<KeyboardAvoidingView behavior="height" style={tw`flex-1 items-center justify-center p-10 bg-white`}>
			<StatusBar style="light" />
			<Image
				source={{
					uri: "https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png",
				}}
				style={tw`w-32 h-32`}
			/>
			<View style={tw``}>
				<Input placeholder="Email" containerStyle={tw`w-64 mt-8`} autoFocus type="Email" value={email} onChangeText={(text) => setEmail(text)} />
				<Input placeholder="Password" containerStyle={tw`w-64`} secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} onSubmitEditing={signIn} />
			</View>

			<Button title="Login" containerStyle={tw`w-48 mt-4`} onPress={signIn} />
			<Button title="Register" type="outline" containerStyle={tw`w-48 mt-4`} onPress={() => navigation.navigate("Register")} />
		</KeyboardAvoidingView>
	);
};
export default LoginScreen;
