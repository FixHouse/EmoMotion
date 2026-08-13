import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');

          if (!normalizedId.includes('node_modules')) return undefined;

          if (
            normalizedId.includes('/motion/') ||
            normalizedId.includes('/motion-dom/') ||
            normalizedId.includes('/motion-utils/') ||
            normalizedId.includes('/framer-motion/')
          ) {
            return 'motion-vendor';
          }

          if (normalizedId.includes('/lucide-react/')) {
            return 'icons-vendor';
          }

          if (
            normalizedId.includes('/date-fns/') ||
            normalizedId.includes('/react-day-picker/') ||
            normalizedId.includes('/@radix-ui/react-popover/') ||
            normalizedId.includes('/@radix-ui/react-popper/') ||
            normalizedId.includes('/@floating-ui/')
          ) {
            return 'form-vendor';
          }

          return 'vendor';
        },
      },
    },
  },
})
