tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "surface": "#0d112a", "surface-dim": "#0d112a", "surface-bright": "#343752",
                "surface-container": "#1a1e37", "surface-container-low": "#161a33",
                "surface-container-high": "#242842", "surface-container-highest": "#2f334e",
                "surface-container-lowest": "#080c25",
                "on-surface": "#dee0ff", "on-surface-variant": "#bbc9cf",
                "primary": "#a8e8ff", "primary-container": "#00d4ff", "primary-fixed-dim": "#3cd7ff",
                "on-primary": "#003642", "on-primary-container": "#00586b",
                "secondary": "#f5fff3", "secondary-container": "#34ff8d", "secondary-fixed": "#60ff99",
                "on-secondary": "#003919",
                "tertiary": "#ffd5d8", "tertiary-container": "#ffadb6",
                "error": "#ffb4ab", "error-container": "#93000a",
                "on-error": "#690005", "on-error-container": "#ffdad6",
                "outline": "#859398", "outline-variant": "#3c494e",
                "background": "#0d112a", "on-background": "#dee0ff",
                "inverse-primary": "#00677e", "inverse-surface": "#dee0ff", "inverse-on-surface": "#2b2f49",
            },
            fontFamily: { "headline": ["Orbitron", "Space Grotesk"], "body": ["Inter"], "label": ["Inter"] },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
        },
    },
};
