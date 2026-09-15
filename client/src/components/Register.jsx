import { useState } from "react";

function Register({ onRegister }) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: ""
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onRegister(formData);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
		>
			<h2 className="text-xl font-semibold text-white mb-5">
				Register
			</h2>

			<div className="space-y-4">
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Name"
					required
					className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
				/>

				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="Email"
					required
					className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
				/>

				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Password"
					required
					className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white outline-none focus:border-blue-500"
				/>
			</div>

			<button
				type="submit"
				className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg"
			>
				Register
			</button>
		</form>
	);
}

export default Register;