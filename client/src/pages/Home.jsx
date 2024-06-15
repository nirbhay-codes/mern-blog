import { Link } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import { Button } from 'flowbite-react'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts')
      const data = await res.json()
      setPosts(data.posts)
    }
    fetchPosts()
  }, [])

  return (
    <div>
      {/* Welcome */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl text-center'>
          Welcome to my Blog
        </h1>
        <p className='text-gray-500 text-xs sm:text-lg'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <div className='flex justify-center'>
          <Link to={'/search'}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-auto'
            >
              View all Posts
            </Button>
          </Link>
        </div>
      </div>
      {/* CallToAction */}
      <div className='max-w-6xl mx-auto p-3 bg-teal-100 dark:bg-slate-500'>
        <CallToAction />
      </div>

      {/* Recent Posts */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex justify-center flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
