import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import "@material-tailwind/react/tailwind.css";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

import { metadata } from "./utils/metadata";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledHeader = styled.div`
  position: fixed;
  padding: 10px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #000;
  z-index: 99999
`;

export const StyledLogo = styled.img`
  position: relative;
  width: 25%;
  transition: width 0.5s;
  margin-left: 0%;
  @media (min-width: 768px) {
    width: 17%;
    margin-left: -13%
  }
`;

export const StyledButtonGroup = styled.div`
  position: relative;  
  display: none;
  @media (min-width: 768px) {
    display: flex;
    width: 40%;
  }
  @media (min-width: 1065px) {
    display: flex;
    width: 25%;
  }
`;

export const StyledRoundButton = styled.button`
  border: 1px solid white;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 13px;
  color: var(--primary-text);
  width: 100%;
  height: 38px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 5px 2px 0px rgb(250 250 250);
  -webkit-box-shadow: 4px 5px 2px 0px rgb(250 250 250);
  -moz-box-shadow: 4px 5px 2px 0px rgb(250 250 250);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledIconGroup = styled.div`
  position: relative;  
  justify-content: center;
  align-items: center;
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const StyledIntroLink = styled.a`
  color: var(--secondary-text);
  text-decoration: none;
  width: 48%;
`;

export const StyledLink = styled.a`
  color: var(--secondary-text);
  font-size: 30px;
  text-decoration: none;
`;

export const StyledScanInput = styled.input`
  width: 55%;
  color: black;
  margin-left: 10px;
  padding: 2px;
`;

export const StyledMenuIcon = styled.div`
  position: relative;
  display: block;
  width: 7%;
  line-height: 0.5;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const StyledMenuImg = styled.img`
  position: relative;
  width: 100%;
  transition: width 0.5s;
`;

export const StyledMyNavSide = styled.div`
  position: absolute;
  z-index: 3000000;
  height: 100%;
  width: 100vw;
  opacity: 1;
  top: -200%;
  left: auto;
  right: 0;
  background: rgba(0,0,0,0.8);
  overflow-x: hidden;
  transition: 0.3s;
  @media (min-width: 768px) {
    top: -200%;
  }
`;

export const StyledMyNavSideDiv = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledMobileButtonGroup = styled.div`
  position: relative;  
  width: 80%;
  display: flex;
  @media (min-width: 768px) {
    display: none
  }
`;

export const StyledMobileIconGroup = styled.div`
  position: relative;  
  justify-content: space-around;
  align-items: center;
  display: flex;
  width: 60%;
  margin-top: 8%;
  @media (min-width: 768px) {
    display: none;
    margin-top: 0%;
  }
`;

export const StyledMobileClose = styled.p`
  color: white;
  font-size: 50px
`;

export const StyledTokenImgSection = styled.div`
  position: relative;
  margin-top: 7%;
  display: flex;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%
`;

export const StyledTokenImg  = styled.img`
  position: relative;
  -ms-flex: 0 0 14%;
  flex: 0 0 14%;
  max-width: 14%;
  cursor: pointer
`;

function App() {
  const [status, setStatus] = useState("-200%");
  const [showModal, setShowModal] = useState(true); 

  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 20) {
      newMintAmount = 20;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  const loadTokenData = (index) => {
    
    setShowModal(true);
  }

  const closeModal = () => { 
    setShowModal(false);
}

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  console.log("metadata======", metadata)

  let tempMeta = metadata.slice(0, 100);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        fd={"row"}
        style={{ padding: 10, backgroundColor: "var(--primary)" }}
      >
        <StyledHeader>
          <StyledButtonGroup>
            <s.Container
              fd={"row"}
              jc={"space-between"}
            >
              <StyledIntroLink 
                target={"_blank"} 
                href=""
              >
                <StyledRoundButton>
                  INSTRUCTIONS
                </StyledRoundButton>
              </StyledIntroLink>
              <StyledRoundButton style={{ width: '48%', padding: '10px 1px' }}>
                SCAN
                <StyledScanInput 
                  type="number"
                />
              </StyledRoundButton>
            </s.Container>
          </StyledButtonGroup>        
          <StyledLogo alt={"example"} src={"/images/HoardToken.png"} />
          <StyledIconGroup>
            <StyledLink 
              target={"_blank"} 
              href="https://t.me/HOARDTOKEN"
              style={{ marginRight: '8px' }}
            >
              <i className="fab fa-telegram"></i>
            </StyledLink>
            <StyledLink 
              target={"_blank"} 
              href="https://twitter.com/HOARDTOKEN"
            >
              <i className="fab fa-twitter"></i>
            </StyledLink>          
          </StyledIconGroup>
          <StyledMenuIcon>
            <StyledMenuImg alt={"menu"} onClick={() => setStatus("0%")} src={"/images/icon_menu.png"}></StyledMenuImg>
          </StyledMenuIcon>
        </StyledHeader>
       
        <StyledTokenImgSection>
          { 
            tempMeta && tempMeta.map((o, idx) => {
              return (
                <StyledTokenImg 
                  alt={`Hoard Token ${ idx }`} 
                  key={idx} 
                  src={o.wordPressPathAndName} 
                  onClick={(idx) => {
                      loadTokenData(idx);
                    }
                  }
                />             
              );
            }) 
          }         
        </StyledTokenImgSection>
        <StyledMyNavSide style={{ top: status }}>   
          <StyledMyNavSideDiv>       
            <StyledMobileButtonGroup>
              <s.Container
                fd={"row"}
                jc={"space-between"}
              >
                <StyledIntroLink 
                  target={"_blank"} 
                  href=""
                >
                  <StyledRoundButton>
                    INSTRUCTIONS
                  </StyledRoundButton>
                </StyledIntroLink>
                <StyledRoundButton style={{ width: '48%', padding: '10px 1px' }}>
                  SCAN
                  <StyledScanInput 
                    type="number"
                  />
                </StyledRoundButton>
              </s.Container>
            </StyledMobileButtonGroup>  
            <StyledMobileIconGroup>
              <StyledLink 
                target={"_blank"} 
                href="https://t.me/HOARDTOKEN"
                style={{ marginRight: '8px' }}
              >
                <i className="fab fa-telegram"></i>
              </StyledLink>
              <StyledLink 
                target={"_blank"} 
                href="https://twitter.com/HOARDTOKEN"
              >
                <i className="fab fa-twitter"></i>
              </StyledLink>          
            </StyledMobileIconGroup>
            <StyledMobileClose onClick={() => setStatus("-200%")}>&times;</StyledMobileClose>     
          </StyledMyNavSideDiv>    
        </StyledMyNavSide>  
        
      </s.Container>
      <Modal size="md" active={showModal} toggler={() => closeModal()}>
        <ModalHeader toggler={() => closeModal()}>
            You will get a free T-Shirt
        </ModalHeader>
        <ModalBody>      
          asdf
        </ModalBody>
        <ModalFooter>
            <Button 
                color="red"
                buttonType="link"
                onClick={() => closeModal()}
                ripple="dark"
            >
                Close
            </Button>                                    
            <Button
                color="green"
                type="submit"
                
                ripple="light"
            >
                Save Changes
            </Button>
        </ModalFooter>
      </Modal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="grid grid-cols-2 text-red-100 red">
          asdf
        </div>
      </div>
    </s.Screen>
  );
}

export default App;
