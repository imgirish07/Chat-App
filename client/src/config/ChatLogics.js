import forge from "node-forge"

export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const getReciever = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};


// Encrypt a symmetric key with an RSA public key
export const encryptSymmetricKey = (symmetricKey, publicKeyPem) => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encryptedKey = publicKey.encrypt(symmetricKey, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha1.create()
    }
  });
  return forge.util.encode64(encryptedKey);
};

// Decrypt a symmetric key with an RSA private key
export const decryptSymmetricKey = (encryptedSymmetricKey, privateKeyPem) => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const decodedKey = forge.util.decode64(encryptedSymmetricKey);
  const decryptedKey = privateKey.decrypt(decodedKey, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha1.create()
    }
  });
  return decryptedKey;
};

export const encryptMessage = (message, publicKeyPem) => {
  console.log(message,publicKeyPem)
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  const encryptedMessage = publicKey.encrypt(forge.util.encodeUtf8(message), 'RSA-OAEP');
  return forge.util.encode64(encryptedMessage);
  return encryptedMessage
};

export const decryptMessage = (encryptedMessage, privateKeyPem) => {
  try{

    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const decodedMessage = forge.util.decode64(encryptedMessage);
    const decryptedMessage = privateKey.decrypt(decodedMessage.toString('binary'), 'RSA-OAEP');
    console.log(decryptedMessage)
    return forge.util.decodeUtf8(decryptedMessage);
  }catch(err){
    console.log(err);
    return "def msg"
  }
};

export function toBytes(buf) {
  var byteString = '';
  for (var i = 0; i < buf.length; ++i) {
      byteString += String.fromCodePoint(buf[i]);
  }
  return byteString;
}

export const BaseUrl = "http://localhost:8000/"
