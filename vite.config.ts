import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars-transformer';

export default defineConfig({
  plugins: [handlebars()],
});
