import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import Dropdown from '../../components/common/Dropdown';
import WagonWheelComponent from '../../components/match/WagonWheel';
import { wagonWheelData } from '../../data/mockData';

const WagonWheelScreen = ({ navigation }) => {
  const batsmen = Object.keys(wagonWheelData);
  const [selectedBatsman, setSelectedBatsman] = useState(batsmen[0]);
  const data = wagonWheelData[selectedBatsman];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header
        title="Wagon Wheel"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Select Batsmen</Text>
        <Dropdown
          selectedValue={data.batsman}
          options={Object.values(wagonWheelData).map(d => d.batsman)}
          onSelect={(selected) => {
            const key = Object.keys(wagonWheelData).find(
              k => wagonWheelData[k].batsman === selected
            );
            if (key) setSelectedBatsman(key);
          }}
          style={styles.dropdown}
        />

        <WagonWheelComponent data={data} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.huge,
  },
  sectionLabel: {
    color: colors.textPrimary,
    ...typography.label,
    paddingHorizontal: spacing.screenPaddingH,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  dropdown: {
    paddingHorizontal: spacing.screenPaddingH,
  },
});

export default WagonWheelScreen;
