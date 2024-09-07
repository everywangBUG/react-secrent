import { Suspense } from "react"
import { atom, useAtom } from "jotai"
import { Aaa } from "../components/ErrorBoundary/ErrorBoundary"

const userAtom = atom(async () => {
  const userId = 1
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}?_delay=2000`
  )
  return response.json()
})

const UserName = () => {
  const [user] = useAtom(userAtom)
  return <div>User name: {user.name}</div>
}

// ErrorBoundary和Suspense实现的底层原理差不多，前者是throw Error，后者是throw Promise
// 使用Suspense的三种方式
// 1. 和lazy配合使用
// 2. 使用支持Suspense的库，如jotai
// 3. 配合use这个hook使用，当use这个hook目前还在实验阶段

export const About = () => {
  return <Suspense fallback="Loading...">
    <UserName />
    <Aaa />
  </Suspense>
}
