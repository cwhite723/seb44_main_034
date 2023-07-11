import { atom } from 'recoil';

export type CafeType = {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  contact: string;
  notice?: string;
  cafeImg: File | string;
  rating: string;
  openTime: string;
  closeTime: string;
  facility: FacilityType[];
  post?: PostType[];
  menu?: MenuType[];
};

export type FacilityType = {
  title?: string;
  name: string;
  checked: boolean;
};

export type PostType = {
  //포스트 타입에 관해 작성
};

export type MenuType = {
  id?: string;
  type: string;
  name: string;
  price: string;
  comment?: CommentType[];
};
export type CommentType = {
  id: string;
  memberId: string;
  content: string;
};
// 카페 정보를 담는 atom
export const AllcafeState = atom<CafeType[]>({
  key: 'AllcafeState',
  default: [],
});

export const cafeState = atom<CafeType>({
  key: 'cafeState',
  default: {
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
  },
});
