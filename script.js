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
    document.body.style.overflow = 'hidden'; // Desativa o scroll da página
    
    // Cria um elemento de fundo para a imagem em tela cheia
    const overlay = document.createElement('div');
    overlay.className = 'overlayImg';
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
    const icon = document.createElement('span');

    icon.className = 'material-icons';
    icon.textContent = 'close';

    closeButton.style.position = 'fixed';
    closeButton.style.top = '20px';
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '30px';
    closeButton.style.cursor = 'pointer';
    
    closeButton.appendChild(icon);
    // Evita o fechamento ao clicar no botão ou na imagem
    image.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    closeButton.addEventListener('click', function(event) {
        event.stopPropagation();
        document.body.removeChild(overlay);
        document.body.style.overflow = ''; // Reativa o scroll da página
    });

    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
    });

    // Adiciona a imagem e o botão ao overlay, e o overlay ao corpo do documento
    overlay.appendChild(image);
    overlay.appendChild(closeButton);
    document.body.appendChild(overlay);
}

// Carregar preferências do tema do localStorage
document.addEventListener('DOMContentLoaded', () => {
    const darkThemeEnabled = JSON.parse(localStorage.getItem('darkThemeEnabled'));
    const selectedTheme = localStorage.getItem('selectedTheme');

    if (darkThemeEnabled) {
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
    }

    if (selectedTheme) {
        document.body.classList.add(selectedTheme);
    }
});

// Menu de opções
document.getElementById('menu-icon').addEventListener('click', function() {
    openFullscreenMenu();
});

function openFullscreenMenu() {
    document.body.style.overflow = 'hidden'; // Desativa o scroll da página
    const body = document.body;
    
    // Cria um elemento de fundo para o menu em tela cheia
    const overlay = document.createElement('div');
    overlay.id = 'overlayMenu';
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

    // Cria o menu
    const menuBg = document.createElement('div');
    menuBg.className = 'menuBg';

    const menuTitle = document.createElement('section');
    menuTitle.textContent = 'Menu';
    menuTitle.id = 'menuTitle';

    // Criação do menuOptions
    const menuOptions = document.createElement('section');
    menuOptions.className = 'menuOptions';

    // Cria um contêiner para o texto e o botão do modo noturno
    const nightModeContainer = document.createElement('div');
    nightModeContainer.className = 'nightModeContainer';

    // Adicionando o texto "Modo Noturno"
    const text1 = document.createTextNode('Modo Noturno');

    const menuButton = document.createElement('button');
    menuButton.id = 'toggle-theme';

    const icon = document.createElement('span');
    icon.className = 'material-icons';
    updateIcon(); // Atualiza o ícone ao criar o menu

    menuButton.appendChild(icon);

    // Adiciona o texto e o botão ao contêiner
    nightModeContainer.appendChild(text1);
    nightModeContainer.appendChild(menuButton);

    // Adiciona o contêiner ao menuOptions
    menuOptions.appendChild(nightModeContainer);

    // Adicionando o texto "Tema" ao menuOptions
    const text2 = document.createTextNode('Tema');
    text2.className = 'Tema';
    menuOptions.appendChild(text2);

    // Criação do contêiner de temas (apenas para o texto)
    const themeContainer = document.createElement('div');
    themeContainer.className = 'themeContainer';

    // Tema Azul
    const blueThemeContainer = document.createElement('div');
    blueThemeContainer.className = 'blueThemeContainer';

    const text3 = document.createTextNode('Azul');
    blueThemeContainer.appendChild(text3);

    // Tema Amarelo
    const defaultThemeContainer = document.createElement('div');
    defaultThemeContainer.className = 'defaultThemeContainer';

    const text4 = document.createTextNode('Amarelo');
    defaultThemeContainer.appendChild(text4);

    // Tema Laranja
    const orangeThemeContainer = document.createElement('div');
    orangeThemeContainer.className = 'orangeThemeContainer';

    const text5 = document.createTextNode('Laranja');
    orangeThemeContainer.appendChild(text5);

    // Adiciona os contêineres de temas ao contêiner principal de temas
    themeContainer.appendChild(blueThemeContainer);
    themeContainer.appendChild(defaultThemeContainer);
    themeContainer.appendChild(orangeThemeContainer);

    // Adiciona o contêiner de temas ao menuOptions
    menuOptions.appendChild(themeContainer);

    // Criação de um contêiner separado para os botões de temas
    const buttonsThemeContainer = document.createElement('div');
    buttonsThemeContainer.className = 'buttonsThemeContainer';

    // Botão azul
    const menuButtonBlue = document.createElement('button');
    menuButtonBlue.id = 'blue-theme';
    menuButtonBlue.textContent = 'Aplicar Azul';

    // Botão amarelo
    const menuButtonDefault = document.createElement('button');
    menuButtonDefault.id = 'default-theme-button';
    menuButtonDefault.textContent = 'Aplicar Amarelo';

    // Botão laranja
    const menuButtonOrange = document.createElement('button');
    menuButtonOrange.id = 'orange-theme-button';
    menuButtonOrange.textContent = 'Aplicar Laranja';

    // Adiciona os botões ao contêiner de botões
    buttonsThemeContainer.appendChild(menuButtonBlue);
    buttonsThemeContainer.appendChild(menuButtonDefault);
    buttonsThemeContainer.appendChild(menuButtonOrange);

    // Adiciona o contêiner de botões ao menuOptions
    menuOptions.appendChild(buttonsThemeContainer);

    // Previne o fechamento ao clicar nos elementos do menu
    menuBg.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Adiciona os elementos ao DOM
    overlay.appendChild(menuBg);
    menuBg.appendChild(menuTitle);
    menuBg.appendChild(menuOptions);
    document.body.appendChild(overlay);

    // Evento de clique para alternar o tema
    document.getElementById('toggle-theme').addEventListener('click', function() {        
        body.classList.toggle('light-mode');
        localStorage.setItem('darkThemeEnabled', !document.body.classList.contains('light-mode'));
        updateIcon(); // Atualiza o ícone após a alternância do tema
    });

    // Atualiza o ícone com base no tema atual
    function updateIcon() {
        if (body.classList.contains('light-mode')) {
            icon.textContent = 'toggle_off';
        } else {
            icon.textContent = 'toggle_on';
        }
    }

    // Evento de clique para aplicar o tema azul
    document.getElementById('blue-theme').addEventListener('click', function() {
        applyTheme('blue-theme');
    });

    // Evento de clique para aplicar o tema amarelo
    document.getElementById('default-theme-button').addEventListener('click', function() {
        applyTheme('');
    });

    // Evento de clique para aplicar o tema laranja
    document.getElementById('orange-theme-button').addEventListener('click', function() {
        applyTheme('orange-theme');
    });

    // Função para aplicar o tema e salvar no localStorage
    function applyTheme(themeClass) {
        body.classList.remove('blue-theme', 'orange-theme');
        if (themeClass) {
            body.classList.add(themeClass);
        }
        localStorage.setItem('selectedTheme', themeClass);
    }

    // Fechar ao clicar no overlay
    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
        document.body.style.overflow = '';
    });
}
