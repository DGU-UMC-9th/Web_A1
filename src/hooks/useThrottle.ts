//useThrottle : 주어진 값(상태)가 자주 변경될 때
//최소 interval 간격으로만 업데이트해서 성능 개선

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value:T, delay:number=500){
    //1. 상태 변수 : throttledValue : 최종적으로 쓰로틀링 적용된 값 찾아
    const[throttledValue, setThrottledValue] = useState<T>(value);

    //2. Ref lastExcecuted : 마지막 실행된 시간을 기록
    //useRef 사용하면 컴포넌트가 리렌더링 되어도 값이 유지되고 변경되어도 리렌더링을 트리거하지 않는다.
    const lastExecuted = useRef<number>(Date.now());
    //3. useEffect : value, delay가 변경될 때 아래 로직 실행
    useEffect(()=>{
        //현재 시각과 lastExecuted.current에 저장된 마지막 시각 + delay을 비교
        if(Date.now()>= lastExecuted.current + delay){
            lastExecuted.current = Date.now();
            //최신 value를 throttledValue에 저장해서 컴포넌트 리렌더링
            setThrottledValue(value);
        }else{
            //충분한 시간이 지나지 않은 경우, delay 시간 후에 업데이트
            const timerId = setTimeout(()=>{
                //타이머가 만료되면 마지막 업데이트 시각을 현재 시각으로 갱신
                lastExecuted.current = Date.now();
                //최신 value를 throttledValue에 저장
                setThrottledValue(value);
            }, delay);

            //cleanup 함수
            return() => clearTimeout(timerId);
        }
    },[value, delay]);
    return throttledValue
}

export default useThrottle;