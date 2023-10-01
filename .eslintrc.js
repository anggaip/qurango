module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'react-native/no-inline-styles': 0,
    'no-console': 2,
    'max-len': ['warn', {code: 80}],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    // '@typescript-eslint/object-curly-spacing': ['error', 'always'],
  },
};
