import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpInputData } from './signUpInputData';
import './SignUp.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    idValue: '',
    passwordValue: '',
    rePasswordValue: '',
    name: '',
    phoneNumber: '',
    email: '',
    checkAll: '',
  });

  const scrollUp = () => {
    window.scroll({
      top: 0,
    });
  };

  const handleChangestate = (e, data) => {
    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
    //WarningMessageMarginFuntion(e, data);
  };

  const testPhoneNumber = /^\d+$/;
  const testId = /^[a-z0-9]{4,16}$/;
  const testPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  const conditions = {
    phoneNumber: /^\d+$/.test(inputValue.phoneNumber),
    idValue: /^[a-z0-9]{4,16}$/.test(inputValue.idValue),
    passwordValue:
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
        inputValue.passwordValue
      ),
    rePasswordValue: true,
    name: true,
    email: true,
  };

  const handleChangeCheckstate = e => {
    const { name } = e.target;
    const { checked } = e.currentTarget;
    setInputValue({
      ...inputValue,
      [name]: checked,
    });
  };

  const testValue = () => {
    if (!testId.test(inputValue.idValue)) {
      alert('아이디 항목은 필수 입력값입니다.');
      return false;
    } else if (!testPassword.test(inputValue.passwordValue)) {
      alert('패스워드 항목은 필수 입력값입니다.');
      return false;
    } else if (
      inputValue.passwordValue.length < 8 ||
      inputValue.passwordValue.length > 16
    ) {
      alert(
        '대소문자/숫자/특수문자중3가지 이상 조합,8자~16자 필수 공백 불가능'
      );
      return false;
    } else if (
      inputValue.rePasswordValue.length !== inputValue.passwordValue.length
    ) {
      alert('패스워드가 다릅니다.');
      return false;
    } else if (inputValue.name.length === 0) {
      alert('이름 항목은 필수 입력값입니다.');
      return false;
    } else if (
      inputValue.phoneNumber.length === 0 ||
      !testPhoneNumber.test(inputValue.phoneNumber)
    ) {
      alert('휴대전화 항목은 필수 입력값입니다.');
      return false;
    } else if (inputValue.email.indexOf('@') === -1) {
      alert('이메일 항목은 필수 입력값입니다.');
      return false;
    } else if (inputValue.checkAll !== true) {
      alert('체크 항목은 필수 입력값입니다.');
      return false;
    }
    return true;
  };

  // const [WarningMessageMargin, setWarningMessageMargin] =
  //   useState('signUpItemActive');

  // const WarningMessageMarginFuntion = (e, inputData) => {
  //   if (e.target.name === inputData) {
  //     setWarningMessageMargin('signUpItem');
  //   }
  //   // console.log(inputData);
  //   // if (testId.test(inputValue.idValue) && inputData.name === 'idValue') {
  //   //   return setWarningMessageMargin('signUpItem');
  //   // } else if (
  //   //   testPassword.test(inputValue.passwordValue) &&
  //   //   inputData.name === 'passwordValue'
  //   // ) {
  //   //   return setWarningMessageMargin('signUpItem');
  //   // } else {
  //   //   setWarningMessageMargin('signUpItemActive');
  //   // }
  // };
  // className={
  //   (!testId.test(inputValue.idValue) &&
  //     inputData.name === 'idValue') ||
  //   (!testPassword.test(inputValue.passwordValue) &&
  //     inputData.name === 'passwordValue')
  //     ? 'signUpItemActive'
  //     : 'signUpItem'
  // }

  //const WarningMessageClassName =

  const goToMain = () => {
    if (testValue()) {
      fetch('http://10.58.3.49:8000/member/join', {
        method: 'POST',
        body: JSON.stringify({
          username: inputValue.idValue,
          password: inputValue.passwordValue,
          name: inputValue.name,
          phone_number: inputValue.phoneNumber,
          email: inputValue.email,
        }),
      })
        .then(response => response.json())
        .then(result => {
          if (result.MESSAGE === 'SUCCESS') {
            localStorage.setItem('login-token', result.ACCESS_TOKEN);
            alert('회원가입성공');
            navigate('/Login');
            scrollUp();
          }
        });
    } else {
      return null;
    }
  };

  return (
    <div className="signUPageWrapper">
      <div className="signUPBox">
        {signUpInputData.map(inputData => {
          //console.log(inputData);
          return (
            <div key={inputData.id} className="signUpInputMap">
              <p className="signUpItem">{inputData.text}</p>
              <input
                className={`signUpItem ${
                  conditions[inputData.name] ? '' : 'signUpItemActive'
                }`}
                name={inputData.name}
                onChange={e => handleChangestate(e, inputData.name)}
                type={inputData.password}
              />
              <span
                className={
                  (!testId.test(inputValue.idValue) &&
                    inputData.name === 'idValue') ||
                  (!testPassword.test(inputValue.passwordValue) &&
                    inputData.name === 'passwordValue')
                    ? 'idWarningMessageAtive'
                    : 'WarningMessageNoneAtive'
                }
              >
                {inputData.warningMessage}
              </span>
            </div>
          );
        })}
        <p className="serviceAgree">서비스 이용 동의</p>
        <div className="inputWrapper agreeAll">
          <label>
            <input
              type="checkbox"
              name="checkAll"
              onChange={handleChangeCheckstate}
            />
            이용약관에 모두 동의합니다.
          </label>
        </div>
        <button onClick={goToMain}>가입하기</button>
      </div>
    </div>
  );
};

export default SignUp;
