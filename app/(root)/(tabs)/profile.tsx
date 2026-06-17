import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
	const { signOut } = useAuth();

	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOut();
			router.replace("/sign-in");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	return (
		<SafeAreaView>
			<View>
				<Text>ProfileScreen</Text>
				<TouchableOpacity className="bg-red-500 rounded-xl py-3 px-4" onPress={handleSignOut}>
					<Text className="text-white font-bold">Sign Out</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}
