import { lazy, Suspense } from "react"
import { createRoot } from "react-dom/client"
import "./global.scss"
import "virtual:uno.css"
import "unocss"

const App = lazy(() => import("./App.tsx").then((module) => ({ default: module.App })))

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div text-center>loading...</div>}>
    <App />
  </Suspense>
)
