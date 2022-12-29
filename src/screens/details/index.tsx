import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, Text, View, Badge} from 'react-native-ui-lib';
import Image from 'react-native-image-progress';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'src/navigation/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import useScreenDimensions from 'src/hooks/useScreenDimensions';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

function Details({route, navigation}: Props) {
  const {tags, largeImageURL, user, imageWidth, imageHeight} = route.params;
  const {isLandscape} = useScreenDimensions();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View>
          <View style={[isLandscape ? styles.landscape : styles.vertical]}>
            <Text blue50 text50>
              Here is your image
            </Text>
            <View marginT-20 left>
              <Button
                white
                background-orange30
                onPress={navigation.goBack}
                label="Go back"
                size={Button.sizes.small}
              />
            </View>
          </View>

          <View bg-grey70 flex>
            <Image
              source={{uri: largeImageURL}}
              resizeMode={'cover'}
              style={styles.imageThumbnail}
            />

            <View padding-20>
              <View row centerV>
                <Text text60>Tags:</Text>
                {tags.split(', ').map(tag => (
                  <Badge key={tag} label={tag} size={18} />
                ))}
              </View>
              <Text>
                <Text text60>Username:</Text>
                <Text> {user}</Text>
              </Text>
              <Text>
                <Text text60>Resolution:</Text>
                <Text>
                  {' '}
                  {imageWidth}x{imageHeight}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default React.memo(Details);

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1 / 3,
  },
  imageThumbnail: {
    aspectRatio: 1,
  },
  tag: {
    backgroundColor: 'lightblue',
    padding: 2,
    color: 'white',
    borderRadius: 5,
    marginLeft: 5,
  },
  vertical: {
    padding: 20,
  },
  landscape: {
    paddingVertical: 20,
  },
  safeArea: {flex: 1, backgroundColor: 'white'},
});
