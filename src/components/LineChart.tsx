"use client"

import { ResponsiveLine } from '@nivo/line'

export function MyResponsiveLineBump(props: { data: DataProps[] }) {
    return <ResponsiveLine
        data={props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat=" >.0f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "date",
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 1,
            tickRotation: 0,
            legend: "price",
            legendOffset: -50,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        // colors={{ scheme: 'pink_yellowGreen' }}
        colors={[
            '#8B4513',
            '#FF69B4',
            '#00BFFF',
            '#7B68EE',
            '#FF7F50',
            '#9ACD32',
            '#FF0000',
            '#00FA9A',
            '#1E90FF',
            '#8A2BE2',
            '#FF4500',
            '#00CED1',
            '#6A5ACD',
            '#FFA500',
            '#00FF00',
            '#4B0082',
            '#FFB6C1',
            '#00008B',
            '#BA55D3',
            '#FFFF00',
            '#0000FF',
            '#9370DB',
            '#FF6347',
            '#008000'
        ]}
        // enablePoints={false}
        pointSize={2}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableSlices="x"
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
}

export function MyPerceptionResponsiveLineBump(props: { data: PerceptionDataProps[] }) {
    return <ResponsiveLine
        data={props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat=" >-.3f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "date",
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 1,
            tickRotation: 0,
            legend: "perception",
            legendOffset: -50,
            legendPosition: 'middle',
            truncateTickAt: 0,
        }}
        // colors={{ scheme: 'pink_yellowGreen' }}
        colors={[
            '#8B4513',
            '#FF69B4',
            '#00BFFF',
            '#7B68EE',
            '#FF7F50',
            '#9ACD32',
            '#FF0000',
            '#00FA9A',
            '#1E90FF',
            '#8A2BE2',
            '#FF4500',
            '#00CED1',
            '#6A5ACD',
            '#FFA500',
            '#00FF00',
            '#4B0082',
            '#FFB6C1',
            '#00008B',
            '#BA55D3',
            '#FFFF00',
            '#0000FF',
            '#9370DB',
            '#FF6347',
            '#008000'
        ]}
        pointSize={2}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableSlices="x"
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
}

export function MyPopResponsiveLineBump(props: { data: PopSalesDataProps[] }) {
    return <ResponsiveLine
        data={props.data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat=" >-.3f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "date",
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 1,
            tickRotation: 0,
            legend: "PopSals",
            legendOffset: -50,
            legendPosition: 'middle',
            truncateTickAt: 0,
        }}
        // colors={{ scheme: 'pink_yellowGreen' }}
        colors={[
            '#8B4513',
            '#FF69B4',
            '#00BFFF',
            '#7B68EE',
            '#FF7F50',
            '#9ACD32',
            '#FF0000',
            '#00FA9A',
            '#1E90FF',
            '#8A2BE2',
            '#FF4500',
            '#00CED1',
            '#6A5ACD',
            '#FFA500',
            '#00FF00',
            '#4B0082',
            '#FFB6C1',
            '#00008B',
            '#BA55D3',
            '#FFFF00',
            '#0000FF',
            '#9370DB',
            '#FF6347',
            '#008000'
        ]}
        pointSize={2}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableSlices="x"
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
}