import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CheckEvent API",
      version: "1.0.0",
      description: "API del Proyecto Integrador CheckEvent - UCEVA",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: [
    "./src/presentation/modules/**/*.routes.ts",
    "./src/config/swagger.schemas.ts",
  ],
});