import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              return 'vendor';
            }
            if (
              id.includes('/src/components/HealthReportExplainer') ||
              id.includes('/src/utils/healthReportAnalyzer') ||
              id.includes('/src/components/views/HealthView') ||
              id.includes('/src/components/views/FitnessView') ||
              id.includes('/src/components/views/MoneyView') ||
              id.includes('/src/components/views/NotesView')
            ) {
              return 'views-life';
            }
            if (
              id.includes('/src/components/views/TasksView') ||
              id.includes('/src/components/views/CalendarView') ||
              id.includes('/src/components/views/RemindersView') ||
              id.includes('/src/components/views/GoalsView') ||
              id.includes('/src/components/views/HabitsView')
            ) {
              return 'views-planning';
            }
            if (
              id.includes('/src/components/views/LearningView') ||
              id.includes('/src/components/views/SpacesView') ||
              id.includes('/src/components/views/CareerView') ||
              id.includes('/src/components/views/JournalView') ||
              id.includes('/src/components/views/InsightsView')
            ) {
              return 'views-growth';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
