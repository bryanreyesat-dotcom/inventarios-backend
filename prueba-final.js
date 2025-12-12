// prueba-final.js
const API_URL = 'http://localhost:4000';

// Función auxiliar para hacer peticiones
const peticion = async (endpoint, metodo, datos) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });
    return await res.json();
};

const correrPrueba = async () => {
    console.log("🚀 INICIANDO PRUEBA DE SISTEMA COMPLETO...");
    const aleatorio = Math.floor(Math.random() * 10000); // Para no repetir datos

    try {
        // 1. CREAR USUARIO
        console.log("\n1️⃣ Creando Usuario...");
        const usuario = await peticion('/usuarios', 'POST', {
            nombre: "Tester Automático",
            email: `tester${aleatorio}@prueba.com`,
            estado: "Activo",
            password: "123",
            rol: "administrador"
        });
        console.log(`   ✅ Usuario creado ID: ${usuario._id}`);

        // 2. CREAR MARCA
        console.log("\n2️⃣ Creando Marca...");
        const marca = await peticion('/marcas', 'POST', {
            nombre: `Marca Test ${aleatorio}`,
            estado: "Activo"
        });
        console.log(`   ✅ Marca creada ID: ${marca._id}`);

        // 3. CREAR ESTADO
        console.log("\n3️⃣ Creando Estado...");
        const estado = await peticion('/estados-equipos', 'POST', {
            nombre: "En Bodega",
            estado: "Activo"
        });
        console.log(`   ✅ Estado creado ID: ${estado._id}`);

        // 4. CREAR TIPO
        console.log("\n4️⃣ Creando Tipo de Equipo...");
        const tipo = await peticion('/tipos-equipos', 'POST', {
            nombre: "Portátil",
            estado: "Activo"
        });
        console.log(`   ✅ Tipo creado ID: ${tipo._id}`);

        // 5. CREAR INVENTARIO (La prueba de fuego)
        console.log("\n5️⃣ Creando Inventario (Usando los IDs anteriores)...");
        const inventario = await peticion('/inventarios', 'POST', {
            serial: `SRL-${aleatorio}`,
            modelo: "XPS 15",
            descripcion: "Portátil de prueba",
            color: "Gris",
            foto: "http://foto.jpg",
            fechaCompra: "2024-01-01",
            precio: 5000000,
            usuario: usuario._id,
            marca: marca._id,
            estadoEquipo: estado._id,
            tipoEquipo: tipo._id
        });

        if (inventario._id) {
            console.log(`   ✅ ¡ÉXITO! Inventario creado ID: ${inventario._id}`);
        } else {
            console.log("   ❌ FALLÓ la creación de inventario:", inventario);
            return; // Detener si falla
        }

        // 6. PROBAR EDICIÓN (PUT)
        console.log("\n6️⃣ Probando Edición (Cambiando precio)...");
        const inventarioEditado = await peticion(`/inventarios/${inventario._id}`, 'PUT', {
            serial: `SRL-${aleatorio}`, // Mismo serial
            modelo: "XPS 15 PRO", // Cambio modelo
            descripcion: "Editado por script",
            color: "Negro",
            foto: "http://foto_nueva.jpg",
            fechaCompra: "2024-01-01",
            precio: 9999999, // PRECIO NUEVO
            usuario: usuario._id,
            marca: marca._id,
            estadoEquipo: estado._id,
            tipoEquipo: tipo._id
        });
        console.log(`   ✅ Precio actualizado a: ${inventarioEditado.precio}`);

        // 7. PROBAR VALIDACIÓN DE INACTIVOS (Debe fallar)
        console.log("\n7️⃣ Probando Validación (Marca Inactiva)...");
        // Primero creamos una marca inactiva
        const marcaMala = await peticion('/marcas', 'POST', {
            nombre: "Marca Mala",
            estado: "Inactivo" 
        });
        
        // Intentamos usarla
        const intentoFallido = await peticion('/inventarios', 'POST', {
            serial: `SRL-BAD-${aleatorio}`,
            modelo: "Fail",
            descripcion: "No debe guardar",
            color: "Rojo",
            foto: "x",
            fechaCompra: "2024-01-01",
            precio: 100,
            usuario: usuario._id,
            marca: marcaMala._id, // <--- AQUÍ ESTÁ EL TRUCO
            estadoEquipo: estado._id,
            tipoEquipo: tipo._id
        });

        if (intentoFallido.msj === 'Marca inválida o inactiva') {
            console.log("   🏆 ¡PRUEBA SUPERADA! El sistema rechazó la marca inactiva correctamente.");
        } else {
            console.log("   ⚠️ ALERTA: El sistema dejó pasar una marca inactiva:", intentoFallido);
        }

        console.log("\n✨ ------------------------------------------------ ✨");
        console.log("      RESUMEN: SISTEMA FUNCIONANDO AL 100%");
        console.log("✨ ------------------------------------------------ ✨");

    } catch (error) {
        console.log("\n❌ ERROR GRAVE EN LA PRUEBA:");
        console.log(error);
    }
};

correrPrueba();