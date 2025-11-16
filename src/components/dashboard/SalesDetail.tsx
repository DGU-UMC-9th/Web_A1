import { ResponsiveLine } from '@nivo/line';
import MonthSelectCard from './MonthSelectCard';
import { languageCopy } from '../../local';
import { useLanguage } from '../../context/LanguageContext';
import type { TSalesDetailResponse } from '../../types/dashboard';

export default function SalesDetail({ data }: { data: TSalesDetailResponse }) {
    const maxPoint = data.data.reduce((prev, curr) =>
        curr.y > prev.y ? curr : prev
    );
    const { language } = useLanguage();
    // 커스텀 레이어
    const MaxLabelLayer = ({
        xScale,
        yScale,
    }: {
        xScale: (value: number) => number;
        yScale: (value: number) => number;
    }) => {
        const x = xScale(data.max.x);
        const y = yScale(data.max.y);
        return (
            <>
                <g transform={`translate(${x},${y})`} className="relative">
                    <circle r={4} fill="#4880FF" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="80"
                        height="28"
                        viewBox="0 0 80 28"
                        fill="none"
                        x={-40}
                        y={-36}
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0 2C0 0.895431 0.895429 0 2 0H78C79.1046 0 80 0.89543 80 2V20C80 21.1046 79.1046 22 78 22H46L40 27.9771L34 22H2C0.895431 22 0 21.1046 0 20V2Z"
                            fill="#4880FF"
                        />
                        <text
                            x="50%"
                            y="45%"
                            dominantBaseline="middle"
                            textAnchor="middle"
                            fill="white"
                            fontSize="12"
                            fontWeight="600"
                        >
                            {(maxPoint.y * 12849.7).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </text>
                    </svg>
                </g>
            </>
        );
    };
    return (
        <MonthSelectCard title={languageCopy[language].Dashboard.salesDetails}>
            <ResponsiveLine
                data={[
                    {
                        id: data.month,
                        data: data.data.map((item) => ({
                            x: item.x,
                            y: item.y,
                        })),
                    },
                ]}
                margin={{ top: 24, right: 24, bottom: 40, left: 48 }}
                xScale={{ type: 'linear', min: 5, max: 60 }}
                yScale={{ type: 'linear', stacked: true, min: 20, max: 100 }}
                curve="linear"
                enableArea
                areaOpacity={1}
                areaBaselineValue={20}
                defs={[
                    {
                        id: 'gradientA',
                        type: 'linearGradient',
                        colors: [
                            { offset: 0, color: '#4880FF', opacity: 0.35 },
                            { offset: 100, color: '#4880FF', opacity: 0 },
                        ],
                    },
                ]}
                fill={[{ match: '*', id: 'gradientA' }]}
                axisBottom={{
                    tickValues: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
                    tickRotation: 0,
                    format: (v: number) => `${v}k`,
                }}
                axisLeft={{
                    tickValues: [20, 40, 60, 80, 100],
                    format: (v: number) => `${v}%`,
                }}
                enableGridX={false}
                gridYValues={[20, 40, 60, 80, 100]}
                legends={[]}
                colors="#4880FF"
                pointSymbol={({ datum }) => {
                    if (datum.x % 5 == 0) {
                        return <circle r={4} fill="#4880FF" />;
                    }
                    return null;
                }}
                layers={[
                    'grid',
                    'axes',
                    'areas',
                    'lines',
                    'points',
                    'slices',
                    'mesh',
                    MaxLabelLayer,
                    'legends',
                ]}
                theme={{
                    grid: {
                        line: {
                            stroke: '#EAEAEA',
                            strokeWidth: 1,
                            strokeDasharray: '0',
                        },
                    },
                }}
            />
        </MonthSelectCard>
    );
}
