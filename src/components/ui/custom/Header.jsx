import React, { useEffect, useState } from "react";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Login success:", codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log("Login error:", error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data);
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Failed to fetch user profile:", err);
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-3 bg-white">
      <img
        src="/newlogo.svg"
        alt="Ayhaha Trips Logo"
        className="h-12 w-auto max-h-16"
      />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="p-0 m-0 bg-transparent border-none shadow-none focus:outline-none"
                  style={{ background: "transparent" }}
                >
                  <img
                    src={user?.picture || "/default-avatar.png"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-avatar.png";
                    }}
                    className="h-[35px] w-[35px] rounded-full object-cover border border-gray-300 shadow-sm"
                    alt="User Avatar"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={handleLogout}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)} className="bg-white text-black border border-black">Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md mx-auto rounded-2xl shadow-2xl p-8 bg-white flex flex-col items-center [button[aria-label='Close']]:hidden">
          {/* Top Row: Title and Close Button */}
          <div className="w-full flex items-center justify-between mb-6">
            <span className="font-extrabold text-2xl text-teal-700 tracking-wide flex-1 text-left">AYHAHA TRIPS</span>
            <button
              onClick={() => setOpenDialog(false)}
              className="text-gray-500 hover:text-red-500 text-3xl font-bold focus:outline-none bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow transition ml-4"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          {/* Centered Content */}
          <div className="flex flex-col items-center w-full">
            <h3 className="font-semibold text-lg mt-2 mb-1 text-center text-gray-800">
              Sign In With Google
            </h3>
            <span className="mb-6 text-gray-500 text-center text-sm">
              Sign in to the App with Google authentication securely
            </span>
            <Button
              onClick={login}
              className="w-full mt-2 flex gap-4 items-center bg-black text-white hover:bg-gray-800 text-lg py-3 rounded-lg shadow"
            >
              <FcGoogle className="h-7 w-7" />
              Sign In With Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
