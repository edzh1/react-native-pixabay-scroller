import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.screen);
    };

    const handler = Dimensions.addEventListener('change', onChange);

    return () => handler.remove();
  });

  return {
    ...screenData,
    isLandscape: screenData.width > screenData.height,
  };
};

export default useScreenDimensions;
