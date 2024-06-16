import { Button } from 'flowbite-react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>Mini-React projects</h2>
        <p className='my-2'>
          Checkout some of my practice (mini) React projects
        </p>
        <Button
          gradientDuoTone='purpleToPink'
          className='rounded-tl-xl rounded-bl-none'
        >
          <a
            href='https://nirbhay-react-08-contentful-cms.netlify.app/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Mini React projects
          </a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src='https://nirbhay-react-08-contentful-cms.netlify.app/assets/hero-d50f9f18.svg' />
      </div>
    </div>
  )
}
