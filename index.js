// DOM Elements
const textInput = document.getElementById('text-to-translate');
const translateBtn = document.getElementById('translate-btn');
const resultDiv = document.getElementById('translation-result');
const languageButtons = document.querySelectorAll('.language-btn');

let selectedLanguage = null;

// Initialize UI
function initializeUI() {
    translateBtn.disabled = true;
}

// Event Listeners
languageButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        languageButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = 'scale(1)';
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        this.style.transform = 'scale(1.1)';
        
        // Update selected language
        selectedLanguage = this.dataset.language;
        
        // Enable translate button if text is present
        translateBtn.disabled = !textInput.value.trim();
        
        // Clear previous translation
        resultDiv.textContent = '';
    });
});

textInput.addEventListener('input', function() {
    translateBtn.disabled = !this.value.trim() || !selectedLanguage;
    // Clear previous translation when input changes
    resultDiv.textContent = '';
});

// Handle translation
async function handleTranslation() {
    if (!selectedLanguage || !textInput.value.trim()) {
        alert('Please select a language and enter text to translate');
        return;
    }

    const originalText = textInput.value.trim();
    setLoadingState(true);
    resultDiv.textContent = 'Translating...';

    const API_URL = window.location.hostname === 'localhost'
        ? 'http://127.0.0.1:8787'  // Local development URL
        : 'https://pollyglot-backend.samuelsmith442.workers.dev';  // Production URL

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                text: originalText,
                language: selectedLanguage
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Translation failed:', errorData || response.statusText);
            throw new Error(errorData?.error || 'Translation failed');
        }

        const data = await response.json();
        resultDiv.innerHTML = formatTranslationResult(originalText, data.translation);
    } catch (error) {
        console.error('Translation error:', error);
        resultDiv.textContent = `Translation failed: ${error.message}`;
    } finally {
        setLoadingState(false);
    }
}

// Format translation result
function formatTranslationResult(originalText, translatedText) {
    return `
        <div class="translation-container">
            <div class="original-text">
                <h3>Original Text:</h3>
                <p>${originalText}</p>
            </div>
            <div class="translation-divider">➜</div>
            <div class="translated-text">
                <h3>Translation (${selectedLanguage}):</h3>
                <p>${translatedText}</p>
            </div>
            <button class="reset-btn" onclick="window.resetUIState()">New Translation</button>
        </div>
    `;
}

// Reset UI state
function resetUIState() {
    languageButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = 'scale(1)';
    });
    selectedLanguage = null;
    textInput.value = '';
    resultDiv.textContent = '';
    translateBtn.disabled = true;
    translateBtn.textContent = 'Translate';
}

// Set loading state
function setLoadingState(isLoading) {
    translateBtn.disabled = isLoading;
    translateBtn.textContent = isLoading ? 'Translating...' : 'Translate';
    if (isLoading) {
        translateBtn.classList.add('loading');
    } else {
        translateBtn.classList.remove('loading');
    }
}

// Add click event listener for translate button
translateBtn.addEventListener('click', handleTranslation);

// Make resetUIState available globally
window.resetUIState = resetUIState;

// Initialize the UI
initializeUI();