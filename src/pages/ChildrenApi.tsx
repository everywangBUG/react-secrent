import React, { useEffect } from "react"

export const ChildrenApi: React.FC<Props> = (props) => {
  const { children } = props
  const arr = React.Children.toArray(children)
  // 直接使用数组方法操作children有三个问题
  // 1.用数组的方法需要声明 children 为 ReactNode[] 类型，这样就必须传入多个元素才行，而 React.Children 不用
  // 2.用数组的方法不会对 children 做拍平，而 React.Children 会
  // 3.用数组的方法不能做排序，因为 children 的元素是只读的，而用 React.Children.toArray 转成数组就可以了
  console.log(arr.sort())
  console.log(arr, "placeholder")
  
  useEffect(() => {
    console.log(React.Children.count(children), "111")
    console.log(React.Children.forEach(children, (item, index) => console.log(item, index, "item, index")))
    // console.log(React.Children.only(children), "222") // 如果children 不是单个元素，会报错
  }, [])
  
  return (
    <>
      {/* 这里的map会把数组拍平，普通的数组方法不会 */}
      {
        arr.map((item, index) => {
          return (
            <div key={index}>
              {item}
            </div>
          )
        })
      }
    </>
  )
}

export const Super: React.FC = () => {
  return (
    <>
      <ChildrenApi>
        {
          [
            <div>111</div>,
            <div>222</div>,
            <div>333</div>,
            [<div>444</div>, [<div>555</div>]]
          ]
        }
      </ChildrenApi>
    </>
  )
}

interface Props {
  children?: React.ReactNode
}