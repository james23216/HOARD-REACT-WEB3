import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";

import _ from 'lodash';
import chunk from 'lodash/chunk';
import { metadata } from "../utils/metadata";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from "react-redux";


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
  width: 72%;

`;

export const StyledSelectTokenNumber = styled.p`
  color: #fff;
  font-size: 18px;
  line-height: 1
`;

export const StyledSelectTokenStatus = styled.p`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  line-height: 1;
  margin-top: 3%
`;

export const StyledSelectTokenDetailBlock = styled.div`
  color: #fff;
  font-size: 15px;
  width: 100%;
  display: flex;
  margin-top: 15%;
`;

export const StyledSelectTokenDetailLeft = styled.div`
  width: 40%;
  text-align: left;
  @media (min-width: 768px) {
    padding-left: 10%;
  }
`;

export const StyledSelectTokenDetailRight = styled.div`
  width: 60%;
  text-align: left; 
`;

export const StyledSelectTokenDetailFound = styled.p`
  line-height: 1.5
`;

const originalMetaData = metadata.map(o => {
  let wordPressPathAndName = '';

  if (o.wordPressPathAndName && o.wordPressPathAndName.includes("http://hoardtoken.com")) {
    let pathArray = o.wordPressPathAndName.split("http://hoardtoken.com")[1];
    wordPressPathAndName = "http://www.cryptohoard.io" + pathArray;
  }

  return {
    ...o,
    wordPressPathAndName
  };
});

function Home() {
  const [showModal, setShowModal] = useState(false); 
  const [selectToken, setSelectToken] = useState({});
  const common = useSelector((state) => state.common); 

  const [pageIndex, setPageIndex] = useState(1);

  const [count, setCount] = useState(30);

  const [products, setProducts] = useState([]);

  const loadTokenData = (idx) => {
    if (originalMetaData && originalMetaData.length > 0) {
      setSelectToken(originalMetaData[idx]);
    }
    setShowModal(true);
  }

  const closeModal = () => { 
    setShowModal(false);
    setSelectToken({});
  }

  const filterProduct = (keyword, walletAddress) => {  console.log("filterProduct", keyword, walletAddress)
    let tProducts = [];
    if (walletAddress === '' || walletAddress === undefined) {
      tProducts = _.filter(originalMetaData, (o) => parseInt(o.incrementNumberCoin) === parseInt(keyword));
    } else if (keyword === '' || keyword === undefined) {
      tProducts = _.filter(originalMetaData, (o) => parseInt(o.purchaserWallet) === parseInt(walletAddress));
    } else { console.log("filerbot", keyword, walletAddress)
      tProducts = _.filter(originalMetaData, (o) => parseInt(o.incrementNumberCoin) === parseInt(keyword) && parseInt(o.purchaserWallet) === parseInt(walletAddress));
    }
     
    setProducts([...tProducts]);
  }

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {  console.log("useEffect", common.keyword, common.walletAddress)
    searchProduct(common.keyword, common.walletAddress);
  }, [common.keyword, common.walletAddress]);

  const fetchMoreData = () => {
    if (common.keyword === '' && common.walletAddress === '') {
      setProducts([...products, ...originalMetaData.slice((pageIndex - 1) * count, pageIndex * count)]);
    } else {
      filterProduct(common.keyword, common.walletAddress);
    }
    setPageIndex(pageIndex + 1);
  }

  const searchProduct = (keyword, walletAddress) => {
    if (keyword === '' && walletAddress === '') { 
      setProducts([...originalMetaData.slice((pageIndex - 1) * count, pageIndex * count)]);
    } else { 
      if (originalMetaData && originalMetaData.length > 0) {
        filterProduct(keyword, walletAddress);
        window.scrollTo(0,0);
      }
    }
  }

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://via.placeholder.com/400';
  }

  return (
      <>
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
                  style={{ cursor: 'pointer !important' }}
                  onClick={() => {
                      loadTokenData(index);
                }}
                />
            ))
            }
        </div>
        </InfiniteScroll>        
        <Modal size="regular" style={{ width: '100% !important' }} active={showModal} toggler={() => closeModal()}>     
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
                  <StyledSelectTokenDetailFound>{selectToken.whereTheyFoundIt}</StyledSelectTokenDetailFound> 
                  <StyledSelectTokenDetailFound>{selectToken.whenTheyFoundItMonth}&nbsp;{selectToken.whenTheyFoundItDay}&nbsp;{selectToken.whenTheyFoundItYear}</StyledSelectTokenDetailFound>                
                  <StyledSelectTokenDetailFound>{selectToken.ad}&nbsp;{selectToken.coinageOfCoin}</StyledSelectTokenDetailFound>                
                  <StyledSelectTokenDetailFound>{selectToken.metal}</StyledSelectTokenDetailFound>      
                  </StyledSelectTokenDetailRight>                              
              </StyledSelectTokenDetailBlock>
              </StyledSelectTokenGroup>
          </ModalBody>
        </Modal>
      </>
  )
}

export default Home;