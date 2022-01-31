import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { userPassword } from '../_actions/user_action'

function EditPasswordModal({
  setEditPswordModal,
  token,
  setEditPsword,
  setMessagePasswords,
  setMessagePwChecks
}) {
  const modalEl = useRef()
  const dispatch = useDispatch()

  const [password, setPassword] = useState('')
  const [messagePassword, setMessagePassword] = useState('')

  // 모달창 밖을 클릭하면 모달창이 꺼지는 함수
  const handleCloseEditPasswordModal = (e) => {
    if (e.target === modalEl.current) {
      setEditPswordModal(false)
      document.body.style.overflow = 'unset'
    }
  }

  // 클릭이벤트로 모달을 끄는 함수 실행하는 코드
  useEffect(() => {
    window.addEventListener('click', handleCloseEditPasswordModal)
    return () => {
      window.removeEventListener('click', handleCloseEditPasswordModal)
    }
  })

  // 비밀번호 확인 모달창에서 입력하는 value값 저장
  const handleCheckPsword = (e) => {
    setPassword(e.target.value)
  }

  // Dispatch 로 입력된 비밀번호를 비밀번호 확인 api로 보내 맞는지 판별하기
  // 일치한다면, 응답으로 받은 메세지를 비밀번호의 일치여부를 알려주는 텍스트 상태를 가지고있는
  // setMessagePassword 로 보내 상태를 최신화 한다.
  useEffect(() => {
    if(password === ''){
      return
    }else {
      dispatch(userPassword(password, token))
    .then((res) => {
      setMessagePassword(res.payload)
    })
    }
  }, [password])

  const hadleChangePassword = () => {
    if (messagePassword === '✔ 비밀번호가 일치합니다') {
      setEditPswordModal(false)
      setEditPsword(true)
      setMessagePasswords('')
      setMessagePwChecks('')
    }
  }

  return (
    <>
      <CheckPasswordContainer>
        <CheckPassword>
          <ModalBackground
            className="modal_background"
            onClick={(e) => handleCloseEditPasswordModal(e)}
            ref={modalEl}
          >
            <CheckPasswordModal>
              <div className="checkPswordTitle">비밀번호 확인</div>
              <input
                type="password"
                className="checkPswordInput"
                placeholder="현재 비밀번호"
                onChange={(e) => handleCheckPsword(e)}
              ></input>
              <Check>
                {messagePassword === '✔ 비밀번호가 일치합니다' ? (
                  <div className="samePsword">{messagePassword}</div>
                ) : (
                  <div className="wrongPsword">{messagePassword}</div>
                )}
              </Check>
              <div className="checkPswordBtn" onClick={hadleChangePassword}>
                확인하기
              </div>
            </CheckPasswordModal>
          </ModalBackground>
        </CheckPassword>
      </CheckPasswordContainer>
    </>
  )
}

const CheckPasswordContainer = styled.div`
  .modal_background {
    background-color: rgba(31, 29, 29, 0.7);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 100;
  }
`

const CheckPassword = styled.div``

const ModalBackground = styled.div``

const CheckPasswordModal = styled.div`
  width: 500px;
  height: 200px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 500;
  @media screen and (max-width: 767px) {
    width: 300px;
  height: 250px;
  left: 46%;
    }
  .checkPswordTitle {
    position: absolute;
    top: 40px;
    left: 48px;
    font-size: 1.3rem;
    @media screen and (max-width: 767px) {
      top: 40px;
    left: 28px;
    }
  }
  .checkPswordInput {
    position: absolute;
    width: 400px;
    height: 30px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid black;
    :focus {
      outline: none;
    }
    @media screen and (max-width: 767px) {
    width: 240px;
    }
  }
  .checkPswordBtn {
    position: absolute;
    height: 30px;
    bottom: 30px;
    right: 50px;
    font-size: 1.2rem;
    :hover {
      cursor: pointer;
      color: #840909;
    }
    @media screen and (max-width: 767px) {
    bottom: 20px;
    right: 30px;
    }
  }
`

const Check = styled.div`
  .samePsword {
    margin: 0;
    margin-top: 0px;
    position: absolute;
    left: 50px;
    bottom: 45px;
    font-size: 13px;
    color: #1b7e07;
    @media screen and (max-width: 767px) {
    bottom: 80px;
    left: 140px;
    }
  }
  .wrongPsword {
    margin: 0;
    margin-top: 0px;
    position: absolute;
    left: 50px;
    bottom: 45px;
    font-size: 13px;
    color: #840909;
    @media screen and (max-width: 767px) {
    bottom: 80px;
    left: 110px;
    }
  }
`

export default EditPasswordModal
