import { useState } from "react";
import api from "./services/api";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
	const [user, setUser] = useState(null);
	const [showLogin, setShowLogin] = useState(true);
	const [error, setError] = useState("");

	const handleRegister = async (formData) => {
		try {
			setError("");

			await api.post("/register", formData);

			setShowLogin(true);
		} catch (error) {
			setError(
				error.response?.data?.message || "Registration failed"
			);
		}
	};

	const handleLogin = async (formData) => {
		try {
			setError("");

			const response = await api.post("/login", formData);

			const token = response.data.token;

			localStorage.setItem("token", token);

			const profileResponse = await api.get("/profile", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			setUser(profileResponse.data);
		} catch (error) {
			setError(
				error.response?.data?.message || "Login failed"
			);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<div className="min-h-screen bg-black text-white">
			<header className="border-b border-zinc-800">
				<div className="max-w-6xl mx-auto px-6 py-5">
					<h1 className="text-2xl font-bold">
						JWT Authentication
					</h1>

					<p className="text-gray-500 text-sm mt-1">
						Register, login and protected profile
					</p>
				</div>
			</header>

			<main className="max-w-md mx-auto px-6 py-8">
				{user ? (
					<Profile
						user={user}
						onLogout={handleLogout}
					/>
				) : (
					<>
						<div className="flex mb-6 bg-zinc-900 rounded-lg p-1">
							<button
								onClick={() => {
									setShowLogin(true);
									setError("");
								}}
								className={`flex-1 py-2 rounded-md ${
									showLogin
										? "bg-blue-600 text-white"
										: "text-gray-400"
								}`}
							>
								Login
							</button>

							<button
								onClick={() => {
									setShowLogin(false);
									setError("");
								}}
								className={`flex-1 py-2 rounded-md ${
									!showLogin
										? "bg-blue-600 text-white"
										: "text-gray-400"
								}`}
							>
								Register
							</button>
						</div>

						{error && (
							<div className="mb-4 bg-red-900/30 border border-red-800 text-red-400 rounded-lg px-4 py-3">
								{error}
							</div>
						)}

						{showLogin ? (
							<Login onLogin={handleLogin} />
						) : (
							<Register onRegister={handleRegister} />
						)}
					</>
				)}
			</main>
		</div>
	);
}

export default App;