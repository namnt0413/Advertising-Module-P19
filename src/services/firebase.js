
var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.json");

const BUCKET = "advertising-module-p19-image.appspot.com"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
}); 

const bucket = admin.storage().bucket();

const uploadImage = (req, res , next) => {
    if( !req.file ) return next();

    const image = req.file
    const nameImage = Date.now() + "." + image.originalname.split(".").pop()

    const file = bucket.file(nameImage)
    
    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype,

        }
    })

    stream.on("error", (e) => {
        console.log(e)
    })

    stream.on("finish", async () => {
        await file.makePublic()

        req.file.firebaseUrl =`https://storage.googleapis.com/${BUCKET}/${nameImage}`;

        next();
    })

    stream.end(image.buffer)
} 

module.exports = uploadImage;