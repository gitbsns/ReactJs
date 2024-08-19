import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import jsconfigPaths from "vite-jsconfig-paths";

const SCSS_Logger = {
  warn(message, options) {
    if (options.deprecation && message.includes("mixed-decls")) {
      return;
    }
  },
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const processEnvValues = {
    "process.env": Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      };
    }, {}),
  };

  return {
    server: {
      port: 3000,
    },
    // esbuild: {
    //   drop: ["console", "debugger"],
    // },
    plugins: [react(), jsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          logger: SCSS_Logger,
        },
      },
    },
    root: ".",
    build: {
      outDir: "./dist",
      sourcemap: false,
    },
    define: processEnvValues,
  };
});
