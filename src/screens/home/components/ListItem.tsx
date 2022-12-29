import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import Image from 'react-native-image-progress';
import {SearchResult} from 'src/redux/search/types';
import {SearchResultDetails} from 'src/redux/search/types';
import {verticalModeColumns, landscapeModeColumns} from '../sharedConst';

const ListItem = ({
  item,
  onPress,
  isLandscape,
}: {
  item: SearchResult;
  onPress: (details: SearchResultDetails) => void;
  isLandscape: boolean;
}): JSX.Element => {
  return (
    <TouchableHighlight
      onPress={() =>
        onPress({
          id: item.id,
          tags: item.tags,
          largeImageURL: item.largeImageURL,
          user: item.user,
          imageWidth: item.imageWidth,
          imageHeight: item.imageHeight,
        })
      }
      style={[
        isLandscape ? styles.landscapeImageContainer : styles.imageContainer,
      ]}>
      <Image
        source={{uri: item.previewURL}}
        resizeMode={'cover'}
        style={styles.imageThumbnail}
      />
    </TouchableHighlight>
  );
};

export default React.memo(ListItem);

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1 / verticalModeColumns,
  },
  landscapeImageContainer: {
    flex: 1 / landscapeModeColumns,
  },
  imageThumbnail: {
    aspectRatio: 1,
  },
});
