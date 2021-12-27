import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

function Introduction() {
    return (
        <div className="pt-10 text-center text-white w-full md:w-3/5">
          <ScrollAnimation 
            animateIn="animate__fadeInUp" 
            animateOut="animate_fadeOut"
            className="animation"
          >
            <div className="font-bold text-6xl">
              About
            </div>
            <div className="font-bold text-3xl mt-2">
              10,000 unique pixelart scorpions
            </div>
            <div className="mt-5 text-lg">
              This is an NFT project I never finished for a different ledger tech, hence the "abandoned" scorpions name. Writing smart contracts for the tech in question was too hard, and I'm lazy and would rather be making art.
            </div>
            <div className="mt-5 text-lg">
              After getting really into Radix I decided it might be worth it to release them on that platform instead.
            </div>
            <div className="mt-5 text-lg">
              While you're here please check out my other project, Radical Strikers, which is a game that will feature NFT items built on Radix.
            </div>
          </ScrollAnimation>         
          <ScrollAnimation 
              animateIn="animate__fadeInUp" 
              animateOut="animate_fadeOut"
              className="animation"
            >
            <div className="font-bold text-3xl mt-5">
              Instructions
            </div>
            <div className="mt-3 text-lg">
              Include the "#" sign followed by the full scorpion numbers, including leading 0s, in the transaction message (eg. "# 0012, 0123"), unencrypted. Please lookup the numbers you are reserving to make sure they are not reserved already. These instructions are very important! If not followed exactly, your funds will be sent back, subject to -1 XRD to cover transaction fees.
            </div>
            <div className="mt-3 text-lg">
              You will receive a SCORP token for each that will be convertible to the NFT when Radix Babylon launches.
            </div>
          </ScrollAnimation>
          <ScrollAnimation 
            animateIn="animate__fadeInLeft" 
            animateOut="animate_fadeOutRight"
            className="animation"
          >
            <div className="font-bold text-3xl mt-5">
              Trading
            </div>
            <div className="mt-3 text-lg">
              Trading is handled manually for now. Trades are subject to a 10% royalty fee (minimum 10 xrd). The process is as follows:
            </div>
            <div className="mt-3 text-lg">
              Make sure both parties agree to the terms ahead of sending anything anywhere.
            </div>
            <div className="mt-3 text-lg">
              Send the XRD or SCORP you are trading to the Abandoned Scorpions wallet address above. NOT each others' wallets!
            </div>
            <div className="mt-3 text-lg">
              If there is no XRD being traded, please send an additional transaction with the 10 xrd trading fee from either wallet with the message "trading fee".
            </div>
            <div className="mt-3 text-lg">
              If there is a match there, the trade will be finalized the next time I process the trade requests. The recipient would receive 70 xrd (80 - 10 trading fee), and you would recieve 2 SCORP tokens. The database will be updated to reflect the new ownership. If you wish to cancel a pending trade, please get in touch via telegram or email.
            </div>
          </ScrollAnimation> 
          <div className="font-bold text-3xl mt-5">
            Policy
          </div>
          <div className="mt-3 text-lg">
            Please be sure to read the policy page for specifics on how the reservations work and more.
          </div>
        </div>
    )
}

export default Introduction;