import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {Form, Item, Label, Input, Content, Textarea, Icon} from 'native-base';
import {useSelector, RootStateOrAny, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import colors from '../assets/colors';
import {Qualification} from '../models/qualification';
import RateDialog from '../components/rate-dialog/rate-dialog';
import {Material} from '../models/material';
import MaterialSelect from '../components/material-select/material-select';
import Header from '../components/header/header';
import {SelectedMaterial} from '../models/selected-material';
import {Recipe} from '../models/recipe';
import {Item as ItemInterface} from '../models/item';

const qualifications: Array<Qualification> = [
  {name: 'Intensity', value: 1},
  {name: 'Cost', value: 1},
  {name: 'Attainability', value: 1},
];

function CreateRecipeScreen() {
  const [qualificationList, setQualificationList] = React.useState<Array<Qualification>>(
    qualifications,
  );
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [materialModalVisible, setMaterialModalVisible] = React.useState<boolean>(false);
  const [editingQualification, setEditingQualification] = React.useState<Qualification>(
    qualifications[0],
  );
  const materialList = useSelector((state: RootStateOrAny) => state.material);
  const [materials, setMaterials] = React.useState<Array<Material>>([]);
  const [selectedMaterials, setSelectedMaterials] = React.useState<Array<SelectedMaterial>>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [name, setName] = React.useState<string>('');
  const [photo, setPhoto] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const recipeDispatch = useDispatch();
  const navigation = useNavigation();

  React.useEffect(() => {
    setMaterials(materialList.materials);
    setIsLoading(false);
  }, [materials]);

  function openQualificationModal(qualification: Qualification) {
    setEditingQualification(qualification);
    setModalVisible(true);
  }

  function setQualificationValue(qualification: Qualification) {
    let list: Array<Qualification> = qualificationList;
    list = list.map((qual) => (qual.name === qualification.name ? qualification : qual));
    setQualificationList(list);
    setModalVisible(false);
  }

  function submitRecipe() {
    const recipe: Recipe = {
      id: 0,
      name,
      image: photo,
      recipe: description,
      qualifications: qualificationList,
      items: selectedMaterials.map((material) => {
        return {
          amount: `${material.amount} ${material.material.unit}`,
          item: material.material.name,
        } as ItemInterface;
      }),
      rate: '0',
    };
    recipeDispatch({type: 'ADD_RECIPE', value: recipe});
    navigation.goBack();
  }

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  function selectedMaterialItem(selectedMaterial: SelectedMaterial) {
    return (
      <View style={styles.selectedMaterialContainer} key={selectedMaterial.material.id}>
        <View style={styles.selectedMaterialCol}>
          <Text style={styles.selectedMaterialText}>{selectedMaterial.material.name}</Text>
        </View>
        <View style={styles.selectedMaterialCol}>
          <Text style={styles.selectedMaterialText}>
            {`${selectedMaterial.amount} ${selectedMaterial.material.unit}`}
          </Text>
        </View>
        <View style={[styles.selectedMaterialCol, styles.iconRow]}>
          <TouchableOpacity
            onPress={() =>
              setSelectedMaterials(selectedMaterials.filter((val) => val !== selectedMaterial))
            }
          >
            <View>
              <Icon type="FontAwesome" name="times" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header logoFontsize={32} hasBackButton={false} hasCreate={false} />
      <Text style={styles.title}>Create Recipe</Text>
      <ScrollView style={styles.scrollView}>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input value={name} onChangeText={(text) => setName(text)} />
            </Item>
            <Item stackedLabel>
              <Label>Photo URL</Label>
              <Input value={photo} onChangeText={(text) => setPhoto(text)} />
            </Item>
            <View style={styles.qualificationsContainer}>
              {qualificationList.map((val) => (
                <View style={styles.qualificationItem} key={val.name}>
                  <Text style={styles.qualificationLabel}>{val.name}</Text>
                  <TouchableOpacity onPress={() => openQualificationModal(val)}>
                    <View style={styles.qualificationInputContainer}>
                      <Text style={styles.qualificationInput}>{val.value}</Text>
                      <Text
                        style={[styles.qualificationRateLimit, styles.qualificationRateLimitSmall]}
                      >
                        /{' '}
                      </Text>
                      <Text style={styles.qualificationRateLimit}>5</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <Item stackedLabel last>
              <Label>Recipe Description</Label>
              <Textarea
                underline
                rowSpan={5}
                bordered
                style={styles.textArea}
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </Item>
          </Form>
        </Content>
        <View style={styles.materialsContainer}>
          <Text style={styles.subTitle}>Selected Materials</Text>
          {selectedMaterials.map((selectedMat) => selectedMaterialItem(selectedMat))}
          {selectedMaterials.length <= 0 ? (
            <View style={styles.noMaterialContainer}>
              <Text style={styles.noMaterialText}>No Material Selected</Text>
            </View>
          ) : null}
          <TouchableOpacity onPress={() => setMaterialModalVisible(true)}>
            <View>
              <Text style={styles.pressToAddText}>Press to Add</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.createButtonTouchable} onPress={() => submitRecipe()}>
        <View style={styles.createButton}>
          <Text style={styles.createButtonText}>Create</Text>
        </View>
      </TouchableOpacity>

      <Modal animationType="fade" transparent visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <RateDialog
              editingQualification={editingQualification}
              rateChanged={(val: Qualification) => setQualificationValue(val)}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal animationType="fade" transparent visible={materialModalVisible}>
        <View style={styles.modalContainer}>
          <MaterialSelect
            materials={materials}
            selectedMaterials={selectedMaterials}
            materialsSelected={(val: SelectedMaterial) => {
              setSelectedMaterials([...selectedMaterials, val]);
              setMaterialModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
  },

  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 10,
  },

  scrollView: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: 10,
  },

  textArea: {
    alignSelf: 'stretch',
  },

  createButtonTouchable: {
    alignSelf: 'stretch',
    backgroundColor: colors.black,
    borderRadius: 20,
  },

  createButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },

  createButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },

  qualificationsContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingVertical: 10,
  },

  qualificationItem: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qualificationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qualificationInput: {
    maxWidth: 30,
    fontSize: 18,
    textAlign: 'right',
  },

  qualificationLabel: {
    fontSize: 18,
    textAlign: 'center',
  },

  qualificationRateLimit: {
    fontSize: 22,
    marginTop: 40,
  },

  qualificationRateLimitSmall: {
    marginTop: 20,
    fontSize: 30,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.shadow,
  },

  materialsContainer: {
    marginBottom: 30,
  },

  selectedMaterialContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginVertical: 5,
  },

  selectedMaterialCol: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconRow: {
    flex: 1,
  },

  selectedMaterialText: {
    fontSize: 16,
  },

  noMaterialContainer: {},

  noMaterialText: {
    fontSize: 16,
    color: colors.shadow,
    textAlign: 'center',
  },

  pressToAddText: {
    fontSize: 17,
    color: colors.shadow,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default CreateRecipeScreen;
