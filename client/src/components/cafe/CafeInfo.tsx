import axios from 'axios';
import { useState } from 'react';
import { FacilityType } from '../../recoil/recoil';
import { CafeType } from '../../recoil/recoil';
import { ConfirmBtn } from '../../common/button/button';
import styled from 'styled-components';
import { COLOR_1, FONT_SIZE_2 } from '../../common/common';
// import { BiImageAdd } from 'react-icons/bi';

const CafeInfo = () => {
  const [facility, setFacility] = useState<FacilityType[]>([
    { name: 'isOpenAllTime', title: '24시간 운영여부', checked: false },
    {
      name: 'isChargingAvailable',
      title: '콘센트 유무',
      checked: false,
    },
    { name: 'hasParking', title: '주차공간', checked: false },
    {
      name: 'isPetFriendly',
      title: '동물 출입 가능 여부',
      checked: false,
    },
    { name: 'hasDessert', title: '디저트 판매 여부', checked: false },
  ]);

  const [tempCafeData, setTempCafeData] = useState<CafeType>({
    id: '',
    ownerId: '',
    name: '',
    address: '',
    contact: '',
    notice: '',
    cafeImg: '',
    rating: '',
    openTime: '',
    closeTime: '',
    facility: [],
    post: [],
    menu: [],
  });

  // const [cafeImg, setCafeImg] = useState<string | ArrayBuffer | null>(null);

  // const fileInput = useRef<HTMLInputElement>(null);
  // const handleButtonClick = () => {
  //   if (fileInput.current) {
  //     fileInput.current.click();
  //   }
  // };
  const filteredFacility = facility.map(({ name, checked }) => ({
    name,
    checked,
  }));

  // const handleSaveImg = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const reader = new FileReader();

  //   reader.onload = function (e) {
  //     if (e.target) {
  //       setCafeImg(e.target.result);
  //     }
  //   };
  //   if (e.target.files) {
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const handleCafeInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTempCafeData((prevCafeData) => ({
      ...prevCafeData,
      [name]: value,
    }));
  };
  tempCafeData.facility = filteredFacility;
  const handleSaveCafeInfo = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/cafes',
        tempCafeData
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickCheckbox = (fchecked: boolean, item: FacilityType) => {
    const updatedFacilities = facility.map((f) => {
      if (f.name === item.name) {
        return {
          ...f,
          checked: fchecked,
        };
      }

      return f;
    });

    setFacility(updatedFacilities);
    setTempCafeData((prevCafeData) => ({
      ...prevCafeData,
      facility: updatedFacilities,
    }));
    console.log(updatedFacilities);
  };

  return (
    <>
      <form onSubmit={handleSaveCafeInfo}>
        <S.MainDiv>
          <S.AddImageDiv>
            {/* <input
              type='file'
              accept='image/*'
              ref={fileInput}
              style={{ display: 'none' }}
              onChange={handleSaveImg}
            /> */}
            {/* <S.ImageShow alt='대표 카페 사진' src={cafeImg} /> */}
          </S.AddImageDiv>

          {/* <AddImage onClick={handleButtonClick} /> */}
          <S.AddCafeInfoDiv>
            <S.CafeName
              type='text'
              name='name'
              placeholder='카페명을 입력해주세요'
              value={tempCafeData.name}
              onChange={handleCafeInfoChange}
              required
            />
            <S.CafeInputLabel>
              OPEN :
              <CafeBusinessHours
                type='text'
                placeholder='9:00'
                value={tempCafeData.openTime}
                name='openTime'
                onChange={handleCafeInfoChange}
                required
              />
            </S.CafeInputLabel>
            <S.CafeInputLabel>
              CLOSE :
              <CafeBusinessHours
                type='text'
                placeholder='22:00'
                value={tempCafeData.closeTime}
                name='closeTime'
                onChange={handleCafeInfoChange}
                required
              />
            </S.CafeInputLabel>
            <S.CafeInputLabel>
              주소 :
              <CafeAddress
                type='text'
                value={tempCafeData.address}
                name='address'
                onChange={handleCafeInfoChange}
                required
              />
            </S.CafeInputLabel>
            <S.CafeInputLabel>
              연락처 :
              <CafeContact
                type='text'
                value={tempCafeData.contact}
                name='contact'
                onChange={handleCafeInfoChange}
                required
              />
            </S.CafeInputLabel>
            <S.CafeNoticeDiv>
              공지사항
              <CafeNotice
                type='text'
                value={tempCafeData.notice}
                name='notice'
                onChange={handleCafeInfoChange}
              />
            </S.CafeNoticeDiv>
            <S.CafeFacilityDiv>
              {facility.map((item) => (
                <S.CafeFacilitySpan key={item.name}>
                  <S.CafeFacility
                    key={item.name}
                    type='checkbox'
                    value={`${item.checked}`}
                    name={`${item.name}`}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleClickCheckbox(e.target.checked, item);
                    }}
                  />

                  {item.title}
                </S.CafeFacilitySpan>
              ))}
            </S.CafeFacilityDiv>
          </S.AddCafeInfoDiv>
        </S.MainDiv>
        <S.ButtonDiv>
          {/* <AddImage onClick={handleButtonClick} /> */}
          <ConfirmBtn type='submit'>확인</ConfirmBtn>
          <ConfirmBtn>나가기</ConfirmBtn>
        </S.ButtonDiv>
      </form>
    </>
  );
};
const S = {
  MainDiv: styled.div`
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center;

    flex-direction: row;
    @media screen and (max-width: 500px) {
      flex-direction: column;
      justify-content: flex-start;
    }
  `,
  AddImageDiv: styled.div`
    width: 35vw;
    height: 55vh;
    border: 2px solid ${COLOR_1.black};
    margin-right: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 500px) {
      width: 80vw;
      height: 23vh;
      margin-top: 10%;
      margin-bottom: 5%;
    }
  `,
  ImageShow: styled.img`
    height: 100%;
    width: 100%;
    margin: auto;
  `,
  AddCafeInfoDiv: styled.div`
    width: 45vw;
    height: 55vh;
    padding: 1%;

    @media screen and (max-width: 500px) {
      width: 80vw;
      height: 50vh;
    }
  `,
  InputBase: styled.input`
    outline: none;
    border: none;
    font-size: ${FONT_SIZE_2.normal_3};
    &:hover {
      outline: auto;
    }
  `,
  CafeName: styled.input`
    width: 100%;
    height: 18%;
    outline: none;
    border: none;
    margin-bottom: 2%;
    &:hover {
      outline: auto;
    }
    font-size: ${FONT_SIZE_2.big_2};
    @media screen and (max-width: 500px) {
      height: 10%;
    }
  `,
  CafeInputLabel: styled.div`
    width: 100%;
    height: 8%;
    margin: 1%;
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.normal_3};
    text-align: start;
  `,
  CafeNoticeDiv: styled.div`
    width: 95%;
    height: 20%;
    min-height: 20%;
    border: 5px solid ${COLOR_1.dark_sand};
    border-radius: 20px;
    @media screen and (max-width: 500px) {
      height: 10%;
    }
  `,
  CafeFacilityDiv: styled.div`
    min-width: 350px;
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;
  `,
  CafeFacilitySpan: styled.span`
    padding: 2%;
    color: ${COLOR_1.dark_brown};
    font-size: ${FONT_SIZE_2.normal_2};
    @media screen and (max-width: 500px) {
      display: block;
      text-align: start;
    }
  `,
  CafeFacility: styled.input`
    transform: scale(1.5);
    font-size: ${FONT_SIZE_2.normal_4};
    margin-top: 1%;
    &:hover {
      cursor: pointer;
    }
  `,
  ButtonDiv: styled.div`
    display: flex;
    justify-content: end;
    margin-top: 2%;
    width: 100%;
    @media screen and (max-width: 500px) {
      justify-content: center;
    }
  `,
};
// const AddImage = styled(BiImageAdd)`
//   width: 6vw;
//   height: 6vh;
// `;
const CafeBusinessHours = styled(S.InputBase)`
  width: 20%;
  height: 90%;
  @media screen and (max-width: 500px) {
    width: 30%;
    height: 50%;
  }
`;
const CafeAddress = styled(S.InputBase)`
  width: 80%;
  height: 90%;
  @media screen and (max-width: 500px) {
    width: 80%;
    height: 50%;
  }
`;
const CafeContact = styled(S.InputBase)`
  width: 50%;
  height: 90%;
`;
const CafeNotice = styled(S.InputBase)`
  width: 90%;
  height: 50%;
  margin: 1%;
  display: block;
  margin: auto;
  @media screen and (max-width: 500px) {
    height: 50%;
  }
`;
export default CafeInfo;
