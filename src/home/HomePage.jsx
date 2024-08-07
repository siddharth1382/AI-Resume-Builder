import Header from "@/components/custom/Header";
import React from "react";
import { Button } from "@/components/ui/button";
import { FaYoutube, FaProductHunt, FaReddit } from "react-icons/fa";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-300">
        <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Resum<span className="text-orange-600">Ace</span>
          </h1>
          <h1 className="text-6xl font-bold">
            Build Your Resume <span className="text-orange-600">With AI</span>
          </h1>

          <p className="mt-4 text-2xl text-orange-600">
            Effortlessly Craft a Standout Resume with Our AI-Powered Builder
          </p>

          <div className="flex items-center justify-center mt-6 space-x-4">
            <Link to={"/dashboard"}>
              <Button className="px-6 py-3 text-lg font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700">
                Get Started
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center mt-12 space-x-6">
            <FaYoutube className="h-10 w-10 text-gray-700" />
            <FaProductHunt className="h-10 w-10 text-gray-700" />
            <FaReddit className="h-10 w-10 text-gray-700" />
          </div>
        </main>
      </div>
    </>
  );
}

export default HomePage;
