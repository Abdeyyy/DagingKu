import { InferenceSession } from 'onnxruntime-react-native';
import { Asset } from 'expo-asset';

let cachedSession = null;
let loadingPromise = null;

// Fungsi ini akan load model HANYA sekali selama app masih berjalan.
// Panggilan berikutnya langsung kembalikan session yang sudah ada di RAM.
export async function getInferenceSession() {
  if (cachedSession) {
    return cachedSession;
  }

  // Kalau sedang dalam proses loading (misal dipanggil 2x bersamaan), tunggu proses yang sama
  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    const modelAsset = Asset.fromModule(require('../assets/models/Model_Kualitas_Daging.onnx'));
    await modelAsset.downloadAsync();
    const session = await InferenceSession.create(modelAsset.localUri);
    cachedSession = session;
    return session;
  })();

  return loadingPromise;
}