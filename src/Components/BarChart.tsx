import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear } from '@visx/scale';

const verticalMargin = 120;
const horizontalMargin = 100;

// accessors
const getWeek = (d: any) => d.week;
const getCommitCount = (d: any) => d.commitCount;

export type BarsProps = {
  width: number;
  height: number;
  data: any;
};

export default function BarChart({ width, height, data }: BarsProps) {
  // bounds
  const xMax = width - horizontalMargin;
  const yMax = height - verticalMargin;

  const xScale = scaleBand<string>({
    range: [0, xMax],
    round: true,
    domain: data.map(getWeek),
    padding: 0.4,
  });

  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...data.map(getCommitCount))],
  });

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="white" rx={14} />
      <Group top={verticalMargin / 2} left={horizontalMargin / 2}>
        {data.map((d: any) => {
          const letter = getWeek(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getCommitCount(d)) ?? 0);
          const barX = xScale(letter);
          const barY = yMax - barHeight;
          return (
            <Group key={`bar-${letter}`}>
              <Bar x={barX} y={barY} width={barWidth} height={barHeight} fill="coral" />
              <AxisBottom
                numTicks={data.length}
                top={yMax}
                scale={xScale}
                tickLabelProps={() => ({
                  fontSize: 11,
                  textAnchor: 'middle',
                })}
              />
              <AxisLeft
                scale={yScale}
                numTicks={10}
                top={0}
                tickLabelProps={(e) => ({
                  fontSize: 10,
                  textAnchor: 'end',
                  x: -12,
                  y: (yScale(e) ?? 0) + 3,
                })}
              />
            </Group>
          );
        })}
      </Group>
    </svg>
  );
}
