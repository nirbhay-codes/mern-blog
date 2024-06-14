import { Button, Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../components/CallToAction'

export default function PostPage() {
  // !In React Router, the useParams() hook knows the names of the parameters based on the route configuration defined in your application
  const { postSlug } = useParams() // Refer this for the postSlug --> <Route path='/post/:postSlug' element={<PostPage />} />
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [post, setPost] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
        const data = await res.json()
        if (!res.ok) {
          setError(true)
          setLoading(false)
          return
        }
        if (res.ok) {
          setPost(data.posts[0])
          setLoading(false)
          setError(false)
        }
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchPost()
  }, [postSlug])

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    )
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      {/* 'dangerouslySetInnerHTML' is an object with a property __html. The value of __html is the HTML content you want to insert into the div.
      In this case, post && post.content is evaluated. If post is truthy (i.e., it exists and is not null or undefined), it takes the content property of post. 
      
      The content property of post is expected to be a string containing HTML. By using 'dangerouslySetInnerHTML', you are telling React to set the inner HTML of the div to this string.
      This bypasses React's built-in protection against XSS (Cross-Site Scripting) attacks. Therefore, you need to ensure that the HTML content is safe and has been sanitized properly if it comes from an untrusted source.
      */}
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
    </main>
  )
}
