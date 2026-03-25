class CyberNav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const currentPath = window.location.pathname;
        const page = currentPath.split('/').pop() || 'index.html';
        
        const links = [
            { href: 'index.html', icon: 'home', id: 'home', match: ['index.html', ''] },
            { href: 'gameplay.html?level=1', icon: 'videogame_asset', match: ['gameplay.html'] },
            { href: 'highscores.html', icon: 'leaderboard', match: ['highscores.html'] },
            { href: 'settings.html', icon: 'settings', match: ['settings.html'] }
        ];

        let navContent = `<nav class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-[#0d112a]/90 backdrop-blur-lg border-t border-white/5 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.6)]">`;
        
        links.forEach(link => {
            const isActive = link.match.some(m => page.startsWith(m));
            
            navContent += `
                <a class="flex flex-col items-center justify-center p-3 ${isActive ? 'bg-[#00d4ff]/10 text-[#00d4ff] rounded-xl' : 'text-slate-500 hover:text-white transition-all'}" href="${link.href}">
                    <span class="material-symbols-outlined" style="${isActive ? "font-variation-settings: 'FILL' 1;" : ""}">${link.icon}</span>
                </a>
            `;
        });
        
        navContent += `</nav>`;
        this.innerHTML = navContent;
    }
}
customElements.define('cyber-nav', CyberNav);
