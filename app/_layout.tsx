import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

const properties = [
	{ id: "1", name: "Modern Apartment", price: 250000 },
	{ id: "2", name: "Cozy Cottage", price: 150000 },
	{ id: "3", name: "Luxury Villa", price: 750000 },
	{ id: "4", name: "Beachfront Condo", price: 500000 },
];

export default function RootLayout() {
	return (
		<SafeAreaView>
			<View>
				<FlatList
					data={properties}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View className=" p-4 border-b border-gray-200">
							<Text>{item.name}</Text>
							<Text>${item.price}</Text>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}
