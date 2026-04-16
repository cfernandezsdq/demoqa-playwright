# E2E Automation Framework — Playwright + Cucumber (BDD)

Este proyecto implementa un framework de automatización End-to-End utilizando **Playwright**, **Cucumber (BDD)** y **TypeScript**, siguiendo buenas prácticas como **Page Object Model (POM)**, **data-driven testing** y **configuración por entorno con dotenv**.

---

## Tecnologías utilizadas

- Playwright — Automatización moderna de navegadores  
- Cucumber — Enfoque BDD con Gherkin  
- TypeScript — Tipado estático y mantenibilidad  
- dotenv — Gestión de variables de entorno  
- Node.js — Runtime  

---

## Estructura del proyecto

```
project/
├── features/        # Archivos .feature (Gherkin)
├── steps/           # Step Definitions
├── pages/           # Page Objects (POM)
├── hooks/           # Hooks de Cucumber
├── fixtures/        # Custom World y configuración
├── utils/           # Helpers (API, data factory)
├── .env             # Variables de entorno
├── cucumber.js      # Configuración de Cucumber
├── tsconfig.json
└── package.json
```

---

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
BASE_URL=https://demoqa.com
HEADLESS=true
```

---

## Ejecución de tests

```bash
npm run test
```

---

## Ejemplo de escenario (BDD)

```gherkin
Feature: Búsqueda de libros

  Scenario Outline: Buscar libros
    Given el usuario está en la página de libros
    When busca "<keyword>"
    Then el resultado debe ser <tieneResultados>

    Examples:
      | keyword     | tieneResultados |
      | Git         | true            |
      | NoExiste123 | false           |
```

---

## Arquitectura

### Page Object Model (POM)

Cada página encapsula:

- Selectores  
- Acciones  
- Validaciones  

---

### Custom World (Cucumber)

Se utiliza un `CustomWorld` para compartir estado entre steps:

- page  
- user  
- lastKeyword  

---

### Hooks por Tags

Se usan tags para controlar setup:

```gherkin
@auth
Scenario: Login exitoso
```

- `@auth` → crea usuario dinámico vía API  
- Otros escenarios → no requieren usuario  

---

### Data dinámica

- Usuarios creados dinámicamente vía API  
- Evita dependencias externas y datos hardcodeados  

---

### API + UI Testing

El framework combina:

- Creación de usuario vía API  
- Validación mediante UI  

---

## Manejo de Login

Debido a restricciones de DemoQA:

- El registro UI incluye CAPTCHA   
- Se utiliza API para crear usuarios dinámicos 

### Flujo:

1. Hook crea usuario dinámico  
2. Test realiza login en UI  
3. Se valida acceso al perfil  

---

## Configuración por entorno

Se utiliza `dotenv` para manejar variables como:

- BASE_URL  
- HEADLESS  

Esto permite ejecutar tests en distintos entornos sin modificar el código.

---

## Buenas prácticas aplicadas

- Separación de responsabilidades (Steps vs Pages)  
- Eliminación de waits estáticos  
- Uso de auto-wait de Playwright  
- Tests determinísticos  
- Hooks por contexto (tags)  
- Uso de datos dinámicos cuando es necesario  

---

## Consideraciones

- DemoQA puede presentar comportamientos inconsistentes  
- Se priorizó validación basada en DOM en lugar de URL  
- Se evita dependencia de mensajes UI poco confiables  

---

## Posibles mejoras

- Uso de storageState para evitar login repetido  
- Integración con CI/CD  
- Reportes (Allure / HTML)  
- Ejecución en paralelo  

---

## Autor

Carlos Fernandez  

---

## icencia

Uso educativo / demostración técnica
