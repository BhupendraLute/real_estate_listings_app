import { Slot } from "expo-router";
import "./global.css";

const properties = [
	{ id: "1", name: "Modern Apartment", price: 250000 },
	{ id: "2", name: "Cozy Cottage", price: 150000 },
	{ id: "3", name: "Luxury Villa", price: 750000 },
	{ id: "4", name: "Beachfront Condo", price: 500000 },
];

export default function RootLayout() {
	return <Slot />;
}
