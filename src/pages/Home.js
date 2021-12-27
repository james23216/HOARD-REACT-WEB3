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

function Home() {
  const [showModal, setShowModal] = useState(false); 
  const [selectToken, setSelectToken] = useState({});
  const common = useSelector((state) => state.common); 

  const [pageIndex, setPageIndex] = useState(1);

  const [count, setCount] = useState(30);

  const [products, setProducts] = useState([]);

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

  const filterProduct = (keyword) => {
    let tProducts = _.filter(metadata, (o) => parseInt(o.incrementNumberCoin) === parseInt(keyword));
    setProducts([...tProducts]);
  }

  useEffect(() => {
    fetchMoreData();
  }, []);

  useEffect(() => {
    searchProduct(common.keyword);
  }, [common.keyword]);

  const fetchMoreData = () => {
    if (common.keyword === '') {
      setProducts([...products, ...metadata.slice((pageIndex - 1) * count, pageIndex * count)]);
    } else {
      filterProduct(common.keyword);
    }
    setPageIndex(pageIndex + 1);
  }

  const searchProduct = (keyword) => {
    if (keyword === '') { 
      setProducts([...metadata.slice((pageIndex - 1) * count, pageIndex * count)]);
    } else { 
      if (metadata && metadata.length > 0) {
        filterProduct(keyword);
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
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    loadTokenData(index);
                }}
                />
            ))
            }
        </div>
        </InfiniteScroll>        
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
      </>
  )
}

export default Home;