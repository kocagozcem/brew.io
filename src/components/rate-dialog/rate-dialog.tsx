import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon} from 'native-base';
import {Qualification} from '../../models/qualification';
import * as assetColors from '../../assets/colors';

interface Props {
  editingQualification: Qualification;
  rateChanged: Function;
}

function RateDialog(props: Props) {
  const {editingQualification} = props;
  const {rateChanged} = props;
  const {colors} = useTheme();
  const [rate, setRate] = React.useState(editingQualification.value);

  function setQualifications(val: number) {
    const qualification: Qualification = {...editingQualification, value: val};
    setRate(val);
    rateChanged(qualification);
  }

  return (
    <View style={[styles.dialogContainer, {borderColor: colors.border}]}>
      <Text style={styles.title}>{`Select ${editingQualification.name} Rate`}</Text>
      <View style={styles.rateContainer}>
        {[1, 2, 3, 4, 5].map((val) => (
          <View key={val}>
            <TouchableOpacity onPress={() => setQualifications(val)}>
              <Icon
                key={val}
                type="MaterialCommunityIcons"
                style={styles.rateIcon}
                name={rate >= val ? 'coffee' : 'coffee-outline'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dialogContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 15,
    padding: 30,
    paddingTop: 15,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: assetColors.default.white,
  },

  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  rateIcon: {
    fontSize: 38,
    marginHorizontal: 5,
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },
});

export default RateDialog;
