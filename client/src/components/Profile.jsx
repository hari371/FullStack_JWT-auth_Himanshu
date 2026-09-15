function Profile({ user, onLogout }) {
	return (
		<div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold text-white">
					Profile
				</h2>

				<button
					onClick={onLogout}
					className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
				>
					Logout
				</button>
			</div>

			<div className="space-y-3">
				<p className="text-gray-300">
					<span className="text-gray-500">Name:</span>{" "}
					{user.name}
				</p>

				<p className="text-gray-300">
					<span className="text-gray-500">Email:</span>{" "}
					{user.email}
				</p>
			</div>
		</div>
	);
}

export default Profile;