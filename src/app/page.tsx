import Category from "@/components/Category"
import CoachList from "@/components/CoachList"
import Footer from "@/components/Footer"
import Info from "@/components/Info"
import Navbar from "@/components/Navbar"
import ReviewCard from "@/components/ReviewCard"
import Stats from "@/components/Stats"
export default async function Home() {
  return (
    <>
     <Navbar/>
      <Info/>
      <Stats/>
      <Category/>
      <CoachList/>
      <ReviewCard/>
      <Footer/>
    </>
  )
}
