const bcrypt = require("bcryptjs");
const { User } = require("../models");
const generateToken = require("../utils/generateToken.js");

//Register Section we applied POST method (if I need to delete a user, we should make another archive)
//Define registerUser as function
const registerUser = async (req, res) => {
    const {firstName, lastName, email, password} = req.body; //reconstructuring, obteins parameters of the object.

    try{
       const userExists = await User.findOne({where:{ email }})   //User.findOne sequelize method searches one row.
        if(userExists) return res.status(400).json({ message: "User already exists"});

        const salt = await bcrypt.genSalt(10); // it generes a random salt 10 times.
        const hashedPassword = await bcrypt.hash(password, salt); 
        const user = await User.create({ firstName, lastName, email, password: hashedPassword});

          const token = generateToken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
       } catch(error){
        console.error("Register error:",error);
        res.status(500).json({ message: "Register error"});
       }
};

// Login Section

const loginUser = async (req, res) => {
    const { email, password } = req.body;

   try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid information" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid information" });

        const token = generateToken(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
module.exports = { registerUser, loginUser };
