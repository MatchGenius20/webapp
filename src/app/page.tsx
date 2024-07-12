import Category from "@/components/Category"
import CoachList from "@/components/CoachList"
import Info from "@/components/Info"
import Navbar from "@/components/Navbar"
import Stats from "@/components/Stats"

export default async function Home() {
  return (
    <>
     <Navbar/>
      <Info/>
      <Stats/>
      <Category/>
      <CoachList/>
    </>
  )
}
