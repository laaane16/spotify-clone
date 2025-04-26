/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'comment-empty-line-before': 'always',
  },
};
