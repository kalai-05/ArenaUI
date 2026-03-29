import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import ArenaLogo from './ArenaLogo';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 80;

const BottomTabBar = ({ state, descriptors, navigation }) => {
  const tabs = [
    { name: 'Home', icon: 'home', label: '' },
    { name: 'Search', icon: 'search', label: '' },
    { name: 'Arena', icon: '', label: '', isCenter: true },
    { name: 'Stats', icon: 'analytics', label: '' },
    { name: 'Profile', icon: 'person', label: '' },
  ];

  // SVG Path for the curved tab bar background
  const barWidth = SCREEN_WIDTH;
  const curveWidth = 80;
  const curveHeight = 25;
  
  // D path: M (start) L (before curve) C (curve) L (end) ...
  const path = `
    M 0 20
    L ${barWidth / 2 - curveWidth / 2} 20
    C ${barWidth / 2 - curveWidth / 4} 20, ${barWidth / 2 - curveWidth / 4} 0, ${barWidth / 2} 0
    C ${barWidth / 2 + curveWidth / 4} 0, ${barWidth / 2 + curveWidth / 4} 20, ${barWidth / 2 + curveWidth / 2} 20
    L ${barWidth} 20
    L ${barWidth} ${TAB_BAR_HEIGHT}
    L 0 ${TAB_BAR_HEIGHT}
    Z
  `;

  return (
    <View style={styles.container}>
      <View style={styles.svgWrapper}>
        <Svg width={barWidth} height={TAB_BAR_HEIGHT} viewBox={`0 0 ${barWidth} ${TAB_BAR_HEIGHT}`}>
          <Path
            d={path}
            fill="#1C2431"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        </Svg>
      </View>

      <View style={styles.content}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tab = tabs[index] || { icon: '?', label: route.name };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (tab.isCenter) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.centerTab}
                activeOpacity={0.9}
              >
                <View style={styles.centerButtonOuter}>
                  <View style={styles.centerButtonInner}>
                    <ArenaLogo size={24} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }

          const renderIcon = () => {
             // Basic SVG-like mock for icons based on Figma shapes
             if (tab.icon === 'home') return <View style={[styles.iconBox, { borderColor: isFocused ? '#52B4F5' : '#9CA3AF' }]}><View style={styles.homeRect}/></View>;
             if (tab.icon === 'search') return <View style={[styles.searchIconOuter, { borderColor: isFocused ? '#52B4F5' : '#9CA3AF' }]}><View style={styles.searchIconInner} /></View>;
             if (tab.icon === 'analytics') return <View style={styles.analyticsIcon}><View style={[styles.bar, { height: 12 }]} /><View style={[styles.bar, { height: 18 }]} /><View style={[styles.bar, { height: 15 }]} /></View>;
             if (tab.icon === 'person') return <View style={styles.personIcon}><View style={styles.personHead} /><View style={styles.personBody} /></View>;
             return null;
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.7}
            >
              {renderIcon()}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
    height: TAB_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  svgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20, // To align with the lowered bar
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40, // Pull up into the bump
  },
  centerButtonOuter: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#0A0E1A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#52B4F5',
    shadowColor: '#52B4F5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  centerButtonInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    width: 20,
    height: 18,
    borderWidth: 2,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 2,
  },
  homeRect: {
    width: 8,
    height: 2,
    backgroundColor: '#9CA3AF',
  },
  searchIconOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  searchIconInner: {
    width: 2,
    height: 6,
    backgroundColor: '#9CA3AF',
    transform: [{ rotate: '-45deg' }],
    position: 'absolute',
    bottom: -4,
    right: -2,
  },
  analyticsIcon: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  bar: {
    width: 4,
    backgroundColor: '#9CA3AF',
    borderRadius: 1,
  },
  personIcon: {
    alignItems: 'center',
  },
  personHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9CA3AF',
    marginBottom: 1,
  },
  personBody: {
    width: 18,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9CA3AF',
  },
});

export default BottomTabBar;
