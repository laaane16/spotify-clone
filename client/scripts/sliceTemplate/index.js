const fs = require('fs');
const path = require('path');

const createDirection = (path) => {
  fs.mkdirSync(path);
};

const createFile = (path, data = '') => {
  fs.writeFileSync(path, data);
};

const getReduxSliceFileData = (
  prepareSliceName,
  sliceNameLowerCase,
) => `import { createSlice } from '@reduxjs/toolkit';

import { ${prepareSliceName}Schema } from '../types/${prepareSliceName}Schema';

const initialState: ${prepareSliceName}Schema = {};

const ${sliceNameLowerCase}Slice = createSlice({
  name: '${sliceNameLowerCase}',
  initialState,

  reducers: {
    setAny: (state, action) => {},
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(${sliceNameLowerCase}FetchData.fulfilled, (state, action: PayloadAction<IProfile>) => {
  //       state.isLoading = false;
  //       state.data = action.payload;
  //       state.form = action.payload;
  //     })

  //     .addCase(${sliceNameLowerCase}FetchData.pending, (state) => {
  //       state.isLoading = true;
  //       state.error = undefined;
  //     })

  //     .addCase(${sliceNameLowerCase}FetchData.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error = action.error.message;
  //     })
});

export const { reducer: ${sliceNameLowerCase}Reducer } = ${sliceNameLowerCase}Slice;
export const { actions: ${sliceNameLowerCase}Actions } = ${sliceNameLowerCase}Slice;
`;

const getReduxSliceTestFileData = (
  prepareSliceName,
  sliceNameLowerCase,
) => `import { ${prepareSliceName}Schema } from '../types/${prepareSliceName}Schema';
import { ${sliceNameLowerCase}Actions, ${sliceNameLowerCase}Reducer } from './${sliceNameLowerCase}Slice';

describe('${sliceNameLowerCase}Slice.test', () => {
  test('', () => {
    expect('').toBe('');
  });
});
`;

const createModelSegment = (sliceDirPath, prepareSliceName, sliceNameLowerCase) => {
  const modelDirPath = path.resolve(sliceDirPath, 'model');

  const reduxSliceDirPath = path.resolve(modelDirPath, 'slice');
  const reduxSliceFilePath = path.resolve(reduxSliceDirPath, sliceNameLowerCase + 'Slice.tsx');
  const reduxSliceTestFilePath = path.resolve(
    reduxSliceDirPath,
    sliceNameLowerCase + 'Slice.test.tsx',
  );

  const typesDirPath = path.resolve(modelDirPath, 'types');
  const typesSchemaFilePath = path.resolve(typesDirPath, prepareSliceName + 'Schema.tsx');

  const selectorsSliceDirPath = path.resolve(modelDirPath, 'selectors');
  const servicesSliceDirPath = path.resolve(modelDirPath, 'services');
  const publicApiFilePath = path.resolve(sliceDirPath, 'index.ts');

  const reduxSliceFileData = getReduxSliceFileData(prepareSliceName, sliceNameLowerCase);
  const reduxSliceTestFileData = getReduxSliceTestFileData(prepareSliceName, sliceNameLowerCase);
  const typesSchemaFileData = `export interface ${prepareSliceName}Schema {}
`;
  const publicApiFileData = `export { ${sliceNameLowerCase}Reducer, ${sliceNameLowerCase}Actions } from './model/slice/${sliceNameLowerCase}Slice';
export { type ${prepareSliceName}Schema } from './model/types/${prepareSliceName}Schema';
`;

  createDirection(modelDirPath);

  createDirection(reduxSliceDirPath);
  createFile(reduxSliceFilePath, reduxSliceFileData);
  createFile(reduxSliceTestFilePath, reduxSliceTestFileData);

  createDirection(typesDirPath);
  createFile(typesSchemaFilePath, typesSchemaFileData);

  createDirection(selectorsSliceDirPath);
  createDirection(servicesSliceDirPath);

  createFile(publicApiFilePath, publicApiFileData);
};

const createUISegment = (sliceDirPath) => {
  const uiDirPath = path.resolve(sliceDirPath, 'ui');
  createDirection(uiDirPath);
};

const createTemplate = (args) => {
  const validLayers = ['pages', 'entities', 'features'];

  try {
    const layerName = args[2];
    const sliceName = args[3];

    if (!layerName) {
      throw new Error('Нет имени слоя');
    }

    if (!sliceName) {
      throw new Error('Нет имени слайса');
    }

    const isValidLayerName = !!validLayers.find((layer) => layerName === layer);
    if (!isValidLayerName) {
      throw new Error('Некорректное имя слоя');
    }

    const prepareSliceName = sliceName[0].toUpperCase() + sliceName.slice(1);
    const sliceNameLowerCase = sliceName[0].toLowerCase() + sliceName.slice(1);

    const srcDirPath = path.resolve(__dirname, '..', '..', 'src');
    const sliceDirPath = path.resolve(srcDirPath, layerName, prepareSliceName);
    createDirection(sliceDirPath);

    createUISegment(sliceDirPath);
    createModelSegment(sliceDirPath, prepareSliceName, sliceNameLowerCase);
  } catch (e) {
    console.log(e.message);
  }
};

createTemplate(process.argv);
