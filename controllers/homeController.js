const fs = require('fs');
const path = require('path');

// Método para mostrar la página de inicio
exports.showHome = (req, res) => {
    const productsFilePath = path.join(__dirname, '../dataBase/products.json');
    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) throw err;

        const productos = JSON.parse(data);
        res.render('home', { productos });
    });
};

// Método para renderizar el formulario de creación de producto
exports.showCreateForm = (req, res) => {
    res.render('create'); // Asegúrate de que 'create' coincide con el nombre de tu archivo EJS
};

// Método para crear un producto
exports.createProduct = (req, res) => {
    console.log(req.file); // Esto te ayudará a ver si el archivo se está procesando
    const { nombre, descripcion, enlace } = req.body;
    const imagen = req.file ? req.file.filename : null; // Añadir una comprobación de seguridad
    
    if (!imagen) {
        return res.status(400).send('No se ha subido ninguna imagen.');
    }

    const productsFilePath = path.join(__dirname, '../dataBase/products.json');

    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) throw err;

        const productos = JSON.parse(data);

        const nuevoProducto = {
            id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
            nombre,
            imagen,
            descripcion,
            enlace
        };

        productos.push(nuevoProducto);

        fs.writeFile(productsFilePath, JSON.stringify(productos, null, 2), (err) => {
            if (err) throw err;
            res.redirect('/');
        });
    });
};

// Método para renderizar el formulario de edición de producto
exports.showEditForm = (req, res) => {
    const { id } = req.params;
    const productsFilePath = path.join(__dirname, '../dataBase/products.json');

    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) throw err;

        const productos = JSON.parse(data);
        const producto = productos.find(producto => producto.id == id);

        if (producto) {
            res.render('edit', { producto });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    });
};

// Método para editar un producto
exports.editProduct = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, enlace } = req.body;
    const imagen = req.file ? req.file.filename : req.body.imagen;
    const productsFilePath = path.join(__dirname, '../dataBase/products.json');

    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) throw err;

        const productos = JSON.parse(data);
        const productoIndex = productos.findIndex(producto => producto.id == id);

        if (productoIndex !== -1) {
            // Actualizar los campos del producto
            productos[productoIndex].nombre = nombre;
            productos[productoIndex].imagen = imagen;
            productos[productoIndex].descripcion = descripcion;
            productos[productoIndex].enlace = enlace;

            // Guardar el archivo actualizado
            fs.writeFile(productsFilePath, JSON.stringify(productos, null, 2), (err) => {
                if (err) throw err;
                res.redirect('/'); // Redirigir al home después de la edición
            });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    });
};

// Método para renderizar el formulario de eliminación de producto
exports.showDeleteForm = (req, res) => {
    const { id } = req.params;
    const productsFilePath = path.join(__dirname, '../dataBase/products.json');

    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) throw err;

        const productos = JSON.parse(data);
        const producto = productos.find(producto => producto.id == id);

        if (producto) {
            res.render('delete', { producto });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    });
};


// Método para eliminar un producto
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    const productsFilePath = path.join(__dirname, '../dataBase/products.json');

    fs.readFile(productsFilePath, 'utf-8', (err, data) => {
        if (err) throw err;

        let productos = JSON.parse(data);
        productos = productos.filter(producto => producto.id != id);

        // Guardar el archivo actualizado
        fs.writeFile(productsFilePath, JSON.stringify(productos, null, 2), (err) => {
            if (err) throw err;
            res.redirect('/'); // Redirigir al home después de la eliminación
        });
    });
};




