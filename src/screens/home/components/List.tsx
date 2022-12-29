import React from 'react';
import {FlatList} from 'react-native';
import {SearchResult} from 'src/redux/search/types';
import {SearchResultDetails} from 'src/redux/search/types';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIsSearchLoadingMore,
  selectSearchPage,
  selectSearchResults,
  selectSearchQuery,
  selectSearchHasMore,
} from 'src/redux/search/search.selectors';
import {fetchMoreSearchResultRequest} from 'src/redux/search/search.actions';
import useScreenDimensions from 'src/hooks/useScreenDimensions';
import ListItem from './ListItem';
import {verticalModeColumns, landscapeModeColumns} from '../sharedConst';
import {Text, View} from 'react-native-ui-lib';

const getKey = (item: SearchResult) => {
  return item.id.toString();
};

const Footer = ({text}: {text: string}) => (
  <View center margin-20>
    <Text orange40 text60>
      {text}
    </Text>
  </View>
);

function ImageList({
  onPress,
}: {
  onPress: (details: SearchResultDetails) => void;
}) {
  const dispatch = useDispatch();
  const page = useSelector(selectSearchPage);
  const hasMore = useSelector(selectSearchHasMore);
  const isLoadingMore = useSelector(selectIsSearchLoadingMore);
  const searchQuery = useSelector(selectSearchQuery);
  const searchResult = useSelector(selectSearchResults);
  const searchNotInitialized = !searchQuery;
  const canFetchMoreOnScroll = !isLoadingMore && !hasMore;
  const {isLandscape} = useScreenDimensions();
  const fetchMore = () => {
    if (!isLoadingMore && hasMore) {
      dispatch(
        fetchMoreSearchResultRequest({
          page: page + 1,
          searchQuery,
        }),
      );
    }
  };

  return (
    <FlatList
      numColumns={isLandscape ? landscapeModeColumns : verticalModeColumns}
      data={searchResult.hits}
      renderItem={({item}: {item: SearchResult}) => (
        <ListItem item={item} onPress={onPress} isLandscape={isLandscape} />
      )}
      keyExtractor={(item: SearchResult) => getKey(item)}
      onEndReachedThreshold={0.2}
      onEndReached={fetchMore}
      ListFooterComponent={() =>
        searchNotInitialized ? (
          <Footer text={'Try to search something'} />
        ) : canFetchMoreOnScroll ? (
          <Footer text={'No more results available'} />
        ) : null
      }
      key={isLandscape ? 'h' : 'v'}
    />
  );
}

export default React.memo(ImageList);
