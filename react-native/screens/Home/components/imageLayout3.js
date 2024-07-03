import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontFamily } from "../../../GlobalStyles";
import { ScaleDimention } from '../../../GlobalStyles';
import { getImageFullPath } from '../../../utils';

const { height, width } = ScaleDimention;

const ImageLayoutTwoAboveOne = ({ imagePath, images, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
		<View style={{flexDirection:'row'}}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image2}
          resizeMode="cover"
          source={getImageFullPath(imagePath, images[0])}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image2}
          resizeMode="cover"
          source={getImageFullPath(imagePath, images[1])}
        />
      </View>
	  </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image3}
          resizeMode="cover"
          source={getImageFullPath(imagePath, images[2])}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image2: {
    width:( width-10) / 2,
    height: 125, // Adjust height as needed
    marginVertical: 2,
	marginHorizontal:5
  },
  image3: {
    width: width-5 /1,
    height: 145, // Adjust height as needed
    marginVertical: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500',
    fontFamily: FontFamily.Montserrat,
  },
});

export default ImageLayoutTwoAboveOne;
