import React, { useEffect, useState } from "react";
import { Link } from 'react-router';
import * as s from "../styles/globalStyles";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Router, browserHistory } from 'react-router';
import { saveKeyword } from '../redux/common/commonActions';

export const StyledLogo = styled.img`
  position: relative;
  width: 25%;
  transition: width 0.5s;
  margin-left: 0%;
  cursor: pointer;
  @media (min-width: 768px) {
    width: 17%;
    margin-left: -1%
  }
`;

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
  z-index: 99999;
  width: 100%
`;

export const StyledButtonGroup = styled.div`
  position: relative;  
  display: none;
  @media (min-width: 768px) {
    display: flex;
    width: 33%;
  }
  @media (min-width: 1065px) {
    display: flex;
    width: 29%;
  }

`;

export const StyledIntroLink = styled.div`
  color: var(--secondary-text);
  text-decoration: none;
  width: 48%;
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
  justify-content: space-between;
  align-items: center;
  display: none;
  width: 28%;
  @media (min-width: 768px) {
    display: flex;
  }
`;

export const StyledLink = styled.a`
  color: var(--secondary-text);
  font-size: 30px;
  text-decoration: none;
`;

export const StyledScanInput = styled.input`
  width: 65%;
  color: black;
  margin-left: 10px;
  padding: 1px;
  @media (max-width: 450px) {
    width: 50%;
  }
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
  position: fixed;  
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
  margin-top: 5%;
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

export const StyledWalletButton = styled.div`
  border: 1px solid white;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 13px;
  color: var(--primary-text);
  width: 76%;
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
  @media (min-width:768px) and (max-width: 1068px) {
    width: 65%;
  }
  @media (max-width: 768px) {
    width: 50%;
    margin-top: 5%;
  }
`;

export const StyledWalletInput = styled.input`
  width: 85%;
  color: black;
  margin-left: 10px;
  padding: 1px;
`;

const Navbar = (props) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("-200%");
  const [keyword, setKeyword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const handleScanInput = (e) => {
    setKeyword(e.target.value);
    dispatch(saveKeyword(
      {
        keyword: e.target.value,
        walletAddress
      }
    ));
  }

  const handleWalletInput = (e) => { 
    setWalletAddress(e.target.value);
    dispatch(saveKeyword(
      {
        keyword,
        walletAddress: e.target.value
      }
    ));
  }

    return (
        <>
          <StyledHeader>
            <StyledButtonGroup>
              <s.Container
                fd={"row"}
                jc={"space-between"}
              >
                <StyledIntroLink>
                  <StyledRoundButton>
                    <Link to="/introduction" target={"_blank"} className="white">
                      INSTRUCTIONS
                    </Link>
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
                  // browserHistory.push('/http://hoardtoken.com/');
                  window.open(
                    'http://hoardtoken.com/',
                    '_blank'
                  )
              }} 
            />
            
            <StyledIconGroup>
              <StyledWalletButton>
                WALLET
                <StyledWalletInput
                  onChange={(e) => handleWalletInput(e)}
                />
              </StyledWalletButton>
              <StyledLink 
                  target={"_blank"} 
                  href="https://t.me/HOARDTOKEN"
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
                <StyledMenuImg alt={"menu"} onClick={() => setStatus("-2%")} src={"/images/icon_menu.png"}></StyledMenuImg>
            </StyledMenuIcon>
          </StyledHeader>
          <StyledMyNavSide style={{ top: status }}>   
            <StyledMyNavSideDiv>       
              <StyledMobileButtonGroup>
                <s.Container
                  fd={"row"}
                  jc={"space-between"}
                >
                  <StyledIntroLink>
                    <StyledRoundButton>
                      <Link to="/introduction" target={"_blank"} className="white">
                        INSTRUCTIONS
                      </Link>
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
              <StyledWalletButton>
                WALLET
                <StyledWalletInput
                  onChange={(e) => handleWalletInput(e)}
                />
              </StyledWalletButton>
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
        </>   
    )
}

export default Navbar;