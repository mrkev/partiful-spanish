import { defineConfig } from "prisma/config";

export default defineConfig({
  // required when using unstable features
  experimental: {
    externalTables: true,
  },
  // declare the `users` table as external
  tables: {
    external: ["auth.users"],
  },
});
