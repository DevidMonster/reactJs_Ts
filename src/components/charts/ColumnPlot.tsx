import { Column } from '@ant-design/plots';

function ColumnPlot() {
    const data = [
        {
            type: '1-3D',
            value: 0.16,
        },
        {
            type: '4-1D',
            value: 0.125,
        },
        {
            type: '11-30D',
            value: 0.24,
        },
        {
            type: '31-60D',
            value: 0.19,
        },
        {
            type: '1-3D',
            value: 0.22,
        },
        {
            type: '3-10D',
            value: 0.05,
        },
        {
            type: '10-30D',
            value: 0.01,
        },
        {
            type: '30+D',
            value: 0.015,
        },
    ];
    const paletteSemanticRed = '#F4664A';
    const brandColor = '#5B8FF9';
    const config = {
        data,
        xField: 'type',
        yField: 'value',
        seriesField: '',
        color: ({ type }: any) => {
            if (type === '10-30D' || type === '30+D') {
                return paletteSemanticRed;
            }

            return brandColor;
        },
        label: {
            content: (originData: any) => {
                const val = parseFloat(originData.value);

                if (val < 0.05) {
                    return (val * 100).toFixed(1) + '%';
                }
            },
            offset: 10,
        },
        legend: false,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
    };
    return (<Column {...config} />);
}

export default ColumnPlot;