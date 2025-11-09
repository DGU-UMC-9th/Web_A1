import type { PaginationDto } from "../types/common";
import { axiosInstance } from "../apis/axios";
import type { ResponseLpListDto, ResponseLpDetailDto } from "../types/lp";

// ✅ LP 목록 조회
export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

// ✅ LP 상세 조회 — 이 부분 반드시 추가!
export const getLpDetail = async (lpid: string): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpid}`);
  return data;
};
