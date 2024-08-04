import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import codegen from "vite-plugin-graphql-codegen";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const plugins = [react()];
  if (command === "serve") {
    plugins.push(codegen());
  }
  return {
    plugins,
  };
});
