import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, typography } from '../config/theme';

export const StyledText = ({ variant = 'body', style, ...props }) => {
  return (
    <Text style={[styles[variant], style]} {...props} />
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  h2: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.text,
  },
  h3: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
  },
  body: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.regular,
    color: colors.text,
  },
  caption: {
    fontSize: typography.sizes.sm,
    color: colors.subtext,
  },
});