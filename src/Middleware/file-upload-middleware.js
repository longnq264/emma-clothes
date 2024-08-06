// import multer from 'multer';
// import fs from 'fs';
 
 

// // Set up multer for file storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = './uploads';
//     if (!fs.existsSync(uploadDir)){
//       fs.mkdirSync(uploadDir);
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// const fileUploadMiddleware = (req, res, next) => {
//   if (req.method === 'POST' || req.method === 'PUT') {
//     upload.single('image')(req, res, (err) => {
//       if (err) {
//         return res.status(500).send(err.message);
//       }
//       if (req.file) {
//         req.body.image = `/uploads/${req.file.filename}`;
//       }
//       next();
//     });
//   } else {
//     next();
//   }
// };

// export default fileUploadMiddleware;
