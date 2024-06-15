import CallToAction from '../components/CallToAction'

export default function Projects() {
  return (
    <div className='min-h-screen max-w-5xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>My Projects</h1>
      <p className='text-md  text-gray-300'>
        Checkout some of my practice projects that I have built while learning
        HTML, CSS, JavaScript and MERN stack!
      </p>
      <CallToAction />
    </div>
  )
}
