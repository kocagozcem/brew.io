import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Icon, Form, Picker, Item, Input} from 'native-base';
import colors, * as assetColors from '../../assets/colors';
import {Material} from '../../models/material';
import {SelectedMaterial} from '../../models/selected-material';

interface Props {
  materials: Array<Material>;
  selectedMaterials: Array<SelectedMaterial>;
  materialsSelected: Function;
}

function MaterialSelect(props: Props) {
  const {materials} = props;
  const {selectedMaterials} = props;
  const themeColors = useTheme().colors;

  const [materialList, setMaterialList] = React.useState<Array<Material>>(materials);

  const [selectedMaterialList, setSelectedMaterialList] = React.useState<Array<SelectedMaterial>>(
    selectedMaterials,
  );
  const [selected, setSelected] = React.useState<Material>(
    materialList.filter(
      (val) => selectedMaterialList.filter((mat) => mat.material === val).length <= 0,
    )[0],
  );
  const [amount, setAmount] = React.useState<number>(0);

  function addMaterial() {
    const addedMaterial: SelectedMaterial = {amount, material: selected};
    props.materialsSelected(addedMaterial);
  }

  return (
    <View style={[styles.dialogContainer, {borderColor: themeColors.border}]}>
      <Text style={styles.title}>Select Material</Text>
      {materialList !== undefined ? (
        <Form>
          <Picker
            mode="dropdown"
            iosHeader="Select Material"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: undefined}}
            placeholder="Select Material"
            onValueChange={(val: Material) => setSelected(val)}
            selectedValue={selected}
          >
            {materialList
              .filter(
                (val) => selectedMaterialList.filter((mat) => mat.material === val).length <= 0,
              )
              .map((material) => (
                <Picker.Item label={material.name} value={material} key={material.id} />
              ))}
          </Picker>
        </Form>
      ) : null}
      <View style={styles.amountContainer}>
        <Item style={styles.amountInput}>
          <Input
            keyboardType="number-pad"
            value={String(amount)}
            onChangeText={(text) => setAmount(!isNaN(Number(text)) ? Number(text) : 0)}
            style={styles.amountInput}
          />
        </Item>
        <Text style={styles.unitText}>{selected.unit}</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => addMaterial()}>
        <View style={styles.addButton}>
          <Text style={styles.buttonText}>Add</Text>
        </View>
      </TouchableOpacity>
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
    justifyContent: 'center',
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },

  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  amountInput: {
    width: 50,
  },

  unitText: {
    fontSize: 18,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    backgroundColor: colors.black,
    height: 40,
    borderRadius: 15,
  },

  buttonText: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MaterialSelect;
