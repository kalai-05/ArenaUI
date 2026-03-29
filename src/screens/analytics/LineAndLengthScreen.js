import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';
import Header from '../../components/common/Header';
import Dropdown from '../../components/common/Dropdown';
import LineAndLengthComponent from '../../components/match/LineAndLength';
import { lineAndLengthData } from '../../data/mockData';

const LineAndLengthScreen = ({ navigation }) => {
  const bowlers = Object.keys(lineAndLengthData);
  const [selectedBowler, setSelectedBowler] = useState(bowlers[0]);
  const data = lineAndLengthData[selectedBowler];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Header
        title="Line and Length"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Select Bowler</Text>
        <Dropdown
          selectedValue={data.bowler}
          options={Object.values(lineAndLengthData).map(d => d.bowler)}
          onSelect={(selected) => {
            const key = Object.keys(lineAndLengthData).find(
              k => lineAndLengthData[k].bowler === selected
            );
            if (key) setSelectedBowler(key);
          }}
          style={styles.dropdown}
        />

        <LineAndLengthComponent data={data} />
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

export default LineAndLengthScreen;
