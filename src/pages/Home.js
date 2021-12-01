import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import _ from 'lodash';
import chunk from 'lodash/chunk';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from "react-redux";
import { 
  loadMetaData,
  doSearch
} from '../redux/common/commonActions';


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
  margin-top: 3%;
  text-align: center;
  font-size: 22px
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

function Home() {
  const [showModal, setShowModal] = useState(false); 
  const [chosenTokenId, setChosenTokenId] = useState(''); 
  const [selectToken, setSelectToken] = useState({});
  const common = useSelector((state) => state.common); 

  const [pageIndex, setPageIndex] = useState(1);

  const [count, setCount] = useState(30);

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  const loadTokenData = (value) => {
    dispatch(loadMetaData());
    setChosenTokenId(value);
    setShowModal(true);
  }

  const closeModal = () => { 
    setShowModal(false);
    setSelectToken({});
  }

  const filterProduct = (type) => { 
    let tProducts = [];
    let metaData = Object.assign([], common.metaData);
    
    console.log('metadata2: ', metaData);

    tProducts = _.filter(metaData, (o) => {
      let isMatched = true;
      if (common.searchOptions.coinType !== '') {
        isMatched = isMatched && common.searchOptions.coinType === o.metal;
      }

      if (common.searchOptions.wallet !== '') {
        isMatched = isMatched && common.searchOptions.wallet === o.purchaserWallet;
      }

      if (common.searchOptions.name !== '') {
        isMatched = isMatched && common.searchOptions.name === o.firstname + ' ' + o.surname;
      }

      if (common.searchOptions.country !== '') {
        isMatched = isMatched && common.searchOptions.country === o.whereTheyFoundIt;
      }

      if (common.searchOptions.tokenIdFrom !== '') {
        isMatched = isMatched && parseInt(common.searchOptions.tokenIdFrom) <= parseInt(o.incrementNumberCoin);
      }

      if (common.searchOptions.tokenIdTo !== '') {
        isMatched = isMatched && parseInt(common.searchOptions.tokenIdTo) >= parseInt(o.incrementNumberCoin);
      }

      if (common.searchOptions.yearFrom !== '') {
        isMatched = isMatched && parseInt(common.searchOptions.yearFrom) <= parseInt(o.whenTheyFoundItYear);
      }

      if (common.searchOptions.yearTo !== '') {
        isMatched = isMatched && parseInt(common.searchOptions.yearTo) >= parseInt(o.whenTheyFoundItYear);
      }

      if (common.searchOptions.ageFrom !== '') {
        isMatched = isMatched && parseInt(common.searchOptions.ageFrom) <= parseInt(o.coinAgeOfCoin);
      }

      if (common.searchOptions.ageTo !== '') {
        isMatched = isMatched && parseInt(common.searchOptions.ageTo) >= parseInt(o.coinAgeOfCoin);
      }

      return isMatched;
    });

    console.log('type, data', type, tProducts.length);

    if (type === 'fetchMoreData') {
      setProducts([...products, ...tProducts.slice((pageIndex - 1) * count, pageIndex * count)]);
    }

    if (type === 'searchProduct') {
      setProducts([...tProducts]);
    }    
  }

  useEffect(() => {
    dispatch(loadMetaData());
  }, []);

  useEffect(() => { 
    if (common.isSearching) {
      dispatch(loadMetaData());
    }
  }, [common.isSearching]);

  useEffect(() => {
    fetchMoreData();

    if (showModal) {
      if (common.metaData && common.metaData.length > 0) {
        let found = common.metaData.find(o => o.incrementNumberCoin === chosenTokenId);
        setSelectToken(found);
      }
    }

    if (common.isSearching) {
      searchProduct();
      dispatch(doSearch(false));
    }
  }, [common.metaData]);

  const fetchMoreData = () => {
    filterProduct('fetchMoreData');
    setPageIndex(pageIndex + 1);
  }

  const searchProduct = () => {
    filterProduct('searchProduct');
    window.scrollTo(0,0);
  }

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://via.placeholder.com/400';
  }

  const handleMetalImg = (metal, key) => {
    if (metal) {
      if (metal.includes('Gold')) {
         return <img
                  className="metal"
                  src="images/gold.png"
                  key={key+1}
                />
      } else if (metal.includes('Silver')) {
        return  <img
                  className="metal"
                  src="images/silver.png"
                  key={key+1}
                />
      } else {
        return  <img
                  className="metal"
                  src="images/bronze.png"
                  key={key+1}
                />
      }
    } else {
      return;
    }
  }
 
  return (
      <>
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={true}
          style={{ overflow: 'none' }}
        >
        <div className="photos">
          {
            products.map((image, index) => (
              <div 
                className={`img ${image.purchaserWallet ? 'walletOpacity' : ''}`} 
                key={index}
              >
                <img
                    onError={addDefaultSrc}
                    alt={`Hoard Token ${ index }`} 
                    style={{ width: '100%' }}
                    src={image.wordPressPathAndName}
                    key={index}
                    style={{ cursor: 'pointer !important' }}
                    onClick={() => {
                        loadTokenData(image.incrementNumberCoin);
                    }} 
                />
                {handleMetalImg(image.metal, index)}
              </div>
            ))
          }
        </div>
        </InfiniteScroll>        
        <Modal size="regular" style={{ width: '100% !important' }} active={showModal} toggler={() => closeModal()}>     
        <ModalHeader toggler={() => setShowModal(false)}>
                    Modal Title
                </ModalHeader>
          <ModalBody>      
            {
              common.isLoadingMetaData
              ? <StyledSelectTokenGroup>
                    <div className="sk-chase">
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                      <div className="sk-chase-dot"></div>
                    </div>
                </StyledSelectTokenGroup>
              : selectToken
                ? <StyledSelectTokenGroup>
                    <StyledSelectTokenImg alt={selectToken.incrementNumberCoin} src={selectToken.wordPressPathAndName} className={`${selectToken.purchaserWallet ? 'walletOpacity' : ''}`}  />
                    <StyledSelectTokenNumber>HOARD {selectToken.incrementNumberCoin}</StyledSelectTokenNumber>
                    <StyledSelectTokenStatus>{ selectToken.purchaserWallet ? 'RESERVED' : 'AVAILABLE' }</StyledSelectTokenStatus>
                    { selectToken.purchaserWallet ? <p className="text-wrap wallet-addr reserved"> {selectToken.purchaserWallet} </p> : null  }
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
                      <StyledSelectTokenDetailFound>{selectToken.whenTheyFoundItMonth}&nbsp;{selectToken.whenTheyFoundItDay},&nbsp;{selectToken.whenTheyFoundItYear}</StyledSelectTokenDetailFound>                
                      <StyledSelectTokenDetailFound>{selectToken.ad}&nbsp;{selectToken.coinAgeOfCoin}</StyledSelectTokenDetailFound>                
                      <StyledSelectTokenDetailFound>{selectToken.metal}</StyledSelectTokenDetailFound>      
                      </StyledSelectTokenDetailRight>                              
                    </StyledSelectTokenDetailBlock>
                  </StyledSelectTokenGroup>
                : <StyledSelectTokenGroup>
                    <StyledSelectTokenStatus>This token is not available</StyledSelectTokenStatus>
                  </StyledSelectTokenGroup>
            }
          </ModalBody>
        </Modal>
        {
          common.isSearching
          ? 
          <div className="loading-section">
                <div className="sk-chase">
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                  <div className="sk-chase-dot"></div>
                </div>
            </div>
          : null
        }
      </>
  )
}

export default Home;