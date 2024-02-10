import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, View, Dimensions, FlatList } from "react-native";

interface CarouselItem {
  id: string;
  image: number;
}

const PromotionSlider: React.FC = () => {
  const flatlistRef = useRef<FlatList<CarouselItem>>(null);
  const screenWidth = Dimensions.get("window").width - 28;
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselData: CarouselItem[] = [
    {
      id: "01",
      image: require('../../../assets/slider_1.jpg'),
    },
    {
      id: "02",
      image: require('../../../assets/slider_2.jpg'),
    },
    {
      id: "03",
      image: require('../../../assets/slider_3.jpg'),
    },
  ];

  useEffect(() => {
    let interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % carouselData.length;

      flatlistRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, carouselData.length]);

  const getItemLayout = (_: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const handleManualSwipe = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);

    setActiveIndex(index);
  };

  const renderItem = ({ item, index }: { item: CarouselItem; index: number }) => {
    return (
      <View key={item.id} style={{ width: screenWidth}}>
        <View>
          <Image source={item.image} style={{ height: 200, width: screenWidth, borderRadius: 10}} />
        </View>
      </View>
    );
  };

  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => (
      <View
        key={index}
        style={{
          backgroundColor: index === activeIndex ? "#FD3510" : "rgba(0, 0, 0, 0.1)",
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      />
    ));
  };

  return (
    <View>
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleManualSwipe}
        keyboardDismissMode="on-drag"
        style={{ borderRadius: 10}}
      />

      <View style={styles.dotIndicatorsContainer}>
        {renderDotIndicators()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotIndicatorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8
  },
});

export default PromotionSlider;
