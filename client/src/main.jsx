import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import api from "./services/api";
import App from "./App.jsx";
import "./index.css";

const loadStudents = async () => {
	try {
		const response = await api.get("/students");
		return response.data;
	} catch (error) {
		console.error("Error fetching students:", error);
		return [];
	}
};

loadStudents().then((students) => {
	createRoot(document.getElementById("root")).render(
		<StrictMode>
			<App initialStudents={students} />
		</StrictMode>
	);
});