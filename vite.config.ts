import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		minify: 'terser', // <-- Terser kullan diyoruz (default: esbuild)
		terserOptions: {
			compress: {
				drop_console: true, // console.* temizle
				drop_debugger: true, // debugger temizle
			},
			format: {
				comments: false, // yorumları da kaldır
			},
		},
	},
});
