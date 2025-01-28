// src/config/theme.js

// Soothing colors optimized for autism and ADHD
const colors = {
    // Primary colors
    primary: '#7CB9E8',    // Soft Sky Blue - Main brand color
    secondary: '#B4CFB0',  // Sage Green - Secondary brand color
    tertiary: '#E6E6FA',   // Soft Lavender - Tertiary brand color

    // Background colors
    background: '#F7F9FC', // Very Light Blue-Grey
    surface: '#FFFFFF',    // Pure White
    cardBg: '#F0F4F8',    // Soft Grey-Blue

    // Accent colors
    accent1: '#C5E0DC',   // Pale Aqua
    accent2: '#D8E2DC',   // Light Grey-Green
    accent3: '#E8E8E8',   // Light Grey

    // Text colors
    text: '#2F4858',      // Dark Blue-Grey
    subtext: '#6B7C93',   // Medium Grey-Blue

    // Functional colors
    success: '#9CC69B',   // Muted Green
    warning: '#E6C79C',   // Soft Orange
    error: '#E6A5A5',     // Muted Red
    info: '#A5C5E6',      // Soft Blue

    // Category colors
    focus: '#B5C7E7',     // Soft Blue
    memory: '#C7DCD0',    // Soft Green
    planning: '#D4E2D4',  // Light Sage
    impulse: '#E6DBD0',   // Soft Beige

    // Interactive elements
    buttonBg: '#AFC2D5',  // Muted Blue
    buttonText: '#FFFFFF', // White
    highlight: '#E6F3FF',  // Very Light Blue
};

const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
};

const typography = {
    sizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 22,
        xxl: 26,
    },
    weights: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    families: {
        regular: 'System',
        heading: 'System',
    },
};

const shapes = {
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        round: 9999,
    },
    buttonHeight: 48,
    iconSize: {
        sm: 16,
        md: 24,
        lg: 32,
        xl: 40,
    },
};

const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
};

export { colors, spacing, typography, shapes, shadows };