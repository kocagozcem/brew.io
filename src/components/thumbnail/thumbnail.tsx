import * as React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Thumbnail() {
  const navigation = useNavigation();
  return (
    <TouchableHighlight onPress={() => navigation.navigate('Details')}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVKNFfQsBHhIZG96azPFrZbb_rfDYeeOEMzA&usqp=CAU',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text lineBreakMode="clip" numberOfLines={1} style={styles.title}>
            Latte matte falan işte
          </Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>4.4</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 3,
    alignSelf: 'stretch',
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  titleContainer: {
    flex: 2,
    alignSelf: 'stretch',
    paddingTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreContainer: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Thumbnail;
