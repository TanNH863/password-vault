import React, { useEffect, useRef } from "react";
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Option {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
}

export default function SegmentedControl({
  options,
  value,
  onChange,
  activeColor,
  inactiveColor = "#000",
  backgroundColor = "#0377BC",
}: SegmentedControlProps) {
  const indicatorX = useRef(new Animated.Value(0)).current;
  const textAnimations = useRef(
    options.map(
      (_, i) => new Animated.Value(value === options[i].value ? 1 : 0)
    )
  ).current;
  const segmentWidth = useRef(0);

  const activeIndex = options.findIndex((o) => o.value === value);

  // Animate highlight movement
  useEffect(() => {
    Animated.spring(indicatorX, {
      toValue: activeIndex * segmentWidth.current,
      useNativeDriver: true,
    }).start();

    // Animate text color change for all segments
    textAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: index === activeIndex ? 1 : 0,
        duration: 200,
        useNativeDriver: false, // color interpolation needs false
      }).start();
    });
  }, [activeIndex]);

  const onLayout = (e: LayoutChangeEvent) => {
    segmentWidth.current = e.nativeEvent.layout.width / options.length;
    indicatorX.setValue(activeIndex * segmentWidth.current);
  };

  return (
    <View
      style={[styles.container, { borderColor: backgroundColor }]}
      onLayout={onLayout}
    >
      <Animated.View
        style={[
          styles.indicator,
          {
            backgroundColor: backgroundColor,
            width: `${100 / options.length}%`,
            transform: [{ translateX: indicatorX }],
          },
        ]}
      />
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.segment,
              {
                backgroundColor: isActive ? backgroundColor : "transparent",
                borderRightWidth:
                  option === options[options.length - 1] ? 0 : 1,
                borderRightColor: backgroundColor,
              },
            ]}
            onPress={() => onChange(option.value)}
          >
            <Text
              style={{
                color: isActive ? activeColor : inactiveColor,
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    borderRadius: 8,
  },
});
