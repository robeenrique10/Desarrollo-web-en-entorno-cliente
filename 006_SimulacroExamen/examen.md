# Prueba práctica — Desarrollo Web en Entorno Cliente

## Festival Prisma: panel de coordinación

El equipo organizador del Festival Prisma necesita una pequeña aplicación para estimar recursos, revisar los turnos de trabajo y actualizar un mensaje visible para el público. Completa el código JavaScript de `examen.html` para que el panel responda a las tareas siguientes.

## Condiciones de realización

- Trabaja sobre el archivo `examen.html` proporcionado. No modifiques el HTML ni los estilos: escribe la solución únicamente dentro del elemento `<script>` ya incluido.
- Entrega únicamente el archivo `examen.html`, con tu código JavaScript incorporado. No hacen falta imágenes ni otros archivos.
- Puedes usar las herramientas del navegador para ejecutar, probar y depurar la aplicación.
- Todo el código JavaScript que escribas debe ir comentado. Incluye comentarios que expliquen el propósito de cada bloque y función, y las decisiones relevantes; no hace falta comentar línea por línea las instrucciones obvias.
- La evaluación es criterial: las tareas indican los resultados de aprendizaje relacionados. La nota se registra por criterio en la rúbrica final; no se asigna una nota a cada tarea ni una nota global al examen.
- Los criterios RA2.e, RA2.h y RA3.h se consideran transversalmente en toda la prueba y reciben una calificación global independiente por criterio. La inicialización del script se considera en el conjunto de la prueba.

## Tareas

### 1. Validación de los datos de planificación

Valida los campos de planificación para que solo acepten los formatos indicados. La validación debe funcionar tanto al escribir como al pegar texto y debe impedir que un valor inválido se use en los cálculos.

- **Asistencia** y **bidones disponibles**: enteros positivos, sin signo ni separadores.
- **Duración**: entero positivo, sin signo ni separadores.
- **Agua por persona y día**: número positivo; admite decimales con coma y no admite punto decimal ni signo.
- **Ajuste de presupuesto**: número con punto decimal opcional; puede ser negativo, no admite signo positivo ni coma decimal.

Inicializa el código al cargar la página y organiza las variables de forma que los valores compartidos y los valores temporales de cada operación tengan un ámbito adecuado.

**Resultados de aprendizaje:** RA2.a (inicialización global), RA2.b, RA2.c y RA2.d.

### 2. Cálculo y publicación del plan de recursos

Al pulsar **Calcular recursos**, calcula y muestra el agua total necesaria en litros y el número de bidones de 25 litros que se deben preparar. Redondea hacia arriba el número de bidones. Calcula también el presupuesto estimado con esta fórmula:

`asistencia × días × 12 € + ajuste de presupuesto`

Si falta algún dato o no se puede convertir correctamente, informa al usuario y no presentes resultados como si el cálculo hubiera sido correcto. Indica visualmente si los bidones disponibles cubren la necesidad o si hay que reponer existencias.

Al pulsar **Publicar informe**, pide confirmación antes de mostrar al usuario un resumen del plan. Si cancela, no publiques el informe. En la tarea 4 se especifican las formas de presentar ese resumen.

**Resultados de aprendizaje:** RA2.b y RA2.f; RA3.c y RA3.e.

### 3. Registro y resumen de turnos

Implementa **Añadir turno** y **Quitar turno**. Cada turno añadido debe incluir su propio campo de horas. No alteres el HTML base: crea o clona los elementos desde la plantilla incluida.

Al pulsar **Calcular resumen de turnos**, recorre los turnos existentes y muestra las horas totales, la media de horas por turno y cuántos turnos superan las ocho horas. Señala visualmente cada turno que supere ese límite. Gestiona de forma comprensible que no haya turnos o que algún valor no sea válido.

**Resultados de aprendizaje:** RA2.f y RA2.g; RA3.d.

### 4. Actualización de la pantalla pública

Al pulsar **Actualizar pantalla pública**, toma el mensaje del campo correspondiente y actualiza el contenido de la vista previa de la propia página. Cambia también su aspecto según el estado de los recursos. Muestra en ella el título del documento y el tamaño actual de la ventana del navegador, utilizando los objetos correspondientes. La actualización debe funcionar más de una vez.

Cuando se confirme la publicación del informe descrito en la tarea 2, muestra el resumen al usuario. Para presentar ese resumen, puedes usar **`alert()` o `window.open()`**: cualquiera de las dos alternativas es válida para este apartado (RA3.f). Si eliges `window.open()`, llámalo como respuesta directa a la acción del usuario.

En los comentarios del código, identifica los objetos predefinidos del lenguaje o del navegador que utilices en esta tarea y explica brevemente para qué los usas.

**Resultados de aprendizaje:** RA3.a, RA3.b, RA3.c, RA3.d y RA3.f.

## Rúbrica de evaluación por criterio

Escribe una calificación independiente de **0 a 10** para cada criterio evaluado. No se calcula una nota total.

| RA | Criterio de evaluación | Nota /10 |
|---|---|---:|
| RA2 | **a)** Se ha seleccionado un lenguaje de programación de clientes Web en función de sus posibilidades. | |
| RA2 | **b)** Se han utilizado los distintos tipos de variables y operadores disponibles en el lenguaje. | |
| RA2 | **c)** Se han identificado los ámbitos de utilización de las variables. | |
| RA2 | **d)** Se han reconocido y comprobado las peculiaridades del lenguaje respecto a las conversiones entre distintos tipos de datos. | |
| RA2 | **e)** Se han añadido comentarios al código. | |
| RA2 | **f)** Se han utilizado mecanismos de decisión en la creación de bloques de sentencias. | |
| RA2 | **g)** Se han utilizado bucles y se ha verificado su funcionamiento. | |
| RA2 | **h)** Se han utilizado herramientas y entornos para facilitar la programación, prueba y depuración del código. | |
| RA3 | **a)** Se han identificado los objetos predefinidos del lenguaje. | |
| RA3 | **b)** Se han analizado los objetos referentes a las ventanas del navegador y los documentos Web que contienen. | |
| RA3 | **c)** Se han escrito sentencias que utilicen los objetos predefinidos del lenguaje para cambiar el aspecto del navegador y el documento que contiene. | |
| RA3 | **d)** Se han generado textos y etiquetas como resultado de la ejecución de código en el navegador. | |
| RA3 | **e)** Se han escrito sentencias que utilicen los objetos predefinidos del lenguaje para interactuar con el usuario. | |
| RA3 | **f)** Se han utilizado las características propias del lenguaje en documentos compuestos por varias ventanas y marcos. | |
| RA3 | **h)** Se ha depurado y documentado el código. | |
