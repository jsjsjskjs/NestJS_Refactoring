import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import mainLogo from '../image/mainLogo.png'
import Footer from '../components/footer'

const Main = () => {
  return (
    <>
      <MainPage>
        <MainLogoPage>
          <MainLogo>
            <img src={mainLogo} alt="mainLogo" className="logo"></img>
            <div className="logo_text">우리 동네 스포츠의 A 부터 Z 까지</div>
            <Link to="/entrance" className="logo_button">
              입장하기
            </Link>
          </MainLogo>
          <DownArrow>
            <DownArrow2>
              <DownArrowSpan>
                <span></span>
                <span></span>
              </DownArrowSpan>
            </DownArrow2>
          </DownArrow>
        </MainLogoPage>
        <Landing1>
          <LandingContainer>
            <LandingIn>
              <LandingText className="text scroll">
                <div className="landing_mainText">
                  우리 동네의
                  <br />
                  경기장을 찾아보세요.
                </div>
                <div className="landing_subText">
                  우리 동네 경기장에서부터
                  <br />
                  전국의 경기장 정보를 제공합니다.
                  <br />
                  <br />
                  한번 검색해보세요,
                  <br />
                  지금도 그곳에선 뜨거운 경기가 열리고 있습니다!
                </div>
              </LandingText>
              <div className="landing_gif1 scroll">Gif</div>
              {/* <img src={mainLogo} alt="mainLogo" className="landing_gif1 scroll"></img> */}
            </LandingIn>
          </LandingContainer>
        </Landing1>
        <Landing2>
          <LandingContainer>
            <LandingIn>
              <div className="landing_gif2 scroll">Gif</div>
              {/* <img src={mainLogo} alt="mainLogo" className="landing_gif1 scroll"></img> */}
              <LandingText className="text scroll">
                <div className="landing_mainText2">
                  팀원을 모집할 수 있고
                  <br />
                  경기를 주선할 수 있습니다.
                </div>
                <div className="landing_subText2">
                  같이 운동할 팀원을 찾고 있나요?
                  <br />
                  이곳에선 다양한 스포츠메이트를 만날 수 있습니다.
                  <br />
                  적재적소에 필요한 팀원을 모집해 보세요.
                  <br />
                  <br />
                  이미 팀이 있다면
                  <br />
                  다른팀에게 경기를 제안할 수 있습니다.
                </div>
              </LandingText>
            </LandingIn>
          </LandingContainer>
        </Landing2>
        <Landing1>
          <LandingContainer>
            <LandingIn>
              <LandingText className="text scroll">
                <div className="landing_mainText">
                  다양한 소통의 기능을
                  <br />
                  제공합니다.
                </div>
                <div className="landing_subText">
                  같은 경기장을 사용했던 사람들의 솔직한 리뷰나
                  <br />
                  사용하고 싶은 경기장의 리뷰를 확인할 수 있습니다.
                  <br />
                  <br />
                  팀원간의 커뮤니케이션을 위해
                  <br />
                  실시간 채팅기능을 제공합니다.
                </div>
              </LandingText>
              <div className="landing_gif1 scroll">Gif</div>
              {/* <img src={mainLogo} alt="mainLogo" className="landing_gif1 scroll"></img> */}
            </LandingIn>
          </LandingContainer>
        </Landing1>
        <LandingFinal>
          <LandingFinalText>
            <div className="landing_finalText">
              A to Z Sports 는<br />
              당신의 참여를 기다리고 있습니다.
            </div>
            <div className="landing_subText">
              다양한 분야의 스포츠 메이트들이 이미 운동을 시작했습니다!
            </div>
            <Link to="/entrance" className="logo_button">
              입장하기
            </Link>
          </LandingFinalText>
        </LandingFinal>
      </MainPage>
      <Footer />
    </>
  )
}

const MainPage = styled.div`
  width: 100%;
`

const MainLogoPage = styled.div`
  width: 100%;
  height: 100vh;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

const MainLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .logo {
    width: 27rem;
    @media screen and (max-width: 767px) {
      width: 20rem;
    }
  }
  .logo_text {
    margin-top: 5px;
    font-size: 23px;
    text-align: center;
    font-weight: lighter;
    @media screen and (max-width: 767px) {
      font-size: 17px;
    }
  }
  .logo_button {
    margin-top: 32px;
    padding: 7px;
    width: 145px;
    height: 14px;
    text-align: center;
    font-size: 15px;
    color: #353535;
    border: 2.5px solid #353535;
    border-radius: 15px;
    text-decoration: none;
    :hover {
      cursor: pointer;
      color: #840909;
      border: 2.5px solid #840909;
      transition: 0.3s ease-out;
    }
    @media screen and (max-width: 767px) {
      margin-top: 22px;
      width: 110px;
      height: 12px;
    }
  }
`

const DownArrow = styled.section`
  position: absolute;
  bottom: 3rem;
  left: 0;
  width: 100%;
  height: 13vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`

const DownArrow2 = styled.div`
  max-width: 1920px;
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 4rem;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const DownArrowSpan = styled.div`
  span {
    display: block;
    width: 1.5em;
    height: 1.5em;
    border-bottom: 2px solid #606060;
    border-right: 2px solid #606060;
    transform: rotate(45deg);
    margin: -8px;
    animation: animate-arrows 2s infinite;
    @media screen and (max-width: 767px) {
      width: 1.2em;
      height: 1.2em;
    }
    @keyframes animate-arrows {
      0% {
        opacity: 0;
        transform: rotate(45deg) translate(-1.5em, -1.5em);
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: rotate(45deg) translate(1.5em, 1.5em);
      }
    }
  }
`

const Landing1 = styled.section`
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

const LandingContainer = styled.div`
  max-width: 1920px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const LandingIn = styled.div`
  width: 100%;
  height: 50%;
  margin: 300px 0px 300px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 0.2rem;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }
  .landing_gif1 {
    margin: 0px 0px 0px 100px;
    display: flex;
    border: 1px solid gray;
    width: 700px;
    height: 350px;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 767px) {
      margin: 30px auto 0px auto;
      width: 300px;
      height: 500px;
      border: 1px solid gray;
      justify-content: center;
      align-items: center;
    }
  }
  .landing_gif2 {
    margin: 0px 100px 0px 0px;
    display: flex;
    width: 700px;
    height: 350px;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    @media screen and (max-width: 767px) {
      margin: 0px auto 40px auto;
      width: 300px;
      height: 500px;
      border: 1px solid gray;
      justify-content: center;
      align-items: center;
    }
  }
`

const LandingText = styled.div`
  display: flex;
  flex-direction: column;
  color: #353535;
  @media screen and (max-width: 767px) {
    text-align: center;
  }
  .landing_mainText {
    font-size: 2.8rem;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    line-height: 50px;
    @media screen and (max-width: 767px) {
      font-size: 30px;
    }
  }
  .landing_subText {
    font-size: 1.1rem;
    margin-top: 20px;
    line-height: 20px;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
  .landing_mainText2 {
    font-size: 2.8rem;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    line-height: 50px;
    @media screen and (max-width: 767px) {
      font-size: 30px;
    }
  }
  .landing_subText2 {
    font-size: 1.1rem;
    margin-top: 20px;
    line-height: 20px;
    @media screen and (max-width: 767px) {
      font-size: 14px;
    }
  }
`

const Landing2 = styled.section`
  background-color: #fafafa;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`

const LandingFinal = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 200px;
`

const LandingFinalText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #353535;
  .landing_finalText {
    font-size: 2.2rem;
    text-align: center;
    @media screen and (max-width: 767px) {
      font-size: 22px;
    }
  }
  .landing_subText {
    margin-top: 30px;
    @media screen and (max-width: 767px) {
      font-size: 12px;
      margin-top: 20px;
    }
  }
  .logo_button {
    margin-top: 32px;
    padding: 7px;
    width: 145px;
    height: 14px;
    text-align: center;
    font-size: 15px;
    color: #353535;
    border: 2.5px solid #353535;
    border-radius: 15px;
    text-decoration: none;
    :hover {
      cursor: pointer;
      color: #840909;
      border: 2.5px solid #840909;
      transition: 0.3s ease-out;
    }
    @media screen and (max-width: 767px) {
      margin-top: 22px;
      width: 110px;
      height: 12px;
    }
  }
`

export default Main
