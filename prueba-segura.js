// prueba-segura.js
const API_URL = 'http://localhost:4000';

// 1. Credenciales del Admin que creaste antes
// (Si borraste la base de datos, avísame para decirte cómo crear uno nuevo sin token)
const ADMIN_USER = {
    email: "prueba.seguridad@test.com", 
    password: "mi_password_secreto_123" 
};

let TOKEN = ""; // Aquí guardaremos la "llave"

const peticion = async (endpoint, metodo, datos, requiereToken = true) => {
    const headers = { 'Content-Type': 'application/json' };
    
    // Si la petición necesita seguridad, le pegamos el token
    if (requiereToken && TOKEN) {
        headers['Authorization'] = TOKEN;
    }

    const res = await fetch(`${API_URL}${endpoint}`, {
        method: metodo,
        headers: headers,
        body: JSON.stringify(datos)
    });
    
    // Intentamos leer la respuesta, sea JSON o Texto
    try {
        return await res.json();
    } catch (e) {
        return { msj: "Error no JSON", error: res.statusText };
    }
};

const correrPrueba = async () => {
    console.log("🔐 INICIANDO PRUEBA DE SEGURIDAD...");
    const aleatorio = Math.floor(Math.random() * 10000);

    try {
        // PASO 0: LOGIN (Conseguir el Token)
        console.log("\n0️⃣ Intentando Loguearse como Admin...");
        const loginRes = await peticion('/auth', 'POST', ADMIN_USER, false);
        
        if (loginRes.token) {
            TOKEN = loginRes.token;
            console.log("   🔑 ¡LOGIN EXITOSO! Token recibido.");
        } else {
            console.log("   ❌ FALLÓ EL LOGIN. Razón:", loginRes);
            console.log("   ⚠️  NOTA: Si borraste el usuario 'prueba.seguridad', necesitas crear uno nuevo o quitar temporalmente el middleware en 'usuario-route.js'");
            return; // Detener prueba
        }

        // 1. CREAR MARCA (Ahora con Token)
        console.log("\n1️⃣ Creando Marca (Protegida)...");
        const marca = await peticion('/marcas', 'POST', {
            nombre: `Marca Segura ${aleatorio}`,
            estado: "Activo"
        });
        console.log(`   ✅ Marca: ${marca.nombre} (ID: ${marca._id})`);

        // 2. CREAR ESTADO
        console.log("\n2️⃣ Creando Estado...");
        const estado = await peticion('/estados-equipos', 'POST', {
            nombre: "Nuevo en Caja",
            estado: "Activo"
        });
        console.log(`   ✅ Estado: ${estado.nombre} (ID: ${estado._id})`);

        // 3. CREAR TIPO
        console.log("\n3️⃣ Creando Tipo...");
        const tipo = await peticion('/tipos-equipos', 'POST', {
            nombre: "Tablet",
            estado: "Activo"
        });
        console.log(`   ✅ Tipo: ${tipo.nombre} (ID: ${tipo._id})`);

        // 4. CREAR INVENTARIO (Prueba de Fuego)
        console.log("\n4️⃣ Creando Inventario (Usando Token)...");
        
        // Primero necesitamos el ID del usuario actual
        // (Podemos sacarlo de la respuesta del login o usar uno cualquiera si conocemos el ID)
        const usuarioId = loginRes.usuario.id; 

        const inventario = await peticion('/inventarios', 'POST', {
            serial: `SECURE-${aleatorio}`,
            modelo: "iPad Pro",
            descripcion: "Tablet corporativa",
            color: "Silver",
            foto: "img.jpg",
            fechaCompra: "2024-05-05",
            precio: 3500000,
            usuario: usuarioId,
            marca: marca._id,
            estadoEquipo: estado._id,
            tipoEquipo: tipo._id
        });

        if (inventario._id) {
            console.log(`   🏆 ¡ÉXITO TOTAL! Inventario creado ID: ${inventario._id}`);
        } else {
            console.log("   ❌ FALLÓ Inventario:", inventario);
        }

    } catch (error) {
        console.log("\n❌ ERROR GRAVE EN LA PRUEBA:");
        console.log(error);
    }
};

correrPrueba();