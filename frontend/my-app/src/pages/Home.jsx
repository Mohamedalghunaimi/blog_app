import Blogs from '../compontents/Blogs'
import Footer from '../compontents/Footer'
import Hero from '../compontents/Hero'
import Navbar from '../compontents/Navbar'
import Subscribe from '../compontents/Subscribe'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero />
    <Blogs />
    <Subscribe/>
    <Footer />
    </>
  )
}

export default Home
