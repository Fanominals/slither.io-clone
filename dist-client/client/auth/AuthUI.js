export function renderAuthButton({ authenticated, onSignIn, onSignOut, containerId = 'auth-buttons', }) {
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.style.position = 'absolute';
        container.style.top = '24px';
        container.style.right = '32px';
        container.style.zIndex = '1000';
        // Append to #menu instead of body for correct layering
        const menu = document.getElementById('menu');
        if (menu) {
            menu.appendChild(container);
        }
        else {
            document.body.appendChild(container);
        }
    }
    container.innerHTML = '';
    const button = document.createElement('button');
    button.style.padding = '10px 18px';
    button.style.borderRadius = '18px';
    button.style.border = 'none';
    button.style.background = '#222';
    button.style.color = '#fff';
    button.style.fontWeight = 'bold';
    button.style.fontSize = '1rem';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    button.style.transition = 'background 0.2s';
    button.onmouseenter = () => (button.style.background = '#444');
    button.onmouseleave = () => (button.style.background = '#222');
    if (authenticated) {
        button.textContent = 'Sign out';
        button.onclick = onSignOut;
    }
    else {
        button.textContent = 'Sign in with Google';
        button.onclick = onSignIn;
    }
    container.appendChild(button);
}
//# sourceMappingURL=AuthUI.js.map