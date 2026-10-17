# Guía privada para el equipo docente — Festival Prisma

**Documento de corrección. No distribuir al alumnado.**  
El archivo está excluido de Git mediante `.gitignore`.

## Criterios y forma de calificación

Calificar cada criterio evaluado por separado, de 0 a 10. Escala recomendada: **0, 2,5, 5, 7,5 y 10**. Se pueden usar valores intermedios si la evidencia lo justifica. No sumar notas de preguntas ni calcular una nota global.

Se evalúan RA2.a y los criterios RA2.e, RA2.h y RA3.h de forma global. RA2.h y RA3.h son criterios distintos y reciben calificaciones independientes. Valorar RA2.e, RA2.h y RA3.h transversalmente en toda la prueba, sin duplicar su nota por tarea.

## Guía de corrección técnica

### Tarea 1 — formatos e inicialización

- Asistencia y bidones: validar dígitos y valor entero mayor que cero.
- Días: validar dígitos y valor entero mayor que cero.
- Consumo: validar el formato decimal con coma y que el valor convertido sea positivo. Convertir la coma a punto antes de convertir a número. Rechazar valores vacíos, signos, puntos decimales, múltiples comas y texto residual.
- Ajuste: aceptar enteros o decimales con punto y signo negativo opcional al inicio; rechazar `+`, coma decimal, múltiples puntos o texto residual.
- Comprobar valores completos, no solo prefijos numéricos: `parseFloat("12x")` por sí solo no es validación suficiente. Prevenir la entrada inválida al teclear y volver a validar el valor completo antes de calcular para cubrir pegado y cambios de valor.
- Verificar inicialización sin errores al abrir la página; los eventos deben quedar conectados aunque la solución se ejecute durante o después de la carga del documento.

### Tarea 2 — recursos, decisiones e interacción

- Fórmulas esperadas:
  - `aguaTotal = asistencia * dias * consumoPorPersona`
  - `bidonesNecesarios = Math.ceil(aguaTotal / 25)`
  - `presupuesto = asistencia * dias * 12 + ajuste`
- Estado correcto al comparar bidones disponibles con bidones necesarios; la interfaz debe actualizar texto y estilo coherentemente.
- El informe debe pedir confirmación y solo mostrarse si se confirma. Cancelar no debe modificar ni publicar resultados.
- Errores de entrada deben mostrarse de forma clara y no dejar resultados previos presentados como cálculo actual.

### Tarea 3 — turnos y agregación

- Cada clon de la plantilla debe ser independiente y tener su propio control de eliminación.
- El resumen recorre todos los campos existentes. Media = total de horas / cantidad de turnos válidos. El umbral es estrictamente superior a 8 horas.
- Evitar división por cero; ante lista vacía o entradas inválidas, presentar un mensaje útil en vez de resultados engañosos.
- Aplicar y retirar la clase visual de turno extenso cuando cambie la entrada o se vuelva a calcular.

### Tarea 4 — ventana, documento e interacción

- La vista previa debe actualizarse mediante el `document` actual; insertar el mensaje como texto, no interpretarlo como marcado.
- Mostrar de forma correcta el título del documento y el tamaño actual de la ventana mediante `document` y `window`.
- Cambiar el estilo de la vista previa según el estado del plan, y comprobar que se actualiza correctamente al pulsar varias veces.
- Para mostrar el resumen tras la confirmación, aceptar tanto `alert()` como `window.open()` como evidencia válida de RA3.f, según la indicación expresa del examen. Si se usa `window.open()`, comprobar que se invoca desde el manejador de una acción del usuario y que el documento abierto presenta el informe.
- Incluir el comentario solicitado identificando los objetos predefinidos usados y su función.

## Indicadores de logro por criterio

En cada fila se describen evidencias específicas de este examen. Usar los niveles como anclas de calificación, no como puntuaciones de preguntas. Los niveles intermedios pueden asignarse cuando la evidencia quede entre dos descriptores.

| Criterio | 0 | 2,5 | 5 | 7,5 | 10 |
|---|---|---|---|---|---|
| **RA2.a** — Selección del lenguaje de cliente | No hay JavaScript ejecutable o la página no lo ejecuta. | Hay código JavaScript, pero no se inicializa y los controles no llegan a funcionar. | El script se inicia y algunas funciones se conectan, pero la carga o conexión de eventos falla parcialmente. | Inicialización correcta; queda algún control sin enlazar o hay un error menor al cargar. | JavaScript integrado correctamente en la página; inicialización fiable y todos los controles previstos quedan conectados sin errores. |
| **RA2.b** — Variables y operadores | No se observan variables u operaciones pertinentes. | Uso aislado de variables u operadores, con operaciones incorrectas para los cálculos solicitados. | Variables y operadores permiten completar parte del cálculo de agua, bidones o turnos, con fallos de tipos u operaciones. | Uso apropiado en casi todos los cálculos; queda un fallo localizado de operador, tipo o actualización. | Tipos y variables adecuados para datos, cálculos y estados; operadores correctos en todas las fórmulas y agregaciones. |
| **RA2.c** — Ámbitos de las variables | No distingue ni usa ámbitos de manera funcional; variables necesarias quedan inaccesibles o globales accidentales. | Declara variables sin una organización reconocible; varios errores de alcance impiden operaciones. | Distingue algún dato compartido de una variable local, pero tiene colisiones o dependencias innecesarias entre funciones. | Constantes compartidas y variables locales bien organizadas, con una fuga o dependencia menor. | Identifica y aplica consistentemente ámbito global/compartido y local; evita globales accidentales y conserva el estado necesario explícitamente. |
| **RA2.d** — Conversión entre tipos | No convierte correctamente entradas de texto o los cálculos no producen números utilizables. | Conversión directa sin tratar formatos; coma decimal o valores inválidos producen resultados erróneos. | Convierte algunos campos correctamente, pero confunde separadores o acepta entradas parciales/ inválidas. | Convierte los formatos requeridos, contempla la mayoría de inválidos y conserva correctamente el signo; queda un caso límite. | Valida el valor completo y convierte cada formato según su separador, signo y tipo; trata vacío, NaN y pegado sin resultados falsos. |
| **RA2.e** — Comentarios en el código | No hay comentarios en el código propio. | Solo hay comentarios aislados o irrelevantes; casi todos los bloques y funciones quedan sin documentar. | Comenta algunas funciones o bloques, pero una parte sustancial del código o varias decisiones relevantes quedan sin explicar. | Todo o casi todo el código está comentado por bloques y funciones; faltan comentarios en alguna parte o decisión relevante. | Todo el código está comentado de forma concisa y correcta: se explica el propósito de cada bloque y función y las decisiones relevantes, sin comentarios engañosos ni narrar cada instrucción obvia. |
| **RA2.f** — Mecanismos de decisión | No hay decisiones funcionales. | Hay condiciones, pero las ramas principales no distinguen los estados y dan resultados incorrectos. | Distingue algunos casos, como stock suficiente, pero no gestiona coherentemente errores o turnos extensos. | Decisiones correctas para casi todos los estados; queda un caso límite o mensaje inconsistente. | Condiciones claras cubren datos inválidos, stock suficiente/insuficiente, confirmación y umbral de turno sin contradicciones. |
| **RA2.g** — Bucles y verificación | No recorre los turnos. | Intenta un bucle que falla incluso con una entrada simple. | Recorre parte de la lista y obtiene algún agregado, pero omite turnos o cuenta mal. | Recorre correctamente los turnos ordinarios y calcula los agregados; falla con lista vacía o un dato inválido. | Bucle recorre todos los turnos y calcula total, media y cantidad >8 correctamente, incluido el manejo de lista vacía e inválidos. |
| **RA2.h** — Herramientas de programación, prueba y depuración | No hay evidencia de ejecución ni de uso de herramientas. | Abre la página, pero no prueba la interacción ni utiliza herramientas para localizar fallos. | Prueba el flujo principal, pero no contrasta entradas erróneas o depende de errores visibles en consola. | Prueba flujos correctos e inválidos y usa consola/depurador para corregir la mayoría de errores; queda una regresión menor. | Evidencia de pruebas sistemáticas de controles, límites, cancelación y casos inválidos; depura con herramientas del navegador y deja ejecución sin errores relevantes. |
| **RA3.a** — Objetos predefinidos | No identifica ni usa objetos predefinidos relevantes. | Usa objetos por tanteo y no identifica su función. | Identifica o usa correctamente uno de los objetos necesarios, pero confunde otros o sus responsabilidades. | Identifica los objetos usados y su función principal; presenta una imprecisión menor. | Identifica correctamente objetos como `window`, `document` y `Math` y explica la responsabilidad de cada uno que utiliza. |
| **RA3.b** — Ventanas y documentos web | No utiliza los objetos `window` o `document`. | Los menciona o consulta de forma incorrecta; no muestra información de la página. | Obtiene el título o una dimensión, pero no ambos o no los muestra correctamente. | Muestra título y dimensiones con un error menor de actualización o formato. | Usa `document` y `window` correctamente para mostrar el título y las dimensiones actuales, también tras cambiar el tamaño de la ventana. |
| **RA3.c** — Cambios de aspecto | No modifica estilos ni aspecto. | Intenta cambiar estilo sin efecto o cambia un elemento ajeno al estado. | Cambia un estilo en un caso, pero no representa coherentemente el estado de recursos. | Aspecto de la vista previa actualizado para los estados principales, con un estilo o estado que no se restaura bien. | Actualiza de forma coherente el estilo de la vista previa según el estado de recursos, sin estados obsoletos. |
| **RA3.d** — Generación de textos y etiquetas | No genera contenido dinámico. | Crea contenido incorrecto o no visible; manipula los nodos equivocados. | Genera turnos o mensaje de pantalla parcialmente funcional, con etiquetas/textos incompletos. | Genera y actualiza el contenido requerido casi siempre; queda un caso de duplicación o actualización incompleta. | Genera turnos desde la plantilla y actualiza el mensaje, los datos de ventana y el informe usando texto/nodos adecuados, también en actualizaciones repetidas. |
| **RA3.e** — Interacción con el usuario | No interactúa con el usuario. | Usa un diálogo, pero publica incluso al cancelar o no comunica el resultado. | Confirmación presente, pero alguna rama de aceptación/cancelación no funciona correctamente. | Aceptación y cancelación se distinguen; queda un problema menor en el resumen o mensaje. | `confirm` gobierna correctamente la publicación y el informe se comunica claramente solo tras aceptación. |
| **RA3.f** — Ventanas y marcos | No presenta el resumen ni utiliza una interacción pertinente. | Intenta `alert()` o `window.open()`, pero no muestra el resumen o lo hace incluso si se cancela la confirmación. | Presenta parte del resumen mediante `alert()` o una ventana nueva, con errores en la confirmación o en los datos. | Presenta el resumen correcto tras confirmar usando `alert()` o `window.open()`, con un fallo menor de contenido o flujo. | Presenta toda la información pertinente solo tras confirmar, utilizando correctamente `alert()` o `window.open()`; si abre una ventana, la genera desde la acción del usuario y muestra un documento legible. |
| **RA3.h** — Depuración y documentación | No hay código funcional ni documentación; no se observan intentos de depuración. | Código difícil de seguir, sin comentario solicitado y con errores no investigados. | Depura algunos errores y aporta comentario parcial, pero hay fallos reproducibles o poca claridad. | Código razonablemente documentado y depurado; persiste algún error menor o falta explicar un objeto. | Código documentado con el comentario solicitado, depurado mediante ejecución/pruebas, y sin defectos reproducibles relevantes. |

## Evidencias transversales y notas de corrección

- Registrar RA2.a una sola vez, considerando si el JavaScript del único HTML entregado se inicializa correctamente.
- Registrar RA2.e, RA2.h y RA3.h una sola vez cada uno, tomando evidencias de toda la solución; para RA2.h, considerar también el proceso observado en el navegador. No inferir el uso de herramientas únicamente porque el resultado final funcione.
- RA2.e mide globalmente que todo el código esté comentado; RA3.h mide depuración y documentación en sentido más amplio. No fusionar sus calificaciones.
- Aceptar distintas implementaciones equivalentes que cumplan las restricciones del HTML, validen entradas completas y produzcan el comportamiento solicitado.
