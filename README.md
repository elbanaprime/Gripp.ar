# GRIP — Tienda Oficial de Indumentaria Automotriz & Streetwear

Tienda web moderna, de alto rendimiento y completamente responsive creada para la marca **GRIP**, inspirada en la experiencia de compra y estructura limpia de [Car Gallery](https://cargallery.store/collections/car-tshirts/products/s14-kouki-shirt).

Desarrollada con código propio, diseño automotriz exclusivo y utilizando únicamente los productos, mockups, estampas DTF y logos reales de **GRIP**.

---

## 🏎️ Características Principales

1. **Diseño Automotriz & Streetwear:**
   - Paleta de alto contraste en negros profundos (`#0a0a0a`), blancos puros (`#ffffff`) y acentos de competición.
   - Header limpio con el logo oficial de GRIP y contador dinámico de carrito.
   - Tipografías modernas (*Syne*, *Space Grotesk*, *Inter*).

2. **Catálogo de Productos Reales:**
   - **Remera Porsche GT3 RS**
   - **Remera Corvette C5 Hustle**
   - **Remera BMW M3 E30**
   - **Remera Honda Acura NSX**
   - **Remera Franco Colapinto #43 Alpine F1**
   - **Remera Ford Falcon Sprint**
   - **Remera Ayrton Senna #12**
   - Proporciones consistentes en todas las tarjetas de producto sin deformación visual.

3. **Página Individual de Producto (Estilo Car Gallery):**
   - **Columna izquierda:** Galería interactiva con imagen principal ampliada y fila de miniaturas (mockup frente, dorso, ambos y detalle de estampa DTF en alta definición).
   - **Columna derecha:** Título, precio en pesos argentinos (`$45.000`), selector de talles obligatorio (**S, M, L, XL**), selector de cantidad y botón destacado **"AGREGAR AL CARRITO"**.
   - **Sección inferior:** Acordeones interactivos con descripción, especificaciones técnicas de la prenda (100% algodón 280 GSM, boxy fit) e información de envíos.
   - Enlace directo por hash (ej. `#producto/porsche-gt3-rs`) para refrescar la página o compartir productos específicos.

4. **Carrito Lateral (Drawer):**
   - Panel deslizable desde la derecha con actualización instantánea (sin recargar la página).
   - Muestra imagen, nombre, talle seleccionado, precio unitario, cantidad (con botones `+` y `-`), subtotal por ítem y botón de eliminación.
   - Persistencia completa mediante `localStorage`: los productos se conservan al recargar o navegar entre vistas.
   - Estado de carrito vacío elegante con mensaje y botón para volver a ver los productos.

5. **Regla de Envío Centralizada:**
   - **Subtotal $\ge$ $80.000:** Muestra **`ENVÍO GRATIS`** (y barra de progreso al 100%).
   - **Subtotal $<$ $80.000:** Muestra **`ENVÍO A ORGANIZAR`** (e indicador de cuánto falta para el beneficio).
   - Sin costos falsos agregados: el total en pantalla siempre refleja el subtotal exacto.

6. **Checkout Exclusivo por WhatsApp:**
   - Sin pasarelas de pago engorrosas ni formularios bancarios tradicionales.
   - Un único botón principal: **"CONTINUAR PEDIDO POR WHATSAPP"**.
   - Conexión directa al número oficial: `+54 9 341 599-8943` (enlace internacional `https://wa.me/5493415998943`).
   - Generación dinámica del mensaje con el desglose exacto de cada producto, talle, cantidad, subtotales y estado del envío.

---

## 📁 Estructura del Proyecto

```
grip_store/
├── index.html              # Estructura principal, vistas (Home / Producto), drawer y modales
├── css/
│   └── style.css           # Estilos completos, estética automotriz, diseño responsive y drawer
├── js/
│   ├── products.js         # Configuración central (STORE_CONFIG) y catálogo de los 7 productos con precios
│   ├── cart.js             # Lógica de carrito, cálculo de envío y generador de mensaje para WhatsApp
│   └── app.js              # Controlador principal, enrutamiento hash, galería interactiva y eventos
├── assets/
│   ├── logo/               # Logos oficiales de GRIP (blanco, negro, emblema)
│   └── products/           # Imágenes y mockups organizados por cada vehículo (porsche, e30, colapinto, etc.)
└── README.md               # Esta documentación
```

---

## ⚙️ Dónde Modificar Precios y Configuración

Toda la información del negocio está centralizada en un solo archivo:
👉 [`js/products.js`](file:///C:/Users/usuario/.gemini/antigravity/scratch/grip_store/js/products.js)

### 1. Modificar Precios de Productos
Abrí [`js/products.js`](file:///C:/Users/usuario/.gemini/antigravity/scratch/grip_store/js/products.js) y cambiá únicamente el valor del campo `price`:

```javascript
{
    id: "porsche-gt3-rs",
    name: "Remera Porsche GT3 RS",
    price: 45000, // <-- Cambiá este valor (ej. 48000)
    ...
}
```
*Al cambiar este valor, se actualizan de forma automática las tarjetas del catálogo, la página del producto, los subtotales del carrito, el cálculo del envío gratis y el mensaje que llega a WhatsApp.*

### 2. Modificar el Número de WhatsApp
En la parte superior de [`js/products.js`](file:///C:/Users/usuario/.gemini/antigravity/scratch/grip_store/js/products.js), editá `STORE_CONFIG.whatsapp`:

```javascript
const STORE_CONFIG = {
    brandName: "GRIP",
    whatsapp: "5493415998943", // <-- Modificá el número acá (código de país + número, sin espacios ni símbolos)
    freeShippingThreshold: 80000
};
```

### 3. Modificar el Límite de Envío Gratis
En la misma configuración, editá `STORE_CONFIG.freeShippingThreshold`:

```javascript
const STORE_CONFIG = {
    ...
    freeShippingThreshold: 80000 // <-- Modificá el límite en pesos (ej. 100000)
};
```

---

## 🚀 Cómo Ejecutar el Proyecto

No requiere Node.js, compiladores ni dependencias pesadas. Funciona directamente en cualquier navegador moderno:

1. **Opción Directa (Recomendada):**
   - Hacé doble clic en el archivo [`index.html`](file:///C:/Users/usuario/.gemini/antigravity/scratch/grip_store/index.html) desde el Explorador de Archivos de Windows.
   - O abrilo con tu navegador favorito (Chrome, Edge, Brave, Firefox, etc.).

2. **Desde PowerShell / Terminal:**
   ```powershell
   cd C:\Users\usuario\.gemini\antigravity\scratch\grip_store
   Start-Process index.html
   ```

3. **Con Live Server en VS Code:**
   - Abrí la carpeta `grip_store` en Visual Studio Code.
   - Hacé clic derecho en `index.html` y seleccioná *"Open with Live Server"*.
