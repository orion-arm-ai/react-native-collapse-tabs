import React, { useEffect } from "react";
import { SectionList as RNSectionList, SectionListProps, DefaultSectionT } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useTabsContext } from "./hooks";

type Props<ItemT, SectionT = DefaultSectionT> = SectionListProps<ItemT, SectionT> & {
  name: string;
};

const AnimatedSectionList = Animated.createAnimatedComponent(
  RNSectionList,
) as unknown as React.ComponentType<SectionListProps<any, any> & { ref?: any }>;

export function SectionList<ItemT, SectionT = DefaultSectionT>({
  name,
  contentContainerStyle,
  onScroll: userOnScroll,
  ...rest
}: Props<ItemT, SectionT>) {
  const {
    headerHeight,
    tabBarHeight,
    scrollY,
    focusedTab,
    setRef,
  } = useTabsContext();

  const ref = useAnimatedRef<RNSectionList<ItemT, SectionT>>();

  useEffect(() => {
    setRef(name, ref as any);
  }, [name, ref, setRef]);

  const handler = useAnimatedScrollHandler(
    {
      onScroll: (event) => {
        if (focusedTab.value === name) {
          const map = { ...scrollY.value };
          map[name] = event.contentOffset.y;
          scrollY.value = map;
        }
        if (userOnScroll) {
          if ((userOnScroll as any).worklet === true) {
            (userOnScroll as any)(event);
          } else {
            runOnJS(userOnScroll as any)(event);
          }
        }
      },
    },
    [name, userOnScroll],
  );

  return (
    <AnimatedSectionList
      {...(rest as SectionListProps<ItemT, SectionT>)}
      ref={ref as any}
      onScroll={handler}
      scrollEventThrottle={16}
      contentContainerStyle={[
        { paddingTop: headerHeight + tabBarHeight },
        contentContainerStyle,
      ]}
    />
  );
}
