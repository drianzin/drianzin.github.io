// Tema Claro/Escuro
document.getElementById('toggle-theme').addEventListener('click', function() {
    const body = document.body;
    const icon = this.querySelector('.material-icons');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        icon.textContent = 'brightness_3';  // Icone de lua para o modo escuro
    } else {
        icon.textContent = 'brightness_7';  // Icone de sol para o modo claro
    }
});

// Header 
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop == 0) {
        header.classList.remove('showing');
    }

    if (scrollTop > lastScrollTop && scrollTop > 150) {
        header.classList.add('hidden');
    }

    if (scrollTop < lastScrollTop && scrollTop > 150) {
        header.classList.remove('hidden');
        header.classList.add('showing');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Adiciona o evento de clique para os quadrados invisíveis
document.querySelectorAll('.invisible-square-acai, .invisible-square-combo').forEach(square => {
    square.addEventListener('click', function() {
        const imageUrl = this.getAttribute('data-fullscreen');
        openFullscreenImage(imageUrl);
    });
});

function openFullscreenImage(imageUrl) {
    // Desativa o scroll da página
    document.body.style.overflow = 'hidden';
    
    // Cria um elemento de fundo para a imagem em tela cheia
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '99';
    
    // Cria o elemento de imagem
    const image = document.createElement('img');
    image.src = imageUrl;
    image.style.borderRadius = '8px';
    image.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    image.style.zIndex = '9999';
    
    // Cria o botão de fechamento
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'fixed';
    closeButton.style.top = '20px';
    closeButton.style.right = '220px';
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '30px';
    closeButton.style.cursor = 'pointer';
    
    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
    });

    // Adiciona um evento de clique ao botão para fechar a imagem
    closeButton.addEventListener('click', function() {
        document.body.removeChild(overlay);
        document.body.style.overflow = ''; // Reativa o scroll da página
    });

    // Adiciona a imagem e o botão ao overlay, e o overlay ao corpo do documento
    overlay.appendChild(image);
    overlay.appendChild(closeButton);
    document.body.appendChild(overlay);
}
