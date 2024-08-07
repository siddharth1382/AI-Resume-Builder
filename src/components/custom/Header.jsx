import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
    <Link to={'/'}>

      <div className="flex gap-1 items-center">
        <img src="/logo.svg"></img>
        <h1 className="text-2xl font-bold">
            Resum<span className="text-orange-600">Ace</span>
          </h1>
      </div>
    </Link>

      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={'/dashboard'}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link to={"auth/sign-in"}>
          <Button> Get Started </Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
