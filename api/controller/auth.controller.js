import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    return next(errorHandler(400, 'All fields are required'))
  }

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  })

  try {
    await newUser.save()
    res.json('Signup successful')
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required'))
  }

  try {
    const validUser = await User.findOne({ email })

    if (!validUser) {
      return next(errorHandler(404, 'User not found'))
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password)

    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'))
    }

    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET
    )

    // !takes the user data from validUser._doc, creates a new variable 'pass' to hold the 'password' property, and creates another variable 'rest' that holds all the other user data except the password.
    const { password: pass, ...rest } = validUser._doc

    res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)
  } catch (error) {
    next(error)
  }
}

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      // sign-in with the google account info
      // !Note: No need to verify the password match as it is already authenticated by Google OAuth
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password, ...rest } = user._doc
      res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest)
    } else {
      // sign-up with the google account info
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email: email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      })

      await newUser.save()

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password, ...rest } = newUser._doc

      res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}
