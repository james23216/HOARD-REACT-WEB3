import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import { Router, browserHistory } from 'react-router';

function Introduction() {
    return (
      <div className="intro-section">
        
        <div className="text-center text-white w-full md:w-3/5 mt-3">                   
          <div className="text-wrap font-bold text-6xl">
            About
          </div>
          <div className="text-wrap font-bold text-3xl mt-2">
            THE HOARD COLLECTION CONSISTS OF 10,000 UNIQUE NFT HOARD COINS INFLUENCED BY SEVERAL HISTORICAL ERA'S.
          </div>
          <div className="video">
            <iframe
              src="https://www.youtube.com/embed/-qi8JiID0eU">
            </iframe>
          </div>          
          <div className="text-wrap font-bold text-3xl mt-8">
            INSTRUCTIONS
          </div>
          <div className="text-wrap font-bold text-3xl mt-1 opacity-90 hoard-coin">
            HOARD YOUR COINS
          </div>
          <div className="text-wrap font-bold text-xl mt-2 text-left">
            HOARD WALLET ADDRESS:
          </div>
          <div className="text-wrap mt-1 text-lg text-left line-height">
            You can reserve your HOARD by sending XRD (Radix Tokens) to the HOARD WALLET address below.
          </div>
          <div className="text-wrap wallet-addr text-lg text-left font-bold w-full">
            rdx1qsp5hfmupgdgxa3akxtyl0thaudzu4zj4547znru58kg09tkdtz6qjg35gf0e
          </div>
          <div className="text-wrap font-bold text-xl mt-4 text-left">
            EACH HOARD TOKEN IS 25 XRD:
          </div>
          <div className="text-wrap mt-1 text-lg text-left line-height">
            Add a note matching the units you have purchased. (DO NOT ENCRYPT)
          </div>
          <div className="text-wrap font-bold text-xl mt-4 text-left ">
            HOARD TOKEN/S WILL BE SENT BACK TO YOUR WALLET IN RETURN:
          </div>
          <div className="text-wrap mt-1 text-lg text-left line-height">
            This is currently a manual process right now, please be patient.
          </div>
          <div className="text-wrap font-bold text-xl mt-4 text-left">
            FIND US HERE FOR VERIFICATION:
          </div>
          <div className="text-wrap wallet-addr mt-1 text-lg text-left line-height">
            <a 
              href="https://explorer.radixdlt.com/#/accounts/rdx1qsp5hfmupgdgxa3akxtyl0thaudzu4zj4547znru58kg09tkdtz6qjg35gf0e"
              target="_blank"
              style={{ cursor: 'pointer' }}
              className="text-wrap"
            >
              https://explorer.radixdlt.com/#/accounts/rdx1qsp5hfmupgdgxa3akxtyl0thaudzu4zj4547znru58kg09tkdtz6qjg35gf0e
            </a>
          </div>
          <div className="text-wrap font-bold text-xl mt-4 text-left">
            USE THE OFFICIAL WALLET HERE:
          </div>
          <div className="text-wrap wallet-addr mt-1 text-lg  text-left line-height">
            <a
              href="https://wallet.radixdlt.com/"
              target="_blank"
              style={{ cursor: 'pointer' }}
            >
              https://wallet.radixdlt.com/
            </a>            
          </div>
          <div className="text-wrap mt-4 text-xl text-left font-bold ">
            ONLY USE RADIX'S NATIVE TOKEN (XRD):
          </div>
          <div className="text-wrap mt-1 text-lg  text-left line-height">
            The official Radix Wallet does NOT except ethereum wrapped Radix Tokens (EXRD).
          </div>
          <div className="text-wrap wallet-addr text-lg text-left">
            <a
              href="https://learn.radixdlt.com/article/how-can-i-purchase-xrd-and-exrd-tokens"
              target="_blank"
              style={{ cursor: 'pointer' }}
            >
              https://learn.radixdlt.com/article/how-can-i-purchase-xrd-and-exrd-tokens
            </a>
            
          </div>
          <div className="text-wrap font-bold text-3xl mt-8">
            TRADING
          </div>
          <div className="text-wrap font-bold text-lg mt-2">
            THE HOARD COLLECTION CONSISTS OF 10,000 UNIQUE HOARD COINS INFLUENCED BY SEVERAL HISTORICAL ERA'S.
          </div>
          <div className="text-wrap wallet-addr font-bold text-lg mt-1">
            You both negotiate the transaction through the HOARD wallet ONLY as we have to change the reserve list which will be reflected on the website: rdx1qsp5hfmupgdgxa3akxtyl0thaudzu4zj4547znru58kg09tkdtz6qjg35gf0e 
          </div>
          <div className="text-wrap font-bold text-lg mt-1">
            Please do not encrypt or we will not be able to see the negociation. 
          </div>
          <div className="text-wrap mt-4 text-xl text-left font-bold ">
            SWAP A TOKEN:
          </div>
          <div className="text-wrap mt-1 text-lg  text-left line-height">
            The Transaction should include 'swap' in the notes.
          </div>
          <div className="text-wrap text-lg  text-left">
            The 'swap' OF A HOARD TOKEN is swapping like for like.
          </div>
          <div className="text-wrap text-lg  text-left">
            If this is a one for one swap, then you just need to add the minimum 10 xrd (from each wallet - 20 in total) trading fee and a note saying "swap".
          </div>
          <div className="text-wrap mt-4 text-xl text-left font-bold">
            An Example of swapping a HOARD token could be:
          </div>
          <div className="text-wrap mt-1 text-lg  text-left line-height">
            Hoard Member 1 : Swap 00001 for 10000 Trading fee 10 xrd
          </div>
          <div className="text-wrap text-lg  text-left">
            Hoard Member 2 : Swap 10000 for 00001 Trading fee 10 xrd
          </div>
          <div className="text-wrap text-lg  text-left">
            The Hoard Tokens can stay in your wallets as its a 1-1 'swap'
          </div>
          <div className="text-wrap text-lg  text-left">
            We will then change the database to reflect the swap once we have a pair.
          </div>
          <div className="text-wrap mt-4 text-xl text-left font-bold ">
            SALE (sell a token):
          </div>
          <div className="text-wrap mt-1 text-lg  text-left line-height">
            The 'sell' is selling the coin/s and the 'buy' is buying the coins. 
          </div>
          <div className="text-wrap text-lg  text-left">
            How is this processed?
          </div>
          <div className="text-wrap mt-4 text-xl text-left font-bold">
            An Example of selling a HOARD token could be:
          </div>
          <div className="text-wrap mt-3 text-xl text-left font-bold">
            Hoard Member 1 wants to buy a HOARD token from Hoard Member 2 for 200 XRD they would add in the notes as follows: 
          </div>
          <div className="text-wrap mt-1 text-lg  text-left line-height">
            Hoard Member 1 : Sell 00001 for 200 xrd - you send 8 HOARD Tokens to our wallet address 
          </div>
          <div className="text-wrap wallet-addr text-lg  text-left">
            rdx1qsp5hfmupgdgxa3akxtyl0thaudzu4zj4547znru58kg09tkdtz6qjg35gf0e
          </div>
          <div className="text-wrap text-lg  text-left">
            Hoard Member 2 : Buy  00001 for 200 xrd - you send 200 xrd to our wallet address (above) we send HOARD 1 the 200 XRD less or 10% (20 xrd) then you recieve 8 HOARD Tokens.
          </div>
          <div className="text-wrap text-lg  text-left">
            If multiple tokens are swapped add a comma after each token numeric 00001,00002,00003.
          </div>
          <div className="text-wrap text-lg  text-left">
            The database will then be updated to reflect this.
          </div>
          <div className="text-wrap font-bold text-3xl mt-8">
            DISCLAIMER
          </div>
          <div className="text-wrap wallet-addr font-bold text-lg mt-2">
            The Hoard Team will NOT be held responsible if your transactions are incorrect. Please make sure our address is accurate (see below). You are advised to NOT use any ethereum wallets for sending XRD tokens to us. Wallet address here: rdx1qsp5hfmupgdgxa3akxtyl0thaudzu4zj4547znru58kg09tkdtz6qjg35gf0e
          </div>
          <div className="text-wrap mt-4 text-xl text-left font-bold ">
            REACH US:
          </div>
          <div className="text-wrap wallet-addr mt-1 text-lg text-left line-height">
            TELEGRAM : <a href="https://t.me/HOARDTOKEN" target="_blank" style={{ cursor: 'pointer' }}>https://t.me/HOARDTOKEN</a>
          </div>
          <div className="text-wrap wallet-addr text-lg  text-left">
            TWITTER  : <a href="https://twitter.com/HOARDTOKEN" target="_blank" style={{ cursor: 'pointer' }}>https://twitter.com/HOARDTOKEN</a>
          </div>
          <div className="text-wrap wallet-addr text-lg  text-left">
            EMAIL : <a href="mail@hoardtoken.com" target="_blank" style={{ cursor: 'pointer' }}>mail@hoardtoken.com</a>
          </div>
          <div className="text-wrap wallet-addr text-lg  text-left">
            YOUTUBE : <a href="https://www.youtube.com/channel/UCm1QkEe5IYGXHkziEeNoNuQ" target="_blank" style={{ cursor: 'pointer' }}>https://www.youtube.com/channel/UCm1QkEe5IYGXHkziEeNoNuQ</a>
          </div>
          <div className="text-wrap font-bold text-3xl mt-4 opacity-90 hoard-coin">
            ON RADIX DLT
          </div>
        </div>
        <div 
          className="previous-icon"
          onClick={() => {
            browserHistory.push('/');
          }}>
          <i 
            className="fas fa-long-arrow-alt-left" 
            style={{ cursor: 'pointer' }}
          >            
          </i>&nbsp;
          Token List
        </div> 
      </div>
        
    )
}

export default Introduction;