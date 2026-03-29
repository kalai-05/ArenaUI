import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const FIELD_SIZE = 240;

const GodsEyeView = ({ onActionPress }) => {
  // Animation refs
  const crosshairWidth = useRef(new Animated.Value(0)).current;
  const crosshairHeight = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const fielderScales = useRef([...Array(10)].map(() => new Animated.Value(0))).current;
  
  // Ball movement animation
  const ballMoveAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const shotLineOpacity = useRef(new Animated.Value(0)).current;
  const shotLineLength = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Crosshair reveal
    Animated.parallel([
      Animated.timing(crosshairWidth, {
        toValue: FIELD_SIZE,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(crosshairHeight, {
        toValue: FIELD_SIZE,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start();

    // 2. Fielder dots staggered
    const fielderAnimations = fielderScales.map((anim, i) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: i * 50,
        useNativeDriver: true,
      })
    );
    Animated.parallel(fielderAnimations).start();

    // 3. Ball sonar pulse loop (Only if NOT moving)
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // 4. Batsman glow pulse loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 5. Trigger a "Boundary Shot" animation on mount (Demonstration)
    triggerShotAnimation();
  }, []);

  const triggerShotAnimation = () => {
    // Reset
    ballMoveAnim.setValue({ x: 0, y: 0 });
    shotLineOpacity.setValue(0);
    shotLineLength.setValue(0);

    // Target a specific boundary point (e.g., Mid-wicket)
    const targetX = FIELD_SIZE * 0.45;
    const targetY = FIELD_SIZE * -0.3;

    Animated.sequence([
      Animated.delay(1000), // Wait for field to setup
      Animated.parallel([
        Animated.timing(ballMoveAnim, {
          toValue: { x: targetX, y: targetY },
          duration: 800,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(shotLineOpacity, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(shotLineLength, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true, // Matched with others in this parallel group
        })
      ])
    ]).start();
  };

  const sonarScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  const sonarOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const batsmanOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1.0],
  });

  // Fixed fielder positions for realism
  const fielderPositions = [
    { top: '25%', left: '30%' },
    { top: '20%', left: '65%' },
    { top: '40%', left: '85%' },
    { top: '70%', left: '80%' },
    { top: '85%', left: '50%' },
    { top: '75%', left: '20%' },
    { top: '50%', left: '10%' },
    { top: '35%', left: '15%' },
    { top: '15%', left: '45%' },
    { top: '45%', left: '70%' },
  ];

  const renderWeatherChip = (label) => (
    <View style={styles.weatherChip}>
      <Text style={styles.weatherText}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>God’s Eye View</Text>

      {/* Weather Bar */}
      <View style={styles.weatherBar}>
        {renderWeatherChip('☀️ 20°C')}
        {renderWeatherChip('💧 63%')}
        {renderWeatherChip('🌧 9%')}
      </View>

      <View style={styles.fieldSection}>
        <View style={styles.fieldWrapper}>
          {/* Boundary Labels */}
          <Text style={[styles.label, styles.topLabel]}>76m</Text>
          <Text style={[styles.label, styles.rightLabel]}>73m</Text>
          <Text style={[styles.label, styles.bottomLeftLabel]}>78m</Text>
          <Text style={[styles.label, styles.bottomRightLabel]}>78m</Text>

          <View style={styles.fieldBackground}>
            {/* Outer Circle (Boundary) */}
            <View style={styles.outerCircle} />
            
            {/* Inner Circle (30 Yard) */}
            <View style={styles.innerCircle} />

            {/* Crosshair Axis Lines */}
            <Animated.View style={[styles.crosshairV, { height: crosshairHeight }]} />
            <Animated.View style={[styles.crosshairH, { width: crosshairWidth }]} />

            {/* Fielder Dots */}
            {fielderPositions.map((pos, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.fielderDot,
                  pos,
                  { transform: [{ scale: fielderScales[i] }] },
                ]}
              />
            ))}

            {/* Batsman Diamonds (At center) */}
            <Animated.View style={[styles.batsmanGroup, { opacity: batsmanOpacity }]}>
              <View style={[styles.diamond, styles.diamondTop]} />
              <View style={[styles.diamond, styles.diamondBottom]} />
            </Animated.View>

            {/* Shot Path Line */}
            <Animated.View style={[
              styles.shotPath,
              {
                width: FIELD_SIZE * 0.55,
                opacity: shotLineOpacity,
                transform: [
                  { translateX: FIELD_SIZE * 0.22 },
                  { translateY: FIELD_SIZE * -0.15 },
                  { rotate: '-32deg' },
                  { scaleX: shotLineLength }
                ]
              }
            ]} />

            {/* Ball Marker + Sonar Pulse */}
            <Animated.View style={[
              styles.ballAnchor,
              {
                transform: [
                  { translateX: ballMoveAnim.x },
                  { translateY: ballMoveAnim.y }
                ]
              }
            ]}>
              <Animated.View
                style={[
                  styles.sonarRing,
                  {
                    transform: [{ scale: sonarScale }],
                    opacity: sonarOpacity,
                  },
                ]}
              />
              <View style={styles.ballInner} />
            </Animated.View>
          </View>
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabRow}>
          <TouchableOpacity style={styles.tabButton} onPress={() => onActionPress?.('Playing XI')}>
            <Text style={styles.tabText}>Playing XI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={() => onActionPress?.('Wagon Wheel')}>
            <Text style={styles.tabText}>Wagon Wheel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton} onPress={() => onActionPress?.('Line/Length')}>
            <Text style={styles.tabText}>Line/Length</Text>
          </TouchableOpacity>
        </View>

        {/* Stadium Info Bar */}
        <View style={styles.stadiumBar}>
          <Text style={styles.stadiumText}>🏟 Narendra Modi Stadium</Text>
          <TouchableOpacity onPress={() => onActionPress?.('Pitch Report')}>
            <Text style={styles.pitchText}>Pitch Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  weatherBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  weatherChip: {
    backgroundColor: '#1C1F2E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  weatherText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  fieldSection: {
    backgroundColor: '#141725',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  fieldWrapper: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fieldBackground: {
    width: FIELD_SIZE,
    height: FIELD_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  outerCircle: {
    position: 'absolute',
    width: FIELD_SIZE,
    height: FIELD_SIZE,
    borderRadius: FIELD_SIZE / 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  innerCircle: {
    position: 'absolute',
    width: FIELD_SIZE * 0.6,
    height: FIELD_SIZE * 0.6,
    borderRadius: (FIELD_SIZE * 0.6) / 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  crosshairV: {
    position: 'absolute',
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  crosshairH: {
    position: 'absolute',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  label: {
    position: 'absolute',
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
  },
  topLabel: {
    top: 0,
  },
  rightLabel: {
    right: 20,
    top: '50%',
    marginTop: -6,
  },
  bottomLeftLabel: {
    bottom: 0,
    left: 40,
  },
  bottomRightLabel: {
    bottom: 0,
    right: 40,
  },
  fielderDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#64748B',
    opacity: 0.8,
  },
  shotPath: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#52B4F5',
    borderRadius: 1,
    zIndex: 1,
  },
  batsmanGroup: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diamond: {
    width: 10,
    height: 10,
    backgroundColor: '#448AFF',
    transform: [{ rotate: '45deg' }],
  },
  diamondTop: {
    marginBottom: 2,
  },
  ballAnchor: {
    position: 'absolute',
    top: '55%',
    left: '48%',
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E040FB',
    zIndex: 2,
  },
  sonarRing: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E040FB',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 10,
  },
  tabButton: {
    flex: 1,
    backgroundColor: '#1C1F2E',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  tabText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  stadiumBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  stadiumText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  pitchText: {
    color: '#FFFFFF',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default GodsEyeView;
