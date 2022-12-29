import React from 'react';
import {View, Incubator} from 'react-native-ui-lib';
const {Toast} = Incubator;
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Header from './components/Header';
import ImageList from './components/List';
import {
  selectIsSearchLoading,
  selectError,
} from 'src/redux/search/search.selectors';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {SearchResultDetails} from 'src/redux/search/types';
import {clearError} from 'src/redux/search/search.actions';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({navigation}: Props) {
  const isLoading = useSelector(selectIsSearchLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const onDismiss = () => dispatch(clearError());
  const openDetails = (details: SearchResultDetails) => {
    navigation.navigate('Details', details);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Toast
        visible={!!error}
        position={'top'}
        autoDismiss={3000}
        message={error}
        preset={'failure'}
        onDismiss={onDismiss}
        zIndex={900}
      />
      <View flex>
        <Header />
        <View bg-grey70 flex>
          {!isLoading && <ImageList onPress={openDetails} />}
          {isLoading && (
            <View flex centerH centerV>
              <ActivityIndicator size="large" />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(Home);

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: 'white'},
});
