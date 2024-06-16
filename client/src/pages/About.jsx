export default function About() {
  return (
    <div className='min-h-screen mt-36 flex justify-center'>
      <div className='max-w-5xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>
            About My Blog
          </h1>
          <div className='text-md text-left flex flex-col gap-6'>
            <p className='mb-4'>
              Welcome to my blog! I created this space as a personal project to
              share my insights and ideas with the world. As a passionate
              developer, I love to explore and write about technology, coding,
              and everything in between.
            </p>
            <p className='mb-4'>
              Here, you'll find a variety of articles and tutorials on topics
              like web development, software engineering, and programming
              languages.
            </p>
            <p className='underline font-semibold'>
              My blog offers several features to enhance your experience:
            </p>
            <ul className='list-disc list-inside text-left mb-4'>
              <li className='mb-2'>
                Engage with the community by leaving <strong>comments</strong>{' '}
                on my <strong>posts</strong>.
              </li>
              <li className='mb-2'>
                <strong>Like</strong> and reply to other readers' comments to
                foster discussions.
              </li>
              <li className='mb-2'>
                <strong className='text-pink-500'>Coming Soon:</strong> Stay
                updated with the latest posts through my subscription service.
              </li>
              <li className='mb-2'>
                Use the powerful <strong>search</strong> functionality to find
                exactly what you're looking for.
              </li>
              <li className='mb-2'>
                You can <strong>filter</strong> posts by keywords, categories,
                and sort them by date to find the most relevant content quickly.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
