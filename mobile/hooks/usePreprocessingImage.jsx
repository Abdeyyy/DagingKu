import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import jpeg from 'jpeg-js';
import { Tensor } from 'onnxruntime-react-native';
import { toByteArray } from 'base64-js';

const MEAN = [0.485, 0.456, 0.406];
const STD = [0.229, 0.224, 0.225];
const SIZE = 224;

async function preprocessImage(imageUri) {
  // Resize ke 256x256 (setara transforms.Resize([256, 256]))
  const manipulated = await ImageManipulator.manipulateAsync(
    imageUri,
    [{ resize: { width: SIZE, height: SIZE } }],
    { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
  );

  // Decode JPEG base64 -> raw pixel data (RGBA, urutan HWC)
  const rawBinary = toByteArray(manipulated.base64);
  const decoded = jpeg.decode(rawBinary, { useTArray: true });
  const { data, width, height } = decoded; // data: Uint8Array RGBA, panjang = width*height*4

  // Susun ulang jadi CHW + normalisasi (setara ToTensor() + Normalize())
  const floatData = new Float32Array(3 * width * height);
  const channelSize = width * height;

  for (let i = 0; i < channelSize; i++) {
    const r = data[i * 4] / 255;
    const g = data[i * 4 + 1] / 255;
    const b = data[i * 4 + 2] / 255;

    floatData[i] = (r - MEAN[0]) / STD[0];                  // channel R
    floatData[channelSize + i] = (g - MEAN[1]) / STD[1];    // channel G
    floatData[2 * channelSize + i] = (b - MEAN[2]) / STD[2]; // channel B
  }

  // Bungkus jadi Tensor, shape [1, 3, 256, 256] -> batch, channel, height, width
  return new Tensor('float32', floatData, [1, 3, height, width]);
}

export default preprocessImage;