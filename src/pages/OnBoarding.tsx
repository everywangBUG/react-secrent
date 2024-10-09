import { Mask } from "../components/OnBoarding/Mask"

export const OnBoarding: React.FC = () => {
  return (
    <>
      <Mask
        element={document.getElementById("xxx")!}
        renderMaskContent={(wrapper) => {
          return wrapper
        }}
      />
      <div id="xxx" w-100 m-auto>
        OnBoarding
        <div>1111</div>
        <div>2222</div>
        <div>3333</div>
      </div>
    </>
  )
}
