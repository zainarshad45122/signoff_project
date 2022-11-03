import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import styles from './style';

export default function index(props) {
    const {total, allocated, loaded, delivered} = props;
    const data = [
        {
            key: 1,
            amount: (allocated/total) * 100,
            name : 'Allocated',
            svg: { fill: '#0f293e' },
        },
        {
            key: 2,
            amount: (loaded/total) * 100,
            name : 'Loaded',
            svg: { fill: '#194467' }
        },
        {
            key: 3,
            amount: (delivered/total) * 100,
            name : 'Total',
            svg: { fill: '#236090' }
        },
    ]

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <>
                <Text
                    key={index}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={14}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {data.amount > 0 ? Math.round((data.amount + Number.EPSILON) * 100) / 100 : ''}
                </Text>
                
              </>
            )
        })
    }

    return (
        <PieChart
            style={styles.pieChart}
            valueAccessor={({ item }) => item.amount}
            data={data}
            animate={true}
            animationDuration= {5000}
        >
            <Labels />
        </PieChart>
    );
}
