// import { useEffect, useState } from "react"
// import { Mask } from "../components/OnBoarding/Mask"
// import { Button, Popover } from "antd"

// export const OnBoarding: React.FC = () => {
//   const [element, setElement] = useState<HTMLElement | null>(null)
  
//   useEffect(() => {
//     // 确保 DOM 已经加载完成
//     const targetElement = document.getElementById("xxx")
//     if (targetElement) {
//       setElement(targetElement)
//     } else {
//       console.error("Element with ID 'xxx' not found.")
//     }
//   }, [])

//   return (
//     <>
//     {
//       element && 
//       <Mask
//         element={element}
//         renderMaskContent={(wrapper) => {
//           return <Popover
//             open={true}
//             content={
//               <div style={{width: 300}}>
//                 <p>hello</p>
//                 <Button type="primary">下一步</Button>
//               </div>
//             }
//           >{wrapper}</Popover>
//       }}
//       />
//     }
//       <div id="xxx" w-100 m-auto>
//         OnBoarding
//         <div>1111</div>
//         <div>2222</div>
//         <div>3333</div>
//       </div>
//     </>
//   )
// }

import { OnBoarding } from "../components/OnBoarding/OnBoarding"
import { Button, Flex } from "antd"

export const OnBoardingPage: React.FC = () => {

  return <div className='App'>
    <Flex gap="small" wrap="wrap" id="btn-group1">
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </Flex>

  <div style={{height: "1000px"}}></div>

  <Flex wrap="wrap" gap="small">
    <Button type="primary" danger>
      Primary
    </Button>
    <Button danger>Default</Button>
    <Button type="dashed" danger  id="btn-group2">
      Dashed
    </Button>
    <Button type="text" danger>
      Text
    </Button>
    <Button type="link" danger>
      Link
    </Button>
  </Flex>

  <div style={{height: "500px"}}></div>

  <Flex wrap="wrap" gap="small">
    <Button type="primary" ghost>
      Primary
    </Button>
    <Button ghost>Default</Button>
    <Button type="dashed" ghost>
      Dashed
    </Button>
    <Button type="primary" danger ghost id="btn-group3">
      Danger
    </Button>
  </Flex>

  <OnBoarding
      steps={
        [
          {
            selector: () => {
              return document.getElementById("btn-group1")
            },
            renderContent: () => {
              return "神说要有光"
            },
            placement: "bottom"
          },
          {
            selector: () => {
              return document.getElementById("btn-group2")
            },
            renderContent: () => {
              return "于是就有了光"
            },
            placement: "bottom"
          },
          {
            selector: () => {
              return document.getElementById("btn-group3")
            },
            renderContent: () => {
              return "你相信光么"
            },
            placement: "bottom"
          }
        ]
      } />
  </div>
}
