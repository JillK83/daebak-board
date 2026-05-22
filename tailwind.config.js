/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#FAF7F2',
        card: '#FFFFFF',
        'thumb-bg': '#EDE6DF',
        divider: '#EDE6DF',
        border: '#E8E0D8',
        'border-hover': '#D4A5A5',
        'border-dashed': '#D8CFC7',
        'text-primary': '#2C2C2C',
        'text-secondary': '#7A7060',
        'text-ghost': '#B0A398',
        'text-actors': '#5A5248',
        'text-placeholder': '#DDD5CB',
        
        'backlog-bg': '#F2D9D9',
        'backlog-text': '#8B3A3A',
        'backlog-border': '#D4A5A5',
        
        'watching-bg': '#D6E8D6',
        'watching-text': '#2A6647',
        'watching-border': '#7BBD9B',
        
        'completed-bg': '#E0D6EE',
        'completed-text': '#4A3880',
        'completed-border': '#A98FD4',
        
        'rewatch-bg': '#FCE8D8',
        'rewatch-text': '#8B4A20',
        'rewatch-border': '#E0AA80',
        
        'rating-gold': '#C47E18',
        'rating-unset': '#DDD5CB',
        'progress-fill': '#C09A7A',
        'progress-track': '#EDE6DF',
        'edit-hover': '#C09A7A',
        'remove-hover': '#E87C7C',
        'logo-accent': '#C09A7A',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        'column-header': '7px',
        'platform-pill': '4px',
        'move-pill': '999px',
        'action-btn': '6px',
        'stepper-btn': '6px',
        search: '999px',
        empty: '10px',
      },
      spacing: {
        'padding-card': '18px',
        'gap-card-inner': '14px',
        'thumb-width': '72px',
        'thumb-height': '96px',
        'action-btn-size': '24px',
        'stepper-btn-size': '22px',
        'badge-size': '18px',
        'progress-height': '3px',
      },
      boxShadow: {
        'card-hover': '0 4px 16px rgba(0,0,0,0.07)',
      }
    },
  },
  plugins: [],
}
