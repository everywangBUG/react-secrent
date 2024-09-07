import { router } from "./route/route"
import { RouterProvider } from "react-router-dom"

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App


