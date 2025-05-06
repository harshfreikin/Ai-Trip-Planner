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
  DialogTitle,
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
    <div className="p-3 shadow-sm flex justify-between items-center px-3">
      <img src="/logo.svg" alt="Logo" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/my-trips">
            <button variant="outline" className="rounded-full bg-white border border-black px-4 py-1">My Trips</button>
            </a>
            <Popover>
              <PopoverTrigger>
              <img
                src={user?.picture || "/default-avatar.png"}
                onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
               }}
                className="h-[35px] w-[35px] rounded-full object-cover"
                alt="User Avatar"
              />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={handleLogout}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="[&>button]:ring-0 [&>button]:ring-offset-0">
          <DialogHeader>
            <DialogTitle className="sr-only">Google Sign In</DialogTitle>
            <DialogDescription asChild>
              <div>
                <img src="/logo.svg" alt="logo" />
                <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
                <span>Sign in to the App with Google authentication securely</span>

                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign In With Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
