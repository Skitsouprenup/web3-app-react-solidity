import Credentials from '@/components/Credentials'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Service from '@/components/Service'
import Transaction from '@/components/Transaction'
import '@/styles/views/homepageview.scss'
import Navbar from "@comps/Navbar"

const HomePageView = () => {

  return (
    <div className='home-page-view-container'>
      <Navbar />
      <HeroSection />
      <Credentials />
      <Service />
      <Transaction />
      <Footer />
    </div>
  )
}

export default HomePageView