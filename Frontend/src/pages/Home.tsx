import NavBar from '../components/NavBar'
import SearchDropdown from '../components/SearchDropdown'

function Home() {

    return(
        <div className='bg-black h-screen relative'>
            <NavBar/>
            <div className='relative z-10'>
                <SearchDropdown/>
            </div>
        </div>
    )
}

export default Home