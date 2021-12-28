import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";

import _ from 'lodash';
import chunk from 'lodash/chunk';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from "react-redux";
import { loadMetaData } from '../redux/common/commonActions';

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

  const dispatch = useDispatch();

  const loadTokenData = (idx) => {
    if (common.metaData && common.metaData.length > 0) {
      setSelectToken(common.metaData[idx]);
    }
    setShowModal(true);
  }

  const closeModal = () => { 
    setShowModal(false);
    setSelectToken({});
  }

  const filterProduct = (keyword) => {
    let tProducts = _.filter(common.metaData, (o) => parseInt(o.incrementNumberCoin) === parseInt(keyword));
    setProducts([...tProducts]);
  }

  useEffect(() => {
    dispatch(loadMetaData());
  }, []);

  useEffect(() => {
    searchProduct(common.keyword);
  }, [common.keyword]);

  useEffect(() => {
    fetchMoreData();
    console.log('loaded metadata: ', common.metaData);
  }, [common.metaData]);

  const fetchMoreData = () => {
    if (common.keyword === '') {
      let metaData = Object.assign([], common.metaData);
      setProducts([...products, ...metaData.slice((pageIndex - 1) * count, pageIndex * count)]);
    } else {
      filterProduct(common.keyword);
    }
    setPageIndex(pageIndex + 1);
  }

  const searchProduct = (keyword) => {
    if (keyword === '') { 
      setProducts([...common.metaData.slice((pageIndex - 1) * count, pageIndex * count)]);
    } else { 
      if (common.metaData && common.metaData.length > 0) {
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
                src={image.word_press_path_and_name}
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
            <StyledSelectTokenImg alt={selectToken.incrementNumberCoin} src={selectToken.word_press_path_and_name} />
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