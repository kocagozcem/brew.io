import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Svg, Line} from 'react-native-svg';

export interface Props {
  val: number;
  max: number;
  size: number;
  stroke?: string;
  textColor?: string;
  lineWidth?: string;
  label?: string;
  labelColor?: string;
  labelSize?: number;
}

const defaultValues: Props = {
  val: 5,
  max: 10,
  size: 60,
  stroke: 'black',
  textColor: '#000',
  lineWidth: '2',
  labelColor: '#000',
  labelSize: 16,
};

function Percantage(props: Props) {
  const {val, max, size, stroke, lineWidth, textColor, labelColor, labelSize} = {
    ...defaultValues,
    ...props,
  };
  const {label} = props;
  const hypot = size;
  return (
    <View style={[styles.container, {width: size}]}>
      <View style={styles.rate}>
        <View style={styles.valContainer}>
          <Text
            style={[
              styles.italic,
              {fontSize: size * 0.3, marginLeft: size * 0.1, color: textColor},
            ]}
          >
            {val}
          </Text>
        </View>
        <View style={styles.maxContainer}>
          <Text
            style={[
              styles.italic,
              {fontSize: size * 0.4, marginRight: size * 0.2, color: textColor},
            ]}
          >
            {max}
          </Text>
        </View>
        <Svg height={hypot} width={hypot * 0.8} style={styles.line}>
          <Line
            x1={size * 0.25}
            y1={hypot - size * 0.25}
            x2={hypot * 0.6}
            y2={size * 0.25}
            stroke={stroke}
            strokeWidth={lineWidth}
          />
        </Svg>
      </View>
      {label !== undefined ? (
        <Text style={[styles.label, {fontSize: labelSize, color: labelColor}]}>{label}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  rate: {
    flexDirection: 'column',
  },
  valContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  maxContainer: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  line: {
    position: 'absolute',
    zIndex: 10,
  },
  italic: {
    fontStyle: 'italic',
  },
  label: {
    textAlign: 'center',
  },
});

export default Percantage;
