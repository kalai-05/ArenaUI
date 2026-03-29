import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';
import { spacing } from '../../styles/spacing';

const Dropdown = ({
  label,
  selectedValue,
  options = [],
  onSelect,
  placeholder = 'Select...',
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={styles.selectedText}>
          {selectedValue || placeholder}
        </Text>
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.optionsList}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                index !== options.length - 1 && styles.optionBorder,
              ]}
              onPress={() => handleSelect(option)}
            >
              <Text style={styles.optionText}>
                {typeof option === 'string' ? option : option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    zIndex: 10,
  },
  label: {
    color: colors.textSecondary,
    ...typography.label,
    marginBottom: spacing.sm,
  },
  selector: {
    backgroundColor: colors.inputBackground,
    borderRadius: spacing.inputRadius,
    paddingHorizontal: spacing.inputPaddingH,
    paddingVertical: spacing.inputPaddingV,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedText: {
    color: colors.textPrimary,
    ...typography.body,
    flex: 1,
  },
  arrow: {
    color: colors.textSecondary,
    fontSize: 10,
    marginLeft: spacing.sm,
  },
  optionsList: {
    backgroundColor: colors.inputBackground,
    borderRadius: spacing.inputRadius,
    marginTop: 2,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 20,
  },
  option: {
    paddingHorizontal: spacing.inputPaddingH,
    paddingVertical: spacing.md,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    color: colors.textPrimary,
    ...typography.body,
  },
});

export default Dropdown;
