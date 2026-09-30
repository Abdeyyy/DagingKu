import { InferenceSession } from 'onnxruntime-react-native';
import { Asset } from 'expo-asset';

// Import model dengan type declaration yang baru
import Model from '../assets/models/Model_Kualitas_Daging.onnx';

let cachedSession = null;
let loadingPromise = null;

export async function getInferenceSession() {
  if (cachedSession) {
    return cachedSession;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    try {
      console.log('Loading ONNX model...');
      
      // Menggunakan model yang di-import
      const modelAsset = Asset.fromModule(Model);
      await modelAsset.downloadAsync();
      
      console.log('Model downloaded to:', modelAsset.localUri);
      
      const session = await InferenceSession.create(modelAsset.localUri);
      cachedSession = session;
      
      console.log('ONNX session created successfully');
      return session;
    } catch (error) {
      console.error('Failed to create ONNX session:', error);
      
      // Fallback: coba pendekatan alternatif
      try {
        console.log('Trying alternative approach...');
        // Coba dengan require langsung
        const modelAsset2 = Asset.fromModule(require('../assets/models/Model_Kualitas_Daging.onnx'));
        await modelAsset2.downloadAsync();
        const session = await InferenceSession.create(modelAsset2.localUri);
        cachedSession = session;
        return session;
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        throw new Error(`Cannot load ONNX model: ${fallbackError.message}`);
      }
    }
  })();

  return loadingPromise;
}
