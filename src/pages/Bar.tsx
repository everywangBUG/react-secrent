import { lazy } from "react"
import img1 from "../assets/test.png"
import { LazyLoad } from "../components/LazyLoad"

const Bazz = lazy(() => import("./Bazz"))

export const Bar: React.FC = () => {
  return (
    <div children-h-200px>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
      <LazyLoad placeholder={<div>loading...</div>} onContentVisible={() => alert("com visible")}>
        <Bazz />
      </LazyLoad>
      <LazyLoad placeholder={<div>loading...</div>} offset={300} onContentVisible={() => alert("img visible")}>
        <img src={img1} alt="" />
      </LazyLoad>
    </div>
  )
}
