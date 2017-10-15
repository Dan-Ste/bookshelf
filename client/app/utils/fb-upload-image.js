import { get } from '@ember/object';
import { Promise } from 'rsvp';

export default function fbUploadImage({
  firebaseUtil,
  image,
  user,
  type,
  onStateChange
}) {
  const path = `images/${type}/${get(user, 'username')}/${image.name}`;
  const metadata = {
    'contentType': image.type
  };

  return new Promise((resolve, reject) => {
    firebaseUtil.uploadFile(path, image, metadata, onStateChange).then(imageUrl => {
      resolve(imageUrl);
    }).catch(e => {
      reject(e);
    })
  });
}
