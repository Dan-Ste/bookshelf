import { Promise } from 'rsvp'

export default function fbUploadFile({
  firebaseUtil,
  file,
  path,
  onStateChange
}) {
  const metadata = {
    'contentType': file.type
  };

  return new Promise((resolve, reject) => {
    firebaseUtil.uploadFile(path, file, metadata, onStateChange).then(fileUrl => {
      resolve(fileUrl);
    }).catch(e => {
      reject(e);
    })
  });
}
