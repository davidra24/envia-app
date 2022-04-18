import React from 'react';
import PDFReader from 'rn-pdf-reader-js';
import { RootTabScreenPropsModel } from '../models';

export const PDFRender = ({
  route: {
    params: { base64 }
  }
}: RootTabScreenPropsModel<'PDFReader'>) => {
  return (
    <PDFReader
      source={{
        base64
      }}
      withPinchZoom
      customStyle={{
        readerContainerZoomContainerButton: {
          display: 'none'
        }
      }}
    />
  );
};
