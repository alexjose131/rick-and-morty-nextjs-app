## HOW TO DEPLOY

1. Clone the repository and open it in your Code Editor.
2. Open and Terminal and run "npm install"
3. Make sure that you have te environment variables in your .env file (in the app root folder)
4. Init the App using the following command "npm run dev"

### Environment Variables

NEXT_PUBLIC_API_URL='https://rickandmortyapi.com/api'

## REQUIREMENTS

### BASIC INFO

1. [x] Crea un repositorio en GITHUB Publico, utiliza GITFLOW para crear FEATURE para cada funcionalidad nueva.
2. [x] Crea un proyecto simple utilizando las API's de Rick and Morty como fuente de informacion https://rickandmortyapi.com/documentation/. Las características del proyecto deben ser las siguientes:
       [X] a. FrameWork: React.JS, Next.JS y Tailwind
       [X] b. Librería de componentes: SHADCN

### SPECS

3. Especificaciones del proyecto
   #### SPECS INFO
   3.1 [X] Utilice el diseño y colores personalizados para el Branding del proyecto a su elección.
   3.2 [X] Puede utilizar componentes y estilados propios o directamente reutilizar de la librería de componente
   3.3 [X] Utilice Fetch para hacer las peticiones y manejo de errores.
   3.4 [X] Almacene la información consultada de las API en local para poder cambiar o agregar nuevos datos
   #### SPECS SECTIONS
   3.5 [X] El proyecto debe contener las siguientes secciones:
   3.5.1 [X] Login
   3.5.2 [X] Sidebar
   3.5.3 [X] Crear personajes
   3.5.4 [X] Consulta de personajes
   3.5.4.1 [X] Muestre los personajes en una tabla, mostrando los datos más relevantes
   3.5.4.2 [X] La sección de permitir filtrado de los personajes por especie, tipo, género y nombre
   3.5.4.3 [X] Debe permitir mutar los datos de los personajes a través de un menú de opciones en cada fila de la tabla. Entre las opciones debe permitir Cambiar datos básicos o cambiar el status del personaje
   3.5.5 [X] Crear episodios
   3.5.6 [X] Consulta de Episodios
   3.5.6.1 [X] Muestre los episodios en una tabla, mostrando los datos más relevantes
   3.5.6.2 [X] La sección de permitir filtrado de los episodios por nombre y episodio
   3.5.6.3 [X] Debe permitir mutar los datos del a través de un menú de opciones en cada fila de la tabla. Entre las opciones debe permitir Cambiar datos básicos o cambiar el status del episodio

### CONSIDERATIONS

3.6 Considere utilizar los siguientes componentes
3.6.1 [X] Para la tabla de los personajes https://ui.shadcn.com/docs/components/table
3.6.2 [X] Para las opciones de las filas https://ui.shadcn.com/docs/components/dropdown-menu
3.6.3 [X] Para mostrar mensajes de las acciones https://ui.shadcn.com/docs/components/toast
3.6.4 [X] Puede utilizar para los botones https://ui.shadcn.com/docs/components/button
3.6.5 [X] Considere usar zustand.
3.6.6 [X] Considere usar zod.

### DEPLOYMENT

4. [x] Despliegue el proyecto en un servidor como Vercel - url:

## URL LINK = https://rick-and-morty-nextjs-app-taupe.vercel.app/
