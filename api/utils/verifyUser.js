import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'))
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'))
    }
    // For e.g. 'user' object sample -> user { id: '663f695396f3e6677d1fa94f', "isAdmin": true, iat: 1718021393 }
    // Assign the user object to the req.user
    // We can access the fields as required - for e.g. req.user.id or req.user.isAdmin
    req.user = user
    next()
  })
}
