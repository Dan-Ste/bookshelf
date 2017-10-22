import {
  Promise
} from 'rsvp'

export function fbUploadFile({
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

export function fbDeleteFile({
  firebaseUtil,
  url
}) {
  return new Promise((resolve, reject) => {
    firebaseUtil.deleteFile(url).then(() => {
      resolve();
    }).catch(e => {
      reject(e);
    })
  });
}
