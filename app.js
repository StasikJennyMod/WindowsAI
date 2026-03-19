// WindowsAI Mobile App
class WindowsAI {
    constructor() {
        this.apiProviders = {
            openai: {
                name: 'OpenAI',
                url: 'https://api.openai.com/v1/chat/completions',
                models: ['gpt-4', 'gpt-4-turbo-preview', 'gpt-3.5-turbo'],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                })
            },
            gemini: {
                name: 'Google Gemini',
                url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
                models: ['gemini-pro'],
                headers: (key) => ({
                    'Content-Type': 'application/json',
                    'x-goog-api-key': key
                })
            },
            groq: {
                name: 'Groq',
                url: 'https://api.groq.com/openai/v1/chat/completions',
                models: ['mixtral-8x7b-32768', 'llama2-70b-4096', 'gemma-7b-it'],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                })
            },
            openrouter: {
                name: 'OpenRouter',
                url: 'https://openrouter.ai/api/v1/chat/completions',
                models: ['openai/gpt-4', 'anthropic/claude-2', 'google/palm-2'],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'WindowsAI'
                })
            },
            anthropic: {
                name: 'Anthropic',
                url: 'https://api.anthropic.com/v1/messages',
                models: ['claude-3-opus', 'claude-3-sonnet', 'claude-2.1'],
                headers: (key) => ({
                    'x-api-key': key,
                    'anthropic-version': '2023-06-01',
                    'Content-Type': 'application/json'
                })
            },
            cohere: {
                name: 'Cohere',
                url: 'https://api.cohere.ai/v1/chat',
                models: ['command', 'command-light', 'command-nightly'],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                })
            },
            deepseek: {
                name: 'DeepSeek',
                url: 'https://api.deepseek.com/v1/chat/completions',
                models: ['deepseek-chat', 'deepseek-coder'],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                })
            },
            mistral: {
                name: 'Mistral AI',
                url: 'https://api.mistral.ai/v1/chat/completions',
                models: ['mistral-tiny', 'mistral-small', 'mistral-medium', 'mistral-large'],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                })
            }
        };

        this.currentProvider = 'openai';
        this.apiKey = '';
        this.currentModel = '';
        this.messages = [];
        this.attachedFile = null;
        
        this.init();
    }

    init() {
        // Загружаем сохраненные данные
        this.loadSavedData();
        
        // Инициализируем DOM элементы
        this.initializeElements();
        
        // Добавляем обработчики событий
        this.addEventListeners();
        
        // Загружаем модели для текущего провайдера
        this.updateModelSelect();
        
        // Показываем приветственное сообщение
        this.addSystemMessage('Добро пожаловать в WindowsAI! Выберите провайдера и введите API ключ для начала работы.');
    }

    initializeElements() {
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsPanel = document.getElementById('settingsPanel');
        this.closeSettings = document.getElementById('closeSettings');
        this.apiProvider = document.getElementById('apiProvider');
        this.apiKeyInput = document.getElementById('apiKey');
        this.saveKeyBtn = document.getElementById('saveKey');
        this.modelSelect = document.getElementById('modelSelect');
        this.apiStatus = document.getElementById('apiStatus');
        this.messagesContainer = document.getElementById('messages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.attachBtn = document.getElementById('attachBtn');
        this.filePreview = document.getElementById('filePreview');
        this.fileName = document.getElementById('fileName');
        this.removeFile = document.getElementById('removeFile');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.chatContainer = document.getElementById('chatContainer');
    }

    addEventListeners() {
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettings.addEventListener('click', () => this.closeSettingsPanel());
        this.saveKeyBtn.addEventListener('click', () => this.saveApiKey());
        this.apiProvider.addEventListener('change', () => this.onProviderChange());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.attachBtn.addEventListener('click', () => this.attachFile());
        this.removeFile.addEventListener('click', () => this.clearAttachedFile());
        
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        });

        // Закрытие настроек свайпом вниз
        let touchStartY = 0;
        this.settingsPanel.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });

        this.settingsPanel.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const diff = touchY - touchStartY;
            
            if (diff > 50) {
                this.closeSettingsPanel();
            }
        });
    }

    loadSavedData() {
        const savedProvider = localStorage.getItem('windowsai_provider');
        const savedKey = localStorage.getItem('windowsai_key');
        const savedModel = localStorage.getItem('windowsai_model');
        
        if (savedProvider) {
            this.currentProvider = savedProvider;
            this.apiProvider.value = savedProvider;
        }
        
        if (savedKey) {
            this.apiKey = savedKey;
            this.apiKeyInput.value = savedKey;
        }
        
        if (savedModel) {
            this.currentModel = savedModel;
        }
    }

    openSettings() {
        this.settingsPanel.classList.remove('hidden');
    }

    closeSettingsPanel() {
        this.settingsPanel.classList.add('hidden');
    }

    onProviderChange() {
        this.currentProvider = this.apiProvider.value;
        this.updateModelSelect();
        this.showApiStatus('Провайдер изменен', 'success');
    }

    updateModelSelect() {
        const provider = this.apiProviders[this.currentProvider];
        this.modelSelect.innerHTML = '';
        
        provider.models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            this.modelSelect.appendChild(option);
        });
        
        if (this.currentModel && provider.models.includes(this.currentModel)) {
            this.modelSelect.value = this.currentModel;
        } else {
            this.currentModel = provider.models[0];
            this.modelSelect.value = this.currentModel;
        }
    }

    saveApiKey() {
        const key = this.apiKeyInput.value.trim();
        
        if (!key) {
            this.showApiStatus('Введите API ключ', 'error');
            return;
        }
        
        this.apiKey = key;
        this.currentModel = this.modelSelect.value;
        
        // Сохраняем в localStorage
        localStorage.setItem('windowsai_provider', this.currentProvider);
        localStorage.setItem('windowsai_key', this.apiKey);
        localStorage.setItem('windowsai_model', this.currentModel);
        
        this.showApiStatus('API ключ сохранен!', 'success');
        
        // Проверяем соединение
        this.testConnection();
    }

    async testConnection() {
        try {
            this.showApiStatus('Проверка соединения...', 'success');
            
            const testMessage = 'Hello, this is a test message. Please respond with "OK" if you receive this.';
            const response = await this.makeApiRequest(testMessage);
            
            if (response) {
                this.showApiStatus('Соединение установлено!', 'success');
                this.addSystemMessage('✅ API подключен успешно! Можно начинать общение.');
                this.closeSettingsPanel();
            }
        } catch (error) {
            this.showApiStatus('Ошибка соединения: ' + error.message, 'error');
        }
    }

    showApiStatus(message, type) {
        this.apiStatus.textContent = message;
        this.apiStatus.className = `api-status ${type}`;
        setTimeout(() => {
            this.apiStatus.style.display = 'none';
        }, 3000);
    }

    async makeApiRequest(userMessage) {
        const provider = this.apiProviders[this.currentProvider];
        
        if (!this.apiKey) {
            throw new Error('API ключ не указан');
        }
        
        let requestBody;
        let url = provider.url;
        
        switch(this.currentProvider) {
            case 'gemini':
                url = `${provider.url}?key=${this.apiKey}`;
                requestBody = {
                    contents: [{
                        parts: [{
                            text: userMessage
                        }]
                    }]
                };
                break;
                
            case 'anthropic':
                requestBody = {
                    model: this.currentModel,
                    messages: [{
                        role: 'user',
                        content: userMessage
                    }],
                    max_tokens: 1024
                };
                break;
                
            case 'cohere':
                requestBody = {
                    message: userMessage,
                    model: this.currentModel,
                    chat_history: this.messages.map(msg => ({
                        role: msg.role === 'user' ? 'USER' : 'CHATBOT',
                        message: msg.content
                    }))
                };
                break;
                
            default:
                requestBody = {
                    model: this.currentModel,
                    messages: [
                        ...this.messages.map(msg => ({
                            role: msg.role === 'user' ? 'user' : 'assistant',
                            content: msg.content
                        })),
                        { role: 'user', content: userMessage }
                    ]
                };
        }
        
        const response = await fetch(url, {
            method: 'POST',
            headers: provider.headers(this.apiKey),
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`API Error: ${response.status} - ${error}`);
        }
        
        const data = await response.json();
        
        // Парсим ответ в зависимости от провайдера
        return this.parseResponse(data, this.currentProvider);
    }

    parseResponse(data, provider) {
        switch(provider) {
            case 'gemini':
                return data.candidates[0].content.parts[0].text;
                
            case 'anthropic':
                return data.content[0].text;
                
            case 'cohere':
                return data.text;
                
            default:
                return data.choices[0].message.content;
        }
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        
        if (!message && !this.attachedFile) {
            return;
        }
        
        if (!this.apiKey) {
            this.addSystemMessage('⚠️ Сначала введите API ключ в настройках');
            this.openSettings();
            return;
        }
        
        let finalMessage = message;
        
        if (this.attachedFile) {
            finalMessage = `[Файл: ${this.attachedFile.name}]\n\n${message || 'Проанализируй этот файл'}`;
        }
        
        // Добавляем сообщение пользователя
        this.addMessage(finalMessage, 'user');
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
        
        // Показываем индикатор печатания
        this.showTypingIndicator();
        
        // Очищаем прикрепленный файл
        this.clearAttachedFile();
        
        try {
            const response = await this.makeApiRequest(finalMessage);
            
            // Скрываем индикатор
            this.hideTypingIndicator();
            
            // Добавляем ответ ассистента
            this.addMessage(response, 'assistant');
            
            // Добавляем в историю
            this.messages.push(
                { role: 'user', content: finalMessage },
                { role: 'assistant', content: response }
            );
            
            // Ограничиваем историю
            if (this.messages.length > 20) {
                this.messages = this.messages.slice(-20);
            }
            
        } catch (error) {
            this.hideTypingIndicator();
            this.addSystemMessage(`❌ Ошибка: ${error.message}`);
            console.error('API Error:', error);
        }
    }

    addMessage(content, role) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        // Форматируем текст
        const formattedContent = this.formatMessage(content);
        messageDiv.innerHTML = formattedContent;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addSystemMessage(content) {
        this.addMessage(content, 'system');
    }

    formatMessage(text) {
        // Экранируем HTML
        let escaped = text.replace(/[&<>"]/g, function(match) {
            if (match === '&') return '&amp;';
            if (match === '<') return '&lt;';
            if (match === '>') return '&gt;';
            if (match === '"') return '&quot;';
            return match;
        });
        
        // Заменяем переносы строк на <br>
        escaped = escaped.replace(/\n/g, '<br>');
        
        // Простое форматирование кода
        escaped = escaped.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
        escaped = escaped.replace(/`(.*?)`/g, '<code>$1</code>');
        
        return escaped;
    }

    showTypingIndicator() {
        this.typingIndicator.classList.remove('hidden');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.typingIndicator.classList.add('hidden');
    }

    scrollToBottom() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    attachFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt,.json,.md,.js,.py,.html,.css,.pdf,.doc,.docx';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.attachedFile = file;
                this.fileName.textContent = `📎 ${file.name} (${this.formatFileSize(file.size)})`;
                this.filePreview.classList.remove('hidden');
                
                // Автоматически читаем текстовые файлы
                if (file.type.startsWith('text/') || file.name.match(/\.(txt|json|md|js|py|html|css)$/)) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.attachedFile.content = e.target.result;
                    };
                    reader.readAsText(file);
                }
            }
        };
        
        input.click();
    }

    formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    }

    clearAttachedFile() {
        this.attachedFile = null;
        this.filePreview.classList.add('hidden');
        this.fileName.textContent = '';
    }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    const app = new WindowsAI();
});
