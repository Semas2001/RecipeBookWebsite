import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#FBF7F2] text-[#62645b] p-10 text-center">
      <Navbar/>
      <div>
        <h1 className="font-CBR font-heading mt-5 text-6xl">The Recipe for a Family</h1>
        <p className="mt-4">
          Welcome to our Family Recipe Book, where we share our favorite recipes and keep our family traditions alive.
        </p>
        <p className="mt-2">Ready to add your own recipe?</p>
      </div>
      
      <div className="mt-10">
        <h2 className="border-b border-black mb-4 text-2xl">
          <span className="bg-[#FBF7F2] px-2">Recent Additions</span>
        </h2>
        
        <ul className="list-none flex justify-center flex-wrap">
          <li className="mr-4 mb-4 w-[500px] text-center">
            <Image 
              src="/Photo1.jpg" 
              alt="Chicken Alfredo" 
              width={500} 
              height={300} 
              className="border border-gray-300 rounded p-1 w-full h-[300px] object-cover"
            />
            <div className="mt-2">Chicken Alfredo</div>
          </li>
          
          <li className="mr-4 mb-4 w-[500px] text-center">
            <Image 
              src="/Photo2.jpg" 
              alt="Grandma's Apple Pie" 
              width={500} 
              height={300} 
              className="border border-gray-300 rounded p-1 w-full h-[300px] object-cover"
            />
            <div className="mt-2">Grandma's Apple Pie</div>
          </li>
          
          <li className="mr-4 mb-4 w-[500px] text-center">
            <Image 
              src="/Photo3.jpeg" 
              alt="BBQ Ribs" 
              width={500} 
              height={300} 
              className="border border-gray-300 rounded p-1 w-full h-[300px] object-cover"
            />
            <div className="mt-2">BBQ Ribs</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
