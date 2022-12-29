import React, {useState} from 'react';
import {Button, Incubator, Text, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
const {TextField} = Incubator;
import {fetchSearchResultRequest} from 'src/redux/search/search.actions';
import {selectIsSearchLoading} from 'src/redux/search/search.selectors';
import useScreenDimensions from 'src/hooks/useScreenDimensions';

const searchMinLength = 3;

const Header = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsSearchLoading);
  const [searchQuery, setSearchQuery] = useState('');
  const {isLandscape} = useScreenDimensions();

  return (
    <View style={[isLandscape ? styles.landscape : styles.vertical]}>
      <Text blue50 text50>
        Let's find some pics
      </Text>
      <View row spread centerV>
        <View flex marginR-20>
          <TextField
            placeholder={'what do you want to find?'}
            floatingPlaceholder
            enableErrors
            onChangeText={setSearchQuery}
            validateOnChange
            validate={[(text: string) => text.length >= searchMinLength]}
            validationMessage={[`At least ${searchMinLength} symbols`]}
            maxLength={30}
          />
        </View>
        <Button
          white
          disabled={searchQuery.length < searchMinLength || isLoading}
          background-orange30
          onPress={() => dispatch(fetchSearchResultRequest(searchQuery))}
          label="Search"
          size={Button.sizes.small}
          style={{
            height: 35,
          }}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  vertical: {
    padding: 20,
  },
  landscape: {
    paddingVertical: 20,
  },
});
