const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const multer = require('multer');
const path = require('path');

// Configuración de multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});

const upload = multer({ storage: storage });

// Ruta para mostrar la página de inicio
router.get('/', homeController.showHome);

// Ruta GET para mostrar el formulario de creación de producto
router.get('/productos/crear', homeController.showCreateForm);

// Ruta POST para crear un producto, ahora manejando la subida de la imagen
router.post('/productos/crear', upload.single('imagen'), homeController.createProduct);

// Ruta POST para editar un producto, manejando también la subida de una nueva imagen
router.post('/productos/editar/:id', upload.single('imagen'), homeController.editProduct);

// Ruta GET para mostrar el formulario de edición de producto
router.get('/productos/editar/:id', homeController.showEditForm);

// Ruta GET para mostrar el formulario de eliminación de producto
router.get('/productos/eliminar/:id', homeController.showDeleteForm);

// Ruta para eliminar un producto
router.post('/productos/eliminar/:id', homeController.deleteProduct);

module.exports = router;
