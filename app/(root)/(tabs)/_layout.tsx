import { Icon, Label, NativeTabs, VectorIcon } from "expo-router/unstable-native-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
	return (
		<NativeTabs>
			<NativeTabs.Trigger name="index">
				<Label>Home</Label>
				<Icon src={<VectorIcon family={MaterialIcons} name="home" />} />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="search">
				<Icon src={<VectorIcon family={MaterialIcons} name="search" />} />
				<Label>Search</Label>
			</NativeTabs.Trigger>

			{/* create property button */}

			<NativeTabs.Trigger name="saved">
				<Icon src={<VectorIcon family={MaterialIcons} name="favorite" />} />
				<Label>Saved</Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="profile">
				<Icon
					src={<VectorIcon family={MaterialIcons} name="account-circle" />}
				/>
				<Label>Profile</Label>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
