function autoCircleTyper() {
    const input = document.querySelector('input, textarea');
    if (!input) return setTimeout(autoCircleTyper, 0);

    const nobrAll = document.querySelectorAll('nobr');
    let originalText = '';
    nobrAll.forEach(e => originalText += e.textContent || '');

    if (!originalText || originalText.length < 5) return setTimeout(autoCircleTyper, 1500);

    // Перемещаем последнюю букву в начало
    const lastChar = originalText[originalText.length - 1];
    const restOfText = originalText.substring(0, originalText.length - 1);
    const modifiedText = lastChar + restOfText;

    input.focus();

    // Подготавливаем данные заранее
    const eventsData = modifiedText.split('').map(char => ({
        char,
        code: getKeyCode(char),
        keyCode: char.charCodeAt(0)
    }));

    // Синхронная обработка всех символов
    for (let i = 0; i < eventsData.length; i++) {
        const { char, code, keyCode } = eventsData[i];

        const keyDownEvent = new KeyboardEvent('keydown', { key: char, code, keyCode, bubbles: true });
        const keyPressEvent = new KeyboardEvent('keypress', { key: char, code, keyCode, bubbles: true });
        const keyUpEvent = new KeyboardEvent('keyup', { key: char, code, keyCode, bubbles: true });

        input.value += char;

        input.dispatchEvent(keyDownEvent);
        input.dispatchEvent(keyPressEvent);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(keyUpEvent);
    }

    // Один раз после всего текста
    input.dispatchEvent(new Event('change', { bubbles: true }));

    // Продолжаем цикл поиска нового текста
    setTimeout(autoCircleTyper, 0);
}

// Функция для генерации кода клавиши
function getKeyCode(char) {
    if (char === ' ') return 'Space';
    if (char === '\n') return 'Enter';
    if (/[a-zA-Z]/.test(char)) return 'Key' + char.toUpperCase();
    return 'Key' + char.toUpperCase();
}

// Запуск
autoCircleTyper();
