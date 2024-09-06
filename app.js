// app.js
// app.js
const express = require('express');
const path = require('path');
const app = express();

// Configura la carpeta 'uploads' como estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar middleware para analizar datos de formularios
app.use(express.urlencoded({ extended: true }));

// Configurar la carpeta 'public' para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Importar las rutas
const homeRoutes = require('./routes/homeRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const testimonialsRoutes = require('./routes/testimonialsRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Usar las rutas
app.use('/', homeRoutes);
app.use('/cursos', coursesRoutes);
app.use('/acerca-de', aboutRoutes);
app.use('/testimonios', testimonialsRoutes);
app.use('/contacto', contactRoutes);

// Iniciar el servidor
app.listen(3000, () =>{
    console.log("servidor corriendo http://localhost:3000")
});
