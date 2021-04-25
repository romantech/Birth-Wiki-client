import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <BirthWikiInfo>
        <AboutUs>
          <h2>About Us</h2>
          <p>코드스테이츠 26기 </p>
          <p>2차 프로젝트 </p>
          <p> BirthWiki</p>
        </AboutUs>
        <ContactUs>
          <h2>Contact Us</h2>
          <a href='https://github.com/codestates/Birth-Wiki-client' target='_blank' rel='noopener noreferrer'>
            BirthWiki Github Repo
          </a>
        </ContactUs>
        <TeamMembers>
          <h2>Team Members</h2>
        </TeamMembers>
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

  & .copy-right {
    text-align: center;
    font-size: 8px;
    padding: 10px;
  }
`;

const BirthWikiInfo = styled.div`
  display: flex;
  margin: 0;
  justify-content: space-around;
`;

const AboutUs = styled.div``;

const ContactUs = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
  cursor: pointer;
`;

const TeamMembers = styled.div``;
