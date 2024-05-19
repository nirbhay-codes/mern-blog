import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa'

export default function Header() {
  const path = useLocation().pathname
  return (
    <Navbar className='border-b-2'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Nirbhay's
        </span>
        Blog
      </Link>

      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      {/* The md:order-2 ensures that on screens bigger than medium size, the FaMoon icon and the "Sign In" button are placed at the end after the individual Link items in Navbar */}
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        <Link to='/sign-in'>
          <Button gradientDuoTone='purpleToBlue' outline>Sign In</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      {/* Breakpoint prefix	        Minimum width	CSS
          sm	                    640px      	    @media (min-width: 640px) 
          md	                    768px	        @media (min-width: 768px) 
          lg	                    1024px	        @media (min-width: 1024px)
          xl	                    1280px	        @media (min-width: 1280px) */}
      {/* Navbar.Toggle component internally handles the screen size and is only visible on medium screen sizes and below */}
      {/* The below group contains Links which are part of the Navbar. In screen sizes bigger than mobile, these Link items are shown outside on the Navbar */}
      <Navbar.Collapse>
        <Navbar.Link active={path == '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path == '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path == '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
