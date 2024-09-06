import { createBrowserRouter } from "react-router-dom"
import { Home } from "../pages/Home"
import { About } from "../pages/About"
import { Profile } from "../pages/Profile"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/profile",
    element: <Profile />
  }
])