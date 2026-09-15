const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				message: "User already exists"
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
			password: hashedPassword
		});

		res.status(201).json({
			message: "User registered successfully",
			user: {
				id: user._id,
				name: user.name,
				email: user.email
			}
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				message: "Invalid email or password"
			});
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			user.password
		);

		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Invalid email or password"
			});
		}

		const token = jwt.sign(
			{ userId: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		res.status(200).json({
			message: "Login successful",
			token
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");

		if (!user) {
			return res.status(404).json({
				message: "User not found"
			});
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	register,
	login,
	getProfile
};