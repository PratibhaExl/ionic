import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  FontFamily,
  Color,
  FontSize,
  Border,
  ScaleDimention,
} from '../../GlobalStyles';
import Banner from '../Album/components/banner'; //'./components/banner';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../../components/commonButton';
import DropdownComponent from '../../components/commonDropdown';
import CustomInnerInput from '../../components/commonInputInnerInput';
import { Controller, useForm } from 'react-hook-form';
import { get, inner_Post } from '../../services/api';
import { useSelector } from 'react-redux';
import { COUNTRY, TRANSACTION_EVENT } from '../../services/config';
import { showToast } from '../../utils';
import { useTranslation } from 'react-i18next';
import Loader from '../../components/loader';
import CustomInnerPhoneInput from '../../components/contact_eventBooking';
const { height, width } = ScaleDimention;

const categoryList = [
  { label: 'Personal', value: 'Personal' },
  { label: 'Company', value: 'Company' },
  { label: 'Association', value: 'Association' },
];
const EventDetailsPayment = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const session = useSelector(state => state.session);
  const config = useSelector(state => state.config.configUrls);
  const [inputValues, setInputValues] = useState(['']); // Store input values
  const [isLoading, setIsLoading] = useState(false);
  const [countryList,setcountryList]=useState([])
  const route = useRoute();
  const { _id, dataPay } = route.params;

  const handleChangeText = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);
  };

  useEffect(() => {
    if (session.isLoggedIn && config) {
      fetchCountryList();
    }
  }, []);

  const fetchCountryList = async () => {
    const _countryList = await get(
      `${config?.UrlBasePath}/${COUNTRY}`,
      session?.user?.token,
    );
    setcountryList(_countryList.country);
  };


  const _onSubmit = async data => {
    console.log('data---', data);
    const payload = {
      Event: _id,
      Name: data.name,
      Address: data.Address,
      PostalCode: data.Postal,
      Country: data.Country,
      ContactNumber: data.Contact,
      Category:null,   //data.category?,
      NumberOfParticipants: data.NumberOfParticipants,
    };

    setIsLoading(true);

    const postEventData = await inner_Post(
      `${config?.UrlBasePath}/${TRANSACTION_EVENT}`,
      session?.user?.token,
      payload,
    );
    if (postEventData.success) {
      reset();
      navigation.navigate('EventDetailsPaymentQr');

    }
    showToast('success', postEventData.message);

    setIsLoading(false);
  };


  return (
    <SafeAreaView style={{ flex: 1, width: width }}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerConatiner}>
        <Image
          style={styles.backIcon}
          resizeMode="cover"
          source={require('../../assets/images/iconexlightleft-2.png')}
        />
        <Text style={styles.events1}>{dataPay.events?.name}</Text>
      </TouchableOpacity>
      <ScrollView
        style={{
          width: width,
          flex: 1,
        }}
        contentContainerStyle={styles.container} keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
        {/*Main Content  */}
        <View style={{ width: width }}>
          <Banner banner={dataPay?.events?.images} />
          {isLoading && <Loader />}
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>

              <CustomInnerInput
                style={styles.input}
                control={control}
                name="NumberOfParticipants"
                rules={{
                  required: t(
                    'screens.EventPayment.Number Of Participants is required',
                  ),
                  validate: value => {
                    // Regular expression to match only numbers
                    const numberPattern = /^[0-9]*$/;

                    // Check if the value matches the number pattern
                    if (!numberPattern.test(value)) {
                      return t('screens.EventPayment.Please enter only numbers');
                    }

                    const numericValue = parseInt(value);
                    console.log(!isNaN(numericValue) && numericValue >= dataPay.availableseat, 'value---', value, dataPay.availableseat)
                    if (!isNaN(numericValue) && numericValue > dataPay.availableseat) {
                      return t('screens.EventPayment.Number of Participants cannot exceed') + `${' '}${dataPay.availableseat}`;
                    }
                    return true;
                  },
                }}
                errors={errors}
                placeholder={t('screens.EventPayment.No. of participants')}
                textContentType="telephoneNumber"
              />

              <CustomInnerInput
                style={styles.input}
                control={control}
                name="name"
                rules={{ required: t('screens.EventPayment.Name is required') }}
                errors={errors}
                placeholder={`Name`}
              />

              <CustomInnerInput
                style={styles.input}
                placeholder={t('screens.EventPayment.Address')}
                control={control}
                name="Address"
                rules={{
                  required: t('screens.EventPayment.Address is required'),
                }}
                errors={errors}
              />
              <CustomInnerInput
                style={styles.input}
                placeholder={t('screens.EventPayment.Postal Code')}
                control={control}
                name="Postal"
                rules={{
                  required: t('screens.EventPayment.Postal Code is required'),
                }}
                errors={errors}
              />
              <Controller
                control={control}
                name="Country" // Field name for React Hook Form
                rules={{
                  required: t('screens.EventPayment.Country is required'),
                }} // Add validation rules if needed
                render={({ field }) => (
                  <DropdownComponent
                    data={countryList}
                    placeholder={t('screens.EventPayment.Country')}
                    onSelect={field.onChange}
                    type="profile"
                    error={errors.Country}
                    valueField='country_name'
                    labelField='country_name'
                    search={true}
                  />
                )}
              />
              <CustomInnerPhoneInput
                style={styles.input}
                placeholder={t('screens.EventPayment.Contact No.')}
                control={control}
                name="Contact"
                rules={{
                  required: t('screens.EventPayment.Contact No is required'),
                  pattern: {
                    value: /^\d+$/, // Regex pattern for digits only
                    message:  t('screens.SignUp.Enter valid mobile number'),
                  },
                  maxLength: {
                    value: 11,
                    message: t('screens.SignUp.Enter valid mobile number'),
                  },
                }}
                errors={errors}
                textContentType="telephoneNumber"
              />
            </View>
          </View>
        </View>
        {/* bottom content */}
      </ScrollView>
      <View style={styles.buttonsConatiner}>
        {/* <View style={styles.L1Button}>
          <Text style={styles.totalLBl}>Total Price</Text>
          <Text style={styles.price}>
            {`$50/`}
            <Text style={styles.person}>person</Text>
          </Text>
        </View> */}
        <CustomButton onPress={handleSubmit(_onSubmit)} style={styles.L2Button}>
          <Text style={styles.L2ButtonLbl}>
            {t('screens.EventPayment.Submit')}
          </Text>
        </CustomButton>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Border.br_8xs,

    justifyContent: 'space-between',
  },
  headerConatiner: {
    flexDirection: 'row',
    marginTop: '5%',
    marginLeft: '5%',
    alignItems: 'flex-start',
    width: width,
    marginBottom: 15
  },
  backIcon: {
    width: '30%',
    height: 24,
    width: 24,
    marginRight: 10
  },

  events1: {
    fontSize: FontSize.size_mini,
    fontWeight: '400',
    color: Color.colorGray_300,
    fontFamily: FontFamily.helvetica,
    textAlign: 'left',
    justifyContent: 'center',
  },

  contentContainer: {
    alignItems: 'center',
    width: width,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: 8,
    paddingTop: 10,
    backgroundColor: Color.colorWhitesmoke_100,
    marginBottom: 15,
  },
  titleContainer: {
    width: width - 40,
    justifyContent: 'center',
    marginVertical: 10,
    paddingTop: 15,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_xl,
    lineHeight: 23,
    fontWeight: '400',
    alignSelf: 'center',
    color: Color.colorGray_300,
  },

  selectDuration: {
    fontFamily: FontFamily.helvetica,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 20,
    paddingVertical: 10,
  },
  input: {
    height: 55,
    width: 282,
    marginBottom: 20,
  },
  addMore: {
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 26,
    width: 105,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  addMoreLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_sm,
    fontWeight: '400',
    lineHeight: 16,
    width: '80%',
    textAlign: 'center',
  },
  pluslbl: {
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorDimgray_200,
    fontSize: 10,
    fontWeight: '400',
  },

  plusContainer: {
    width: 15,
    height: 15,
    backgroundColor: Color.colorWhitesmoke_100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 5,
  },

  totalLBl: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_mini,
    lineHeight: 17,
    fontWeight: '400',
    color: Color.colorGray_300,
    marginBottom: 5,
  },

  price: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_xl,
    lineHeight: 23,
    fontWeight: '700',
    color: Color.colorGray_300,
    paddingTop: 5,
  },
  person: {
    fontFamily: FontFamily.helvetica,
    fontSize: FontSize.size_base,
    lineHeight: 18,
    fontWeight: '400',
    color: Color.colorGray_100,
  },

  buttonsConatiner: {
    shadowRadius: 4, // Shadow radius
    elevation: Platform.OS === 'android' ? 4 : undefined, // Elevation for Android
    shadowOpacity: Platform.OS === 'ios' ? 0.4 : undefined,
    width: width + 10,
    flexDirection: 'row',
    height: 82,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderTopColor: Color.colorDarkgray_100,
  },

  L1Button: {
    borderRadius: Border.br_3xs,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },

  L2Button: {
    backgroundColor: Color.colorDarkred_100,
    borderRadius: Border.br_3xs,
    height: 55,
    width: 197,
  },

  L2ButtonLbl: {
    fontFamily: FontFamily.helvetica,
    color: Color.colorWhitesmoke_100,
    fontSize: FontSize.size_xl,
    fontWeight: '400',
    lineHeight: 23,
  },
});

export default EventDetailsPayment;
