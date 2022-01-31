/*global kakao */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import review from '../image/review.jpeg'
import {
  getGroundData,
  selectGroundData,
  mapData
} from '../_actions/ground_action'
import Comment from '../components/comment/comment'
import ReviewInfo from '../components/reviewInfo'
import RegionBox from '../utils/regionBox'
import store from '../store/store'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const Review = ({ isLogin, setIsLogin, userInfo, region1, region2 }) => {
  const dispatch = useDispatch()

  let firstEnter = store.getState().ground.mapData

  const [groundData, setGroundData] = useState([])
  const [markerData, setMarkerData] = useState([])
  const [selected, setSelected] = useState('normal')
  const [groundSelect, setGroundSelect] = useState(1)

  // comment.jsx  글쓰기 버튼 누를 때 reviewInfo를 업데이트하기 위한 state
  const [commentData, setCommentData] = useState('')

  let userRegion1 = ''
  let userRegion2 = ''

  if (userInfo.loginSuccess !== undefined) {
    userRegion1 = userInfo.loginSuccess.userData.homeground.split(' ')[0]
    userRegion2 = userInfo.loginSuccess.userData.homeground.split(' ')[1]
  }

  // app.js에서의 사용자 region을 가져와서
  // app.js region 변경없이 review페이지에서만 지역상태를 관리하기 위한 useState
  const [home1, setHome1] = useState(userRegion1)
  const [home2, setHome2] = useState(userRegion2)
  // region box 클릭시에 해당 주소의 첫번째 경기장의 위치를 중심으로 검색
  const [location1, setLocation1] = useState(37.2520770795763)
  const [location2, setLocation2] = useState(127.214827986162)

  const [center, setCenter] = useState({
    center: new kakao.maps.LatLng(location1, location2),
    level: 10
  })

  const changeComment = () => {
    setSelected('choose')
  }

  const firstData1 = (e) => {
    setHome1(e)
  }
  const firstData2 = (e) => {
    setHome2(e)
  }
  const handleData1 = (e) => {
    setHome1(e.value)
  }
  const handleData2 = (e) => {
    setHome2(e.value)
  }

  const Ground = () => {
    dispatch(getGroundData(home1, home2))
      .then((res) => {
        setMarkerData(res.payload)
        // 페이지에 입장했을 때 사용자가 선호하는 지역의 첫 번째로 등록된 풋살장을 보여주기 위한 상태 업데이트
        setCenter({
          center: new kakao.maps.LatLng(
            res.payload[0].longitude,
            res.payload[0].latitude
          ),
          level: 10
        })
        if (res.payload[0].longitude === 37.2520770795763) {
          Swal.fire({
            text: '해당 지역의 경기장 리뷰가 없습니다!',
            icon: 'warning',
            confirmButtonColor: '#d2d2d2',
            confirmButtonText: '확인'
          })
        }
        setSelected('normal')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const mapscript = () => {
    let container = document.getElementById('map')

    let map = new kakao.maps.Map(container, center)

    //줌 컨트롤러
    const zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    let normalImageSrc =
      'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-128.png'
    markerData.map((el) => {
      let imageSize = new kakao.maps.Size(35, 35)
      let markerImage = new kakao.maps.MarkerImage(normalImageSrc, imageSize)

      const markers = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다.
        map: map,
        position: new kakao.maps.LatLng(el.longitude, el.latitude),
        image: markerImage
      })
      let iwContent =
        `<div class='info-title' style="     display: block;
        background: #952e16;
        color: #fff;
        text-align: center;
        height: 24px;
        line-height:22px;
        border-radius:4px;
        padding:0px 10px;padding:6px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">` +
        `${el.placeName}` +
        `</div>`

      let infowindow = new kakao.maps.InfoWindow({ content: iwContent })
      kakao.maps.event.addListener(markers, 'mouseover', function () {
        infowindow.open(map, markers)
      })
      kakao.maps.event.addListener(markers, 'mouseout', function () {
        infowindow.close(map, markers)
      })
      kakao.maps.event.addListener(markers, 'click', function () {
        setCommentData('')
        dispatch(selectGroundData(el.id)).then((res) => {
          setGroundData(res.payload)
          markerDetail(res.payload.id)
        })
      })
    })
  }

  const markerDetail = (id) => {
    setSelected('normal')
    setGroundSelect(id)
    changeComment()
  }

  // 지도를 그려주기 위한 useEffect
  // 아래 조건문을 통해 map 페이지에서 리뷰 보기를 눌러 들어왔는지를 판단
  // 리뷰 보기를 눌러 들어왔다면 해당 경기장의 지역을 Region박스에 담아 준다.
  useEffect(() => {
    if (firstEnter !== undefined) {
      if (Object.keys(store.getState().ground.mapData).length !== 0) {
        const data = store.getState().ground.mapData
        data.address_name && setHome1(data.address_name.split(' ')[0])
        data.address_name && setHome2(data.address_name.split(' ')[1])
        data.y && setLocation1(data.y)
        data.x && setLocation2(data.x)
      }
    }

    Ground()
  }, [home2])

  // 지도가 그려지면 해당 지역에 등록된 경기장을 보여주기 위한 useEffect
  //  map페이지에서 리뷰보기 클릭시 넘어올 때는 store.getState().ground.accordData가 있는지 없는지로 확인
  useEffect(() => {
    // 비회원일 경우의 데이터
    if (userInfo.loginSuccess === undefined) {
      dispatch(selectGroundData(1)).then((res) => {
        setGroundData(res.payload)
        markerDetail(res.payload.id)
      })
    }

    // 로그인 후 사용자의 지역 데이터의 0번째로 등록된 경기장 정보
    if (markerData.length !== 0 && userInfo.loginSuccess) {
      dispatch(selectGroundData(markerData[0].id)).then((res) => {
        setGroundData(res.payload)
        markerDetail(res.payload.id)
      })
    }

    // map페이지에서 리뷰보기 선택 후 넘어오는 조건문
    if (firstEnter !== undefined) {
      if (Object.keys(store.getState().ground.mapData).length !== 0) {
        const data = store.getState().ground.mapData
        if (data.address_name !== undefined) {
          if (store.getState().ground.accordData !== undefined) {
            dispatch(
              selectGroundData(store.getState().ground.accordData.data.id)
            ).then((res) => {
              setGroundData(res.payload)
              markerDetail(res.payload.id)
            })
          }
        }
      }
    }

    mapscript()

    //리뷰를 보여준 뒤에 map데이터 초기화
    const tick = setTimeout(() => {
      dispatch(mapData({}))
    }, 500)
    return () => clearTimeout(tick)
    // commentData는 comment.jsx에서 글쓰기를 눌렀을 때
    // review의 commentData를 업데이트하고
    // 업데이트된 commentData를 reviewInfo.jsx에 보내줘서
    // 평균 평점과 리뷰 참여수를 최신화 하기 위함이다.
    // 하지만 이로 인해 글쓰기버튼 입력시 데이터를 2번 요청하게 된다.
  }, [markerData, center])

  return (
    <>
      <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
      <TitleWrapper>
        <TitleImg src={review} />
        <TitleText>
          Review<p>경기장은 어땠나요?</p>
        </TitleText>
      </TitleWrapper>
      <FormContainer>
        <RegionWrapper>
          <RegionBox
            region1={region1}
            region2={region2}
            handleData1={handleData1}
            handleData2={handleData2}
            firstData1={firstData1}
            firstData2={firstData2}
          />
        </RegionWrapper>
        <FormWrapper>
          <MapWrap id="map"></MapWrap>
          <ContentWrap>
            {selected === 'choose' ? (
              <>
                <ReviewInfo groundData={groundData} commentData={commentData} />
                <Comment
                  groundData={groundData}
                  setCommentData={setCommentData}
                  groundSelect={groundSelect}
                />
              </>
            ) : (
              <InitWrap>
                <InitText>해당 지역의 리뷰가 없습니다</InitText>
                <InitText>지역을 선택해서 리뷰를 확인해보세요</InitText>
              </InitWrap>
            )}
          </ContentWrap>
        </FormWrapper>
      </FormContainer>
      <Footer />
    </>
  )
}

const TitleWrapper = styled.div`
  height: 300px;
  position: relative;
  background-color: #535353;
  @media screen and (max-width: 767px) {
    height: 150px;
    width: 100%;
  }
`

const TitleImg = styled.img`
  opacity: 50%;
  width: 100%;
  height: 100%;
`

const TitleText = styled.h1`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #ffffff;
  font-size: 50px;
  font-weight: bold;
  p {
    font-size: 20px;
    font-weight: 20;
    margin-top: 5px;
    @media screen and (max-width: 767px) {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 767px) {
    font-size: 20px;
    text-align: center;
  }
`

const FormContainer = styled.div`
  background-color: #fafafa;
  height: 1500px;
  position: relative;
  width: 800px;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    width: auto;
  }
`

const RegionWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: -2px;
  @media screen and (max-width: 767px) {
    left: 9px;
    top: 35px;
  }
`

const FormWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 2px #bebebe;
  height: auto;
  width: 800px;
  height: 1250px;
  border-radius: 5px;
  background-color: #ffffff;
  @media screen and (max-width: 767px) {
    width: calc(100% - 20px);
    height: 1100px;
    top: 630px;
    border: solid 1px #bebebe;
  }
`

const MapWrap = styled.div`
  width: 800px;
  height: 400px;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 250px;
  }
`

const ContentWrap = styled.div`
  padding: 50px 100px;
  box-sizing: border-box;
  @media screen and (max-width: 767px) {
    padding: 10px;
  }
`

const InitText = styled.h1`
  width: 100%;
  height: 100%;
  align-items: center;
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`

const InitWrap = styled.div`
  margin: 300px auto;
  @media screen and (max-width: 767px) {
  }
`

export default Review
