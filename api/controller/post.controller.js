import Post from '../models/post.model.js'
import { errorHandler } from '../utils/error.js'

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'))
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'))
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '')
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  })
  try {
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    next(error)
  }
}

// E.g. GET /api/post/getposts?startIndex=0&limit=9&order=asc&userId=12345&category=reactjs&slug=introduction-to-mongodb&postId=67890&searchTerm=mongodb
export const getposts = async (req, res, next) => {
  try {
    // Get Posts matching condition
    // Summary: This query will search the posts collection for documents that match any of the provided conditions (userId, category, slug, postId), and if req.query.searchTerm is provided, it will further filter documents to those where the title or content contains the search term (case-insensitive). The results will then be sorted, skipped, and limited as specified.

    // The three dots (...) i.e. spread operator when used in the context of object literals, the spread operator allows you to spread the properties of an object into a new object. This can be particularly useful for conditionally adding properties to an object
    // const query = {
    //   ...(true && { a: 1 }),  // Adds { a: 1 } to the query object
    //   ...(false && { b: 2 }), // Does not add anything because the expression is false
    //   c: 3                    // Adds { c: 3 } to the query object
    // };
    // console.log(query); // Output: { a: 1, c: 3 }

    // The '$or' operator in MongoDB is used to perform a logical OR operation on an array of two or more expressions and select the documents that satisfy at least one of the expressions. In the provided code snippet, '$or' is used to create a search functionality that looks for a search term in multiple fields of a document.

    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 9 // limit number of posts returned
    const sortDirection = req.query.order === 'asc' ? 1 : -1

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)

    // Get total Posts
    const totalPosts = await Post.countDocuments()

    // Get last month Posts
    const now = new Date()
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    })

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    })
  } catch (error) {
    next(error)
  }
}
