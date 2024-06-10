import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
  res.json({ message: 'API is working!' })
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
  if (req.user.id !== req.params.userId) {
    console.log('req.user.id', req.user.id)
    console.log('req.params.userId', req.params.userId)
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
