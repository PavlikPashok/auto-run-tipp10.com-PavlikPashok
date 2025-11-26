// АВТОМАТИЧЕСКИЙ ТАЙПЕР С ПОВТОРОМ (БЫСТРЫЙ, БЕЗ ВЫВОДА)
function autoCircleTyper() {
    const input = document.querySelector('input, textarea');
    if (!input) {
        setTimeout(autoCircleTyper, 0);
        return;
    }

    // Берем текст из nobr
    const nobrAll = document.querySelectorAll('nobr');
    let originalText = '';
    nobrAll.forEach(e => originalText += e.textContent || '');

    if (!originalText || originalText.length < 5) {
        setTimeout(autoCircleTyper, 0);
        return;
    }

    // Перемещаем последнюю букву в начало
    const lastChar = originalText[originalText.length - 1];
    const restOfText = originalText.substring(0, originalText.length - 1);
    const modifiedText = lastChar + restOfText;

    let currentIndex = 0;

    function simulateKeyPress() {
        if (currentIndex >= modifiedText.length) {
            setTimeout(autoCircleTyper, 0); // ищем новый текст
            return;
        }

        const char = modifiedText[currentIndex];

        // Полная имитация нажатия клавиши
        const keyDownEvent = new KeyboardEvent('keydown', {
            key: char,
            code: getKeyCode(char),
            keyCode: char.charCodeAt(0),
            bubbles: true
        });

        const keyPressEvent = new KeyboardEvent('keypress', {
            key: char,
            code: getKeyCode(char),
            keyCode: char.charCodeAt(0),
            bubbles: true
        });

        input.value += char;

        const inputEvent = new Event('input', { bubbles: true });
        const changeEvent = new Event('change', { bubbles: true });

        const keyUpEvent = new KeyboardEvent('keyup', {
            key: char,
            code: getKeyCode(char),
            keyCode: char.charCodeAt(0),
            bubbles: true
        });

        // Диспачим события
        input.dispatchEvent(keyDownEvent);
        input.dispatchEvent(keyPressEvent);
        input.dispatchEvent(inputEvent);
        input.dispatchEvent(changeEvent);
        input.dispatchEvent(keyUpEvent);

        currentIndex++;
        simulateKeyPress(); // без задержки
    }

    function getKeyCode(char) {
        if (char === ' ') return 'Space';
        if (char === '\n') return 'Enter';
        if (/[a-zA-Z]/.test(char)) return 'Key' + char.toUpperCase();
        return 'Key' + char.toUpperCase();
    }

    input.focus();
    simulateKeyPress();
}

// Запуск
autoCircleTyper();
