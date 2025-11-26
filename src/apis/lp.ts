import { axiosInstance } from "../apis/axios";
import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto, ResponseLpDetailDto, RequestLpDto, ResponseLpDto, ResponseLikeLpDto } from "../types/lp";

/**
 * ✅ LP 목록 조회 API
 * @param paginationDto - 페이지네이션, 검색, 정렬 정보
 */
export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};


export const getLpDetail = async({lpId}:RequestLpDto):Promise<ResponseLpDto> =>{
  const{data} = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
}

export const postLike = async({lpId}:RequestLpDto):Promise<ResponseLikeLpDto>=>{
  const {data} = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
}

export const deleteLike = async({
  lpId,
}:RequestLpDto):Promise<ResponseLikeLpDto> =>{
  const {data} = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
}