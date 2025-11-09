import { axiosInstance } from "../apis/axios";
import type { PaginationDto } from "../types/common";
import type { ResponseLpListDto, ResponseLpDetailDto } from "../types/lp";

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

/**
 * ✅ LP 상세 조회 API
 * @param id - LP id
 */
export const getLpDetail = async (id: string): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data;
};
