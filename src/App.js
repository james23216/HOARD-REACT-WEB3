import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";

import _ from 'lodash';
import chunk from 'lodash/chunk';

import { metadata } from "./utils/metadata";
import InfiniteScroll from 'react-infinite-scroll-component';

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
  cursor: pointer;
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
  padding: 1px;
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
  margin-top: 13%;
  display: flex;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  @media (min-width: 768px) {
    margin-top: 7%;
  }
`;

export const StyledTokenImg  = styled.img`
  position: relative;
  -ms-flex: 0 0 14%;
  flex: 0 0 14%;
  max-width: 14%;
  cursor: pointer
`;

export const StyledSelectTokenGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledSelectTokenImg = styled.img`
  position: relative;
  width: 40%;

`;

export const StyledSelectTokenNumber = styled.p`
  color: #000;
  font-size: 18px;
  line-height: 1
`;

export const StyledSelectTokenStatus = styled.p`
  color: #000;
  font-size: 25px;
  font-weight: bold;
  line-height: 1;
  margin-top: 2%
`;

export const StyledSelectTokenDetailBlock = styled.div`
  color: #000;
  font-size: 15px;
  width: 80%;
  display: flex;
  margin-top: 5%
`;

export const StyledSelectTokenDetailLeft = styled.div`
  width: 50%;
  text-align: left;
`;

export const StyledSelectTokenDetailRight = styled.div`
  width: 50%;
  text-align: left;  
`;

export const StyledSelectTokenDetailFound = styled.p`
  line-height: 1.5
`;

function App() {
  const [status, setStatus] = useState("-200%");
  const [showModal, setShowModal] = useState(false); 
  const [metaJson, setMetaJson] = useState([]); 
  const [selectToken, setSelectToken] = useState({}); 
  const [scanToken, setScanToken] = useState(''); 

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

  const [pageIndex, setPageIndex] = useState(1);

  const [count, setCount] = useState(30);

  const [products, setProducts] = useState([]);

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

  const loadTokenData = (idx) => {
    if (metadata && metadata.length > 0) {
      setSelectToken(metadata[idx]);
    }
    setShowModal(true);
  }

  const closeModal = () => { 
    setShowModal(false);
    setSelectToken({});
  }

  const handleScanInput = (e) => {
    if (e.target.value === '') {      
      setScanToken('');
      setProducts([...metadata.slice((pageIndex - 1) * count, pageIndex * count)]);
    } else { 
      setScanToken(e.target.value);
      if (metadata && metadata.length > 0) {
        filterProduct(e.target.value);
        window.scrollTo(0,0);
      }
    }
  }

  const filterProduct = (keyword) => {
    let tProducts = _.filter(metadata, (o) => parseInt(o.incrementNumberCoin) === parseInt(keyword));
    setProducts([...tProducts]);
  }

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  useEffect(() => {
    fetchMoreData();
  }, [])

  const fetchMoreData = () => {
    if (scanToken === '') {
      setProducts([...products, ...metadata.slice((pageIndex - 1) * count, pageIndex * count)]);
    } else {
      filterProduct(scanToken);
    }
    setPageIndex(pageIndex + 1);
  }

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://via.placeholder.com/400';
  }

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
                  onChange={(e) => handleScanInput(e)}
                />
              </StyledRoundButton>
            </s.Container>
          </StyledButtonGroup>        
          <StyledLogo 
            alt={"example"} 
            src={"/images/HoardToken.png"}
            onClick={() => {
              window.scrollTo(0,0);
            }} 
          />
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
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={true}
        >
          <div className="photos">
            {
              products.map((image, index) => (
                <img
                  onError={addDefaultSrc}
                  alt={`Hoard Token ${ index }`} 
                  className="img"
                  src={image.wordPressPathAndName}
                  key={index}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    loadTokenData(index);
                  }}
                />
              ))
            }
          </div>
        </InfiniteScroll>
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
                    onChange={(e) => handleScanInput(e)}
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
        <Modal size="regular" style={{ width: '100% !important' }} active={showModal} toggler={() => closeModal()}>
          <ModalHeader toggler={() => closeModal()}>
              This is a Hoard Token
          </ModalHeader>
          <ModalBody>      
            <StyledSelectTokenGroup>
              <StyledSelectTokenImg alt={selectToken.incrementNumberCoin} src={selectToken.wordPressPathAndName} />
              <StyledSelectTokenNumber>HOARD {selectToken.incrementNumberCoin}</StyledSelectTokenNumber>
              <StyledSelectTokenStatus>AVAILABLE</StyledSelectTokenStatus>
              <StyledSelectTokenDetailBlock>
                <StyledSelectTokenDetailLeft>
                  <StyledSelectTokenDetailFound>Found By:</StyledSelectTokenDetailFound> 
                  <StyledSelectTokenDetailFound>Where:</StyledSelectTokenDetailFound> 
                  <StyledSelectTokenDetailFound>Date:</StyledSelectTokenDetailFound>                
                  <StyledSelectTokenDetailFound>Coin Age:</StyledSelectTokenDetailFound>                
                  <StyledSelectTokenDetailFound>Metal:</StyledSelectTokenDetailFound>                
                </StyledSelectTokenDetailLeft>
                <StyledSelectTokenDetailRight>
                  <StyledSelectTokenDetailFound>{selectToken.firstname} / {selectToken.surname}</StyledSelectTokenDetailFound> 
                  <StyledSelectTokenDetailFound>Country</StyledSelectTokenDetailFound> 
                  <StyledSelectTokenDetailFound>{selectToken.whenTheyFoundItMonth}&nbsp;{selectToken.whenTheyFoundItDay}&nbsp;{selectToken.whenTheyFoundItYear}</StyledSelectTokenDetailFound>                
                  <StyledSelectTokenDetailFound>{selectToken.coinageOfCoin}</StyledSelectTokenDetailFound>                
                  <StyledSelectTokenDetailFound>{selectToken.metal}</StyledSelectTokenDetailFound>      
                </StyledSelectTokenDetailRight>                              
              </StyledSelectTokenDetailBlock>
            </StyledSelectTokenGroup>
          </ModalBody>
        </Modal>
      </s.Container>
    </s.Screen>
  );
}

export default App;
