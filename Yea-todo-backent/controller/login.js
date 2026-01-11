const { handleError } = require('../handler/handleError.js')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
const { generateToken } = require('../handler/jwtGenerate.js')

const Login = async (req, res) => {
    try {
        const { name, email, password, isLogin } = req?.body
        if (!email) { return res.status(400).json({ success: false, message: 'Email is required' }) }
        if (!password) { return res.status(400).json({ success: false, message: 'Password is required' }) }
        if (isLogin) {
            const user = await User.findOne({ email })
            if (!user) { return res.status(400).json({ success: false, message: 'User not Registered' }) }
            const passwordMatch = await bcrypt.compare(password, user?.password)
            if (!passwordMatch) { return res.status(400).json({ success: false, message: 'Incorrect Password' }) }
            const token = generateToken(user._id, "90d");
            return res.status(200).json({ success: true, message: 'Login successful', token,isLogin:true })
        } else {
            if (!name) { return res.status(400).json({ success: false, message: 'Name is required' }) }
            const hashedPassword = await bcrypt.hash(password, 10)
            await User.create({ name, email, password: hashedPassword })
            return res.status(200).json({ success: true, message: 'User created successfully',isLogin:false })
        }

    } catch (error) {
        handleError(error, res)
    }
}


module.exports = {
    Login
}