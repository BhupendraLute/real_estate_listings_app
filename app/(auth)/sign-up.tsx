import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
	ActivityIndicator,
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function SignUpScreen() {
	const { signUp, errors, fetchStatus } = useSignUp();
	const { isSignedIn } = useAuth();

	const router = useRouter();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");

	const isLoading = fetchStatus === "fetching";

	if(signUp.status === "complete" || isSignedIn) {
		return null;
	}

	const onSignupPress = async () => {
		const { error } = await signUp.password({
			emailAddress: email,
			password,
			firstName,
			lastName,
		});

		if (error) {
			alert(error.message);
		}

		if (!error) await signUp.verifications.sendEmailCode();
	};

	const onVerifyPress = async () => {
		await signUp.verifications.verifyEmailCode({ code });
		if (signUp.status === "complete") {
			await signUp.finalize({
				navigate: ({ decorateUrl }) => {
					const url = decorateUrl("/");
					router.replace(url as any);
				},
			});
		}
	};

	if (
		signUp.status === "missing_requirements" &&
		signUp.unverifiedFields.includes("email_address") &&
		signUp.missingFields.length === 0
	) {
		return (
			<View className="flex-1 justify-center px-6 py-12">
				<Image
					source={require("../../assets/images/propykribb.png")}
					className="w-32 h-16 mb-8"
					resizeMode="contain"
				/>
				<Text className="text-3xl font-bold text-gray-800 mb-2">
					Verify Your Email
				</Text>
				<Text className="text-gray-500 mb-8">
					We've sent a verification code to your email. Please enter
					it below to verify your account.
				</Text>

				<View className="flex-row gap-3 mb-4">
					<TextInput
						className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
						placeholder="Enter Verification Code"
						keyboardType="number-pad"
						placeholderTextColor={"#9CA3AF"}
						autoCapitalize="none"
						value={code}
						onChangeText={setCode}
					/>
				</View>
				<View className="mb-4">
					{errors.fields.code && (
						<Text className="text-red-500">
							{errors.fields.code.message}
						</Text>
					)}
				</View>

				<View className="mb-4">
					<TouchableOpacity
						onPress={onVerifyPress}
						disabled={isLoading}
						className="w-full bg-blue-500 rounded-xl items-center py-3"
					>
						{isLoading ? (
							<ActivityIndicator color="white" />
						) : (
							<Text className="text-white font-bold text-base">
								Verify
							</Text>
						)}
					</TouchableOpacity>
				</View>
				<View className="mb-4">
					<TouchableOpacity
						onPress={() => signUp.verifications.sendEmailCode()}
						disabled={isLoading}
						className="py-3"
					>
						<Text className="text-blue-500 font-bold text-base">
							I need a new code
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			className="bg-white"
			keyboardShouldPersistTaps="handled"
		>
			<View className="flex-1 justify-center px-6 py-12">
				<Image
					source={require("../../assets/images/propykribb.png")}
					className="w-32 h-16 mb-8"
					resizeMode="contain"
				/>
				<Text className="text-3xl font-bold text-gray-800 mb-2">
					Create Account
				</Text>
				<Text className="text-gray-500 mb-8">
					Find your dream home with PropyKribb. Sign up to get
					started!
				</Text>

				<View className="flex-row gap-3 mb-4">
					<TextInput
						className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
						placeholder="First Name"
						placeholderTextColor={"#9CA3AF"}
						autoCapitalize="words"
						value={firstName}
						onChangeText={setFirstName}
					/>
					<TextInput
						className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
						placeholder="Last Name"
						placeholderTextColor={"#9CA3AF"}
						autoCapitalize="words"
						value={lastName}
						onChangeText={setLastName}
					/>
				</View>
				<View className="mb-4">
					<TextInput
						className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
						placeholder="Email"
						placeholderTextColor={"#9CA3AF"}
						keyboardType="email-address"
						autoCapitalize="none"
						value={email}
						onChangeText={setEmail}
					/>
					{errors.fields.emailAddress && (
						<Text className="text-red-500 mb-4">
							{errors.fields.emailAddress.message}
						</Text>
					)}
				</View>
				<View className="mb-4">
					<TextInput
						className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
						placeholder="Password"
						placeholderTextColor={"#9CA3AF"}
						secureTextEntry
						value={password}
						onChangeText={setPassword}
					/>
					{errors.fields.password && (
						<Text className="text-red-500 mb-4">
							{errors.fields.password.message}
						</Text>
					)}
				</View>
				<View className="mb-4">
					<TouchableOpacity
						onPress={onSignupPress}
						disabled={isLoading}
						className="w-full bg-blue-500 rounded-xl items-center py-3"
					>
						{isLoading ? (
							<ActivityIndicator color="white" />
						) : (
							<Text className="text-white font-bold text-base">
								Sign Up
							</Text>
						)}
					</TouchableOpacity>
				</View>

				<View className="flex-row justify-center">
					<Text className="text-gray-500">
						Already have an account?{" "}
					</Text>
					<Link
						href="/sign-in"
						className="text-blue-600 font-semibold"
					>
						Sign In
					</Link>
				</View>

				<View nativeID="clerk-capcha" />
			</View>
		</ScrollView>
	);
}
