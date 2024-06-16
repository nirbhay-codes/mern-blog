import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { signoutSuccess } from '../redux/user/userSlice'
import { useEffect, useState } from 'react'

export default function Header() {
  const path = useLocation().pathname
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)
  const { theme } = useSelector((state) => state.theme)
  const [searchTerm, setSearchTerm] = useState('')

  // !This is to fetch whatever is in the browser URL as '?searchTerm=' and set it to the 'searchTerm' state which will show up in the <TextInput>
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      })
      const data = await res.json()
      if (!res.ok) {
        console.log(data.message)
      } else {
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  // !This is to set the URL search query using whatever is entered in <TextInput>
  const handleSubmit = async (e) => {
    e.preventDefault()
    // !Here we take the value of the <TextInput> and build the '?searchTerm=' and navigate to that path
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}&category=uncategorized&sort=asc`)
  }

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

      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button
        className='w-12 h-10 lg:hidden'
        color='gray'
        pill
        onClick={() => navigate('/search')}
      >
        <AiOutlineSearch />
      </Button>
      {/* The md:order-2 ensures that on screens bigger than medium size, the FaMoon icon and the "Sign In" button are placed at the end after the individual Link items in Navbar */}
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 sm:inline'
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
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
        <Link to='/'>
          <Navbar.Link active={path == '/'} as={'div'}>
            Home
          </Navbar.Link>
        </Link>
        <Link to='/about'>
          <Navbar.Link active={path == '/about'} as={'div'}>
            About
          </Navbar.Link>
        </Link>
        <Link to='/projects'>
          <Navbar.Link active={path == '/projects'}>Projects</Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
