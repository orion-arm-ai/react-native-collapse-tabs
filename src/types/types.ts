import React from "react";
import { FlatList, ScrollView, SectionList, StyleProp, ViewStyle } from "react-native";
import PagerView, { PagerViewProps } from "react-native-pager-view";
import Animated, { AnimatedRef, SharedValue } from "react-native-reanimated";

export type TabName = string;

export type ContainerRef = PagerView;

export type RefComponent =
  | FlatList<any>
  | ScrollView
  | SectionList<any>
  | Animated.ScrollView;

export type TabBarProps<T extends TabName = TabName> = {
  tabNames: T[];
  focusedTab: SharedValue<T>;
  index: SharedValue<number>;
  indexDecimal: SharedValue<number>;
  onTabPress: (name: T) => void;
};

export type HeaderProps<T extends TabName = TabName> = TabBarProps<T>;

export type TabProps<T extends TabName = TabName> = {
  readonly name: T;
  label?: string;
  children: React.ReactNode;
};

export type TabReactElement<T extends TabName = TabName> =
  React.ReactElement<TabProps<T>>;

export type CollapseTabsProps = {
  children: TabReactElement | TabReactElement[];

  /** Initial tab name. Defaults to the first child. */
  initialTabName?: TabName;

  /**
   * Header height. If omitted, it will be measured automatically via onLayout.
   * Pass it explicitly when you need an immediate value before the first layout pass.
   */
  headerHeight?: number;

  /** Fixed tab bar height. Required for MVP. */
  tabBarHeight: number;

  /** Minimum header height when fully collapsed. @default 0 */
  minHeaderHeight?: number;

  renderHeader?: (props: HeaderProps) => React.ReactElement | null;
  renderTabBar?: (props: TabBarProps) => React.ReactElement | null;

  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;

  pagerProps?: Omit<PagerViewProps, "onPageScroll" | "initialPage">;

  onIndexChange?: (index: number) => void;

  /**
   * If true, the header reappears whenever the user scrolls up (regardless of
   * current scroll position), and hides again when scrolling down.
   * If false (default), the header only appears when the list is scrolled to the top.
   * @default false
   */
  revealHeaderOnScrollUp?: boolean;
};

/** Internal context shared between CollapseTabs and its children. */
export type ContextType<T extends TabName = TabName> = {
  headerHeight: number;
  tabBarHeight: number;
  minHeaderHeight: number;
  headerScrollDistance: number;

  tabNames: T[];
  index: SharedValue<number>;
  indexDecimal: SharedValue<number>;
  focusedTab: SharedValue<T>;

  /** Per-tab scroll Y, keyed by tab name. */
  scrollY: SharedValue<Record<T, number>>;

  /** Header translateY (clamped to [-headerScrollDistance, 0]). */
  headerTranslateY: SharedValue<number>;

  setRef: <R extends RefComponent>(
    key: T,
    ref: AnimatedRef<R>
  ) => AnimatedRef<R>;
  refMap: Record<T, AnimatedRef<RefComponent>>;

  containerRef: React.RefObject<ContainerRef>;
};
