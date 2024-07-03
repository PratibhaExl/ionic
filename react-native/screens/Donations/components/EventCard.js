import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card, Text} from 'react-native-paper';
import {FontFamily, Color} from '../../../GlobalStyles';
import {ScaleDimention} from '../../../GlobalStyles';
const {width} = ScaleDimention;
const EventCard = ({title,description,onPress,image}) => {
  return (
    <View style={styles.container}>
      <Card
       onPress={onPress}
        style={{
          width: width - 50,
          height: 180,
          backgroundColor: Color.colorWhitesmoke_100,
        }}>
        <View>
          <Card.Cover
            style={{
              height: 111,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            }}
            source={image}
          />
         
        </View>

        <View style={styles.contentConatiner}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={1} style={styles.title}>{title}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text numberOfLines={1} style={styles.description}>
              {description}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: 'center',
    width: width - 20,
  },
  favoritButton: {position: 'absolute', right: 10, top: 10},
  contentConatiner: {marginHorizontal: 8, paddingBottom: 8},
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: 16,
    fontWeight: '400',
    width: '100%',
    alignItems: 'flex-start',
    color: Color.colorGray_300,
    marginVertical:4
  },
  descriptionContainer: {
    flexDirection: 'column',
  },
  description: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 10,
    fontWeight: '400',
    color: Color.colorGray_300,
    width: '100%',
  },
  price: {
    fontFamily: FontFamily.helvetica,
    fontSize: 14,
    fontWeight: '400',
    width: '10%',
    alignItems: 'flex-end',
    paddingTop: 5,
    color: Color.colorGray_300,
  },
  dateLabel: {
    fontFamily: FontFamily.helveticaLight,
    fontSize: 12,
    fontWeight: '400',
    color: Color.colorGray_300,
  },
});

export default EventCard;
