

import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Color, FontFamily } from '../../GlobalStyles';

const SearchListItem = ({ title, date, src, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {src ? <Image
        style={styles.image}
        resizeMode="cover"
        source={src}
      /> : null}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ height: 15, width: 15, marginRight: 5 }}
            resizeMode="cover"
            source={require('../../assets/images/Calendar.png')}
          /><Text style={{ color: Color.colorDimgray_200 }}>{date}</Text>
        </View>
      </View>
      <Image
        style={styles.icon}
        resizeMode="contain"
        source={require('../../assets/images/Down5.png')}
      />
    </TouchableOpacity>
  );
};

export default SearchListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: Color.colorDarkgray_100,
    paddingVertical: 15,
    marginHorizontal: 15,
    justifyContent:'center'
  },
  icon: {
    height: 22,
    width: 22,
    marginVertical: 4
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: 16,
    color: Color.colorGray_300,
    marginBottom: 5,
  },
  description: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 12,
    color: Color.colorDimgray_200,
  },
  time: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 12,
    color: Color.colorDarkred_100,
  },
  image: {
    width: 57,
    height: 59,
    borderRadius: 5,
  },
});

