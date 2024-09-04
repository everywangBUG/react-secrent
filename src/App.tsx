import { router } from "./route/route"
import { RouterProvider } from "react-router-dom"

export const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}


