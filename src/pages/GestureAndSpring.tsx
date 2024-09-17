import { useSprings, animated } from "@react-spring/web"


const pages = [
  "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
]

export const GestureAndSpring: React.FC = () => {
  const width = window.innerWidth
  const [props, api] = useSprings(pages.length, i => ({ x: width * i, scale: 1 }))

  return (
    <div relative w-screen h-screen overflow="hidden">
      {
        props.map(({ x, scale }, i) => (
          <animated.div
            absolute w-screen h-screen touch-none
            key={i}
            style={{ x }}
          >
            <animated.div
              touch-none bg-cover bg-no-repeat bg-center-center w-screen h-screen shadow-md
              style={{ scale, backgroundImage: `url(${pages[i]})` }}
            />
          </animated.div>
        ))
      }
    </div>
  )
}
