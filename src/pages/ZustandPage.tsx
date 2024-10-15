
import { useEffect } from "react"
import { create } from "zustand"

const useXxxStore = create((set) => ({
  aaa: "",
  bbb: "",
  updateAaa: (aaa: string) => set({ aaa }),
  updateBbb: (bbb: string) => set({ bbb })
}))

export const ZustandPage: React.FC = () => {
  const updateAaa = useXxxStore(state => state.updateAaa)
  const aaa = useXxxStore(state => state.aaa)
  useEffect(() => {
    useXxxStore.subscribe((state) => {
      console.log(useXxxStore.getState())
    })
  })
  
  return (
    <div>
      <input onChange={(e) => updateAaa(e.target.value)} value={aaa} />
      <Bbb />
    </div>
  )
}

const Bbb = () => {
  return <div><Ccc /></div>
}

const Ccc = () => {
  const aaa = useXxxStore(state => state.aaa)
  
  return <div>{aaa}</div>
}
