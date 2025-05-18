import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.6;
const CARD_GAP = 20;

const demoList = [
  {
    _id: "1",
    Title: "First Slide",
    About: "This is the first demo slide card with some description.",
    image: "https://socket.hindwana.com/public/Images/c98894133e9f581a95674c5d130c0503",
  },
  {
    _id: "2",
    Title: "Second Slide",
    About: "This is the second demo slide card with some more text.",
    image: "https://socket.hindwana.com/public/Images/37424d04e8e0100179fb028581b0c489",
  },
  {
    _id: "3",
    Title: "Third Slide",
    About: "This is the third demo slide card content here.",
    image: "https://socket.hindwana.com/public/Images/124e6e83156de6efc5c605a9d05bf056",
  },
  {
    _id: "4",
    Title: "Fourth Slide",
    About: "This is the fourth demo slide card content here.",
    image: "https://socket.hindwana.com/public/Images/c893fbd932729dd22572f434e7f43308",
  },
];

const ActiveSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  const goToSlide = (direction) => {
    Animated.timing(animation, {
      toValue: direction,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      const newIndex =
        direction === 1
          ? (activeIndex + 1) % demoList.length
          : (activeIndex - 1 + demoList.length) % demoList.length;
      setActiveIndex(newIndex);
      animation.setValue(0);
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -50) goToSlide(1); // swipe left
        else if (gesture.dx > 50) goToSlide(-1); // swipe right
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {demoList.map((card, index) => {
        const isActive = index === activeIndex;
        const isPrev = index === (activeIndex - 1 + demoList.length) % demoList.length;
        const isNext = index === (activeIndex + 1) % demoList.length;

        let transformStyle = {};
        if (isActive) {
          transformStyle = {
            transform: [{ scale: 1 }, { translateX: 0 }],
            zIndex: 10,
          };
        } else if (isPrev) {
          transformStyle = {
            transform: [{ scale: 0.9 }, { translateX: -CARD_WIDTH - CARD_GAP }],
            zIndex: 5,
          };
        } else if (isNext) {
          transformStyle = {
            transform: [{ scale: 0.9 }, { translateX: CARD_WIDTH + CARD_GAP }],
            zIndex: 5,
          };
        } else {
          transformStyle = {
            transform: [{ scale: 0.75 }],
            opacity: 0,
            zIndex: 0,
          };
        }

        return (
          <Animated.View key={card._id} style={[styles.card, transformStyle]}>
            <Image source={{ uri: card.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{card.Title}</Text>
              <Text style={styles.about} numberOfLines={3}>
                {card.About}
              </Text>
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  card: {
    position: "absolute",
    width: CARD_WIDTH,
    height: 360,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "65%",
    resizeMode: "cover",
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  about: {
    fontSize: 14,
    color: "#555",
  },
});

export default ActiveSlider;
