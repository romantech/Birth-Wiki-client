import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <BirthWikiInfo>
        <AboutUs>
          <h2>About Us</h2>
          <div className='about'>
            <a
              className='notionrepo'
              href='https://www.notion.so/codestates/10-BirthWiki-BirthWiki-ea6b8d1a034948a58a9b2df88d02ed78'
              target='_blank'
              rel='noopener noreferrer'
            >
              <p>BirthWiki</p>
            </a>
            <a
              className='githubrepo'
              href='https://github.com/codestates/Birth-Wiki-client'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div>BirthWiki Github</div>
            </a>
            <p>코드스테이츠 26기</p>
          </div>
        </AboutUs>
        <ContactUs>
          <h2>Contact Us</h2>
          <div className='team'>
            <span className='position'>Back-end</span>
            <div className='contect'>
              <a className='repo' href='https://github.com/G-Ryu' target='_blank' rel='noopener noreferrer'>
                <img className='img_team' src={`${process.env.PUBLIC_URL}/LCM.png`} alt='kjw' />
                <span>이창민</span>
              </a>
              <div>wash3084@gmail.com</div>
            </div>
          </div>
          <div className='team'>
            <span className='position'>Front-end</span>
            <div className='contect'>
              <a
                className='repo'
                href='https://github.com/stepperweb'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img className='img_team' src={`${process.env.PUBLIC_URL}/KJW.png`} alt='kjw' />
                <span>김재우</span>
              </a>
              <div>wodnqjel@gmail.com</div>
            </div>
            <div className='contect'>
              <a className='repo' href='https://romantech.net/' target='_blank' rel='noopener noreferrer'>
                <img className='img_team' src={`${process.env.PUBLIC_URL}/JYH.png`} alt='kjw' />
                <span>장요한</span>
              </a>
              <div>johan@romantech.net</div>
            </div>
            <div className='contect'>
              <a
                className='repo'
                href='https://github.com/Ma-SangHee'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img className='img_team' src={`${process.env.PUBLIC_URL}/MSH.png`} alt='kjw' />
                <span>마상희</span>
              </a>
              <div>masang2@gmail.com</div>
            </div>
          </div>
        </ContactUs>
      </BirthWikiInfo>
      <div className='copy-right'>
        <p>© COPYRIGHT 2021 BirthWiki ALL RIGHTS RESERVED.</p>
      </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  background: #060b26;
  color: #fff;
  font-size: 15px;
  & .copy-right {
    text-align: center;
    font-size: 8px;
    padding: 10px;
  }

  @media (max-width: 899px) {
    font-size: 10px;
    padding-left: 10px;
  }
`;

const BirthWikiInfo = styled.div`
  display: flex;
  margin: 0;
  justify-content: space-around;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const AboutUs = styled.div`
  & .about {
    display: flex;
    flex-direction: column;
    & .notionrepo {
      color: #fff;
      cursor: pointer;
    }
    & .githubrepo {
      color: #fff;
      cursor: pointer;
    }
  }
`;

const ContactUs = styled.div`
  display: flex;
  flex-direction: column;

  & .team {
    display: flex;
    @media (max-width: 576px) {
      flex-direction: column;
    }
    & .position {
      display: flex;
      align-items: center;
    }
    & .contect {
      margin: 5px;
      padding: 5px;
      text-align: center;
      @media (max-width: 576px) {
        text-align: left;
      }
      & .repo {
        color: #fff;
        cursor: pointer;
        & .img_team {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          vertical-align: middle;
          margin: 5px;
        }
      }
    }
  }
`;
