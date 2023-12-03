import Typewriter from "typewriter-effect"
import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import Layout from "../Layout"

const ManifestoPage = () => {
  const [isTypingEnded, setIsTypingEnded] = useState(false)

  const isMobile = useMediaQuery("(max-width: 685px)")
  const isFont16 = useMediaQuery("(max-width: 562px)")
  const isIphone = useMediaQuery("(max-width: 400px)")
  return (
    <Layout type="contained">
      <div
        className="min-h-[100vh]
          flex items-start
          pt-[12rem]
          pb-[20px]
          pl-0 md:pl-12"
      >
        <div
          className={`font-quicksand font-medium
            text-[9px] xs:text-[11px] dark:text-white 
            md:leading-[137%]
            ${isTypingEnded && "no_typecursor"}`}
          style={{
            // eslint-disable-next-line no-nested-ternary
            fontSize: !isMobile ? "19px" : !isFont16 ? "16px" : !isIphone ? "13px" : "",
          }}
        >
          <Typewriter
            onInit={(tyepwriter) => {
              tyepwriter
                .typeString(
                  `The world, once vibrant, has faded into shades of grey.<br />
                Drained of color by control, greed, and power.<br />
                Individuality has become a monochrome echo of what it once was.<br />
                <br />
                But we’re still here, and we stand different.<br />
                We are the color in this world gone black and white.<br />
                We are the creative spark, reigniting passion and purpose.<br />
                We are the rebels, the degenerates, and the misfits.<br />
                The connectors, the inventors, and the innovators.<br />
                We steer the ship of current culture.<br />
                <br />
                Cre8ors are inclusive. We speak to people from all walks of life.<br />
                Cre8ors are mindful. We care about and respect people’s feelings.<br />
                Cre8ors are transparent. We condemn any shadiness or ulterior motives.<br />
                Cre8ors are accountable. We fuck up and take responsibility for it. <br />
                Cre8ors are advocates. We support each others mental health.
                <br />
                Cre8ors are fearless. We are not afraid to speak our minds.<br />
                Cre8ors have empathy. We will walk a mile in any shoe.<br />
                <br />
                Together, we will band together...<br />
                And restore the hues of creativity,<br />
                To bring color back to web3.<br />
                <br />
                In a world filled with kaleidoscopic possibilities,<br />
                Will you choose to stay in the black and white?<br />
                Or join us and break free... <br />
              `,
                )
                .pauseFor(100)
                .start()
                .callFunction(() => {
                  setIsTypingEnded(true)
                })
            }}
            options={{
              autoStart: true,
              loop: false,
              delay: 30,
            }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default ManifestoPage
