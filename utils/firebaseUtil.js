import firebase from 'firebase';
import moment from 'moment';

const uploadPicture = (base64) => {
    const key = firebase.database().ref('requests').push().key;
    const updates = {};
    updates[`requests/${key}`] = {
        id: key,
        timestamp: moment().format()
    }
    updates[`requests_imgs/${key}`] = {
        image: base64
    }
    return firebase.database().ref().update(updates);
}

const loadDocuments = () => {
    return firebase.database().ref('requests').once('value');
}

export {
    uploadPicture,
    loadDocuments
}
