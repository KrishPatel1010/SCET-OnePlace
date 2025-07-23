import Image from "next/image";
import Navbar from "./components/Navbar";
import Mainbody from "./components/Mainbody";
import HorizontalWorkflowSection from "./components/HorizontalWorkFlow";
import TNPWorkflow from "./components/simpleworkflow";
import StatisticsSection from "./components/statisticSection";


export default function Home() {
  return (
  <>
  

    <Mainbody/>
    <TNPWorkflow />
     <StatisticsSection />
  
  </>
  );
}
