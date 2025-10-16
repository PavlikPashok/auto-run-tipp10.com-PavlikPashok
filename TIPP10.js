// АВТОМАТИЧЕСКИЙ ТАЙПЕР С ПОВТОРОМ
function autoCircleTyper() {
    const input = document.querySelector('input, textarea');
    if (!input) {
        console.log('❌ Поле ввода не найдено');
        setTimeout(autoCircleTyper, 1000); // Пробуем снова через секунду
        return;
    }
    
    // Находим текст из nobr
    const nobrAll = document.querySelectorAll('nobr');
    let originalText = '';
    nobrAll.forEach(e => originalText += e.textContent || '');
    
    // Проверяем что текст найден и достаточно длинный
    if (!originalText || originalText.length < 5) {
        console.log('⏳ Текст не найден, ждем...');
        setTimeout(autoCircleTyper, 1500);
        return;
    }
    
    console.log('📝 Найден текст:', originalText);
    
    // Последнюю букву перемещаем в начало
    const lastChar = originalText[originalText.length - 1];
    const restOfText = originalText.substring(0, originalText.length - 1);
    const modifiedText = lastChar + restOfText;
    
    console.log('🔄 Печатаем:', modifiedText);
    
    let currentIndex = 0;
    
    function simulateKeyPress() {
        if (currentIndex >= modifiedText.length) {
            console.log('✅ Текст напечатан! Ищем следующий...');
            
            // Ждем немного и ищем новый текст
            setTimeout(() => {
                console.log('🔄 Проверяем новый текст...');
                autoCircleTyper(); // Запускаем снова
            }, 2000);
            
            return;
        }
        
        const char = modifiedText[currentIndex];
        
        // ПОЛНАЯ ИМИТАЦИЯ НАЖАТИЯ КЛАВИШИ
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
        
        // ДИСПАТЧИМ СОБЫТИЯ
        input.dispatchEvent(keyDownEvent);
        input.dispatchEvent(keyPressEvent);
        input.dispatchEvent(inputEvent);
        input.dispatchEvent(changeEvent);
        input.dispatchEvent(keyUpEvent);
        
        console.log(`🎹 ${currentIndex + 1}/${modifiedText.length}: "${char === ' ' ? '[ПРОБЕЛ]' : char}"`);
        
        currentIndex++;
        setTimeout(simulateKeyPress, 120);
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

// Запускаем авто-тайпер
autoCircleTyper();

