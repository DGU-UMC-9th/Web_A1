import { CursorBasedResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

// ✅ author 필드 추가
export type Author = {
  id: number;
  name: string;
  avatar?: string;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  author: Author; // ✅ 이 줄 추가!
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

// ✅ 목록 응답
export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

// ✅ 상세 응답
export type ResponseLpDetailDto = {
  data: Lp;
};
