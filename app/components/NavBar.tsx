"use client";

import { AuthenticationContext } from "@/context/AuthContext";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useContext, useState } from "react";
import AuthModal from "./AuthModal";
import { Box, IconButton, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";

export default function NavBar() {
  const { data, loading } = useContext(AuthenticationContext);
  const matches = useMediaQuery("(min-width:768px)");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  const toggleDrawerSmallDevices = (open: boolean) => {
    setIsOpen(open);
  };

  const { signout } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-3xl ">
        <p className="flex justify-center content-center rounded italic">
          table<span className="text-red-500">now</span>
        </p>
      </Link>
      <div>
        {loading ? null : (
          <>
            <div className="hidden md:flex">
              {data ? (
                <button
                  className="bg-blue-400 text-white border p-1 px-2 rounded mr-3"
                  onClick={signout}
                >
                  Sign out
                </button>
              ) : (
                <>
                  <AuthModal isSignin={true} />
                  <AuthModal isSignin={false} />
                </>
              )}
            </div>
            {!matches && (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={isOpen}
                  onClose={toggleDrawer(false)}
                >
                  <Box sx={{ width: 125 }} role="presentation">
                    <List>
                      <ListItem>
                        {data ? (
                          <div className="flex flex-col gap-4">
                            <span
                              className="text-red-600 uppercase font-bold text-3xl flex justify-end cursor-pointer"
                              onClick={toggleDrawer(false)}
                            >
                              &times;
                            </span>
                            <button
                              className="bg-blue-400 text-white border p-1 px-2 rounded mr-3"
                              onClick={signout}
                            >
                              Sign out
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-4">
                            <span
                              className="text-red-600 uppercase font-bold text-3xl flex justify-end cursor-pointer"
                              onClick={toggleDrawer(false)}
                            >
                              &times;
                            </span>
                            <AuthModal
                              isSignin={true}
                              toggleDrawerSmallDevices={
                                toggleDrawerSmallDevices
                              }
                            />
                            <AuthModal
                              isSignin={false}
                              toggleDrawerSmallDevices={
                                toggleDrawerSmallDevices
                              }
                            />
                          </div>
                        )}
                      </ListItem>
                    </List>
                  </Box>
                </Drawer>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
