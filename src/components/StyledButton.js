import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { colors, shapes, typography } from '../config/theme';

export const StyledButton = ({ mode = 'contained', style, labelStyle, ...props }) => {
  return (
    <Button
      mode={mode}
      style={[
        styles.button,
        mode === 'contained' && styles.containedButton,
        mode === 'outlined' && styles.outlinedButton,
        style,
      ]}
      labelStyle={[styles.label, labelStyle]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: shapes.borderRadius.md,
    height: shapes.buttonHeight,
  },
  containedButton: {
    backgroundColor: colors.buttonBg,
  },
  outlinedButton: {
    borderColor: colors.buttonBg,
    borderWidth: 2,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.buttonText,
  },
});