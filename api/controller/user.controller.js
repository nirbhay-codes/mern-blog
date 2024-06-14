import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
  res.json({ message: 'API is working!' })
}

export const deleteUser = async (req, res, next) => {
  // Sample: req.user { id: '6666e4391a044a3e15bc7135', iat: 1718022856 }
  // !Below logic says that if it is NOT an admin then req.user.id should match req.params.userId, else error.
  // !This means an admin should be allowed to delete any user even if the ID does not match.
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'))
  }
  try {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json('User has been deleted')
  } catch (error) {
    next(error)
  }
}

// /api/user/update/:userId
export const updateUser = async (req, res, next) => {
  // Validate user authorization
  const authorizationError = isValidUser(req)
  if (authorizationError) {
    return next(errorHandler(403, authorizationError))
  }

  // Validate user input
  const validationError = validateUserInput(req.body)
  if (validationError) {
    return next(errorHandler(400, validationError))
  }

  try {
    const updatedUser = await updateUserInDatabase(req.params.userId, req.body)
    const { password, ...rest } = updatedUser._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

// Separate function for database update logic
async function updateUserInDatabase(userId, updatedUserData) {
  // Hash password if provided
  if (updatedUserData.password) {
    updatedUserData.password = bcryptjs.hashSync(updatedUserData.password, 10)
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updatedUserData },
    { new: true }
  )

  return updatedUser
}

// Separate validation functions
function isValidUser(req) {
  console.log('req.user', req.user)
  if (req.user.id !== req.params.userId) {
    return 'You are not allowed to update this user'
  }
  return null // No error if authorized
}

function validateUserInput(body) {
  // Password validation (optional)
  if (body.password && body.password.length < 6) {
    return 'Password must be at least 6 characters'
  }

  // Username validation
  if (body.username) {
    if (body.username.length < 7 || body.username.length > 20) {
      return 'Username must be between 7 and 20 characters'
    }
    if (body.username.includes(' ')) {
      return 'Username cannot contain spaces'
    }
    if (body.username !== body.username.toLowerCase()) {
      return 'Username must be lowercase'
    }
    if (!body.username.match(/^[a-zA-Z0-9]+$/)) {
      return 'Username can only contain letters and numbers'
    }
  }

  // Email validation
  if (body.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return 'Invalid email format'
    }
  }

  return null // No error if valid
}

export const signout = (req, res, next) => {
  try {
    res.clearCookie('access_token').status(200).json('User has been signed out')
  } catch (error) {
    next(error)
  }
}

// GET http://localhost:5173/api/user/getusers?startIndex=0&limit=9&sort=asc
export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'))
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9
    const sortDirection = req.query.sort === 'asc' ? 1 : -1

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit)

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc
      return rest
    })

    const totalUsers = await User.countDocuments()

    const now = new Date()

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    })

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    })
  } catch (error) {
    next(error)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return next(errorHandler(404, 'User not found'))
    }
    const { password, ...rest} = user._doc
    res.status(200).json(rest)
  } catch (error) {
    next(error);
  }
}
