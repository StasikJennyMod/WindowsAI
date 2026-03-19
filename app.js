// WindowsAI Mobile - Главный файл приложения
class WindowsAI {
    constructor() {
        // Конфигурация провайдеров
        this.providers = {
            openai: {
                name: 'OpenAI',
                icon: 'bolt',
                color: '#19C37D',
                url: 'https://api.openai.com/v1/chat/completions',
                models: [
                    { id: 'gpt-4-turbo-preview', name: 'GPT-4 Turbo', desc: 'Самая мощная модель', context: 128000 },
                    { id: 'gpt-4-vision-preview', name: 'GPT-4 Vision', desc: 'С поддержкой изображений', context: 128000 },
                    { id: 'gpt-4', name: 'GPT-4', desc: 'Классическая модель', context: 8192 },
                    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', desc: 'Быстрая и экономичная', context: 16385 }
                ],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                })
            },
            gemini: {
                name: 'Google Gemini',
                icon: 'psychology',
                color: '#4285F4',
                url: 'https://generativelanguage.googleapis.com/v1beta/models/',
                models: [
                    { id: 'gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro', desc: 'Самая новая модель', context: 1000000 },
                    { id: 'gemini-1.5-flash-latest', name: 'Gemini 1.5 Flash', desc: 'Быстрая модель', context: 1000000 },
                    { id: 'gemini-pro', name: 'Gemini Pro', desc: 'Продвинутая модель', context: 32768 },
                    { id: 'gemini-pro-vision', name: 'Gemini Vision', desc: 'Мультимодальная', context: 16384 }
                ],
                headers: (key) => ({
                    'Content-Type': 'application/json'
                })
            },
            claude: {
                name: 'Anthropic Claude',
                icon: 'smart_toy',
                color: '#6A4FE6',
                url: 'https://api.anthropic.com/v1/messages',
                models: [
                    { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', desc: 'Максимальная точность', context: 200000 },
                    { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', desc: 'Баланс скорости и качества', context: 200000 },
                    { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', desc: 'Быстрая модель', context: 200000 },
                    { id: 'claude-2.1', name: 'Claude 2.1', desc: 'Стабильная версия', context: 100000 }
                ],
                headers: (key) => ({
                    'x-api-key': key,
                    'anthropic-version': '2023-06-01',
                    'Content-Type': 'application/json'
                })
            },
            groq: {
                name: 'Groq',
                icon: 'speed',
                color: '#F55036',
                url: 'https://api.groq.com/openai/v1/chat/completions',
                models: [
                    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', desc: 'Очень быстрая', context: 32768 },
                    { id: 'llama2-70b-4096', name: 'Llama 2 70B', desc: 'Мощная открытая модель', context: 4096 },
                    { id: 'gemma-7b-it', name: 'Gemma 7B', desc: 'От Google', context: 8192 }
                ],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                })
            },
            openrouter: {
                name: 'OpenRouter',
                icon: 'router',
                color: '#FF6B6B',
                url: 'https://openrouter.ai/api/v1/chat/completions',
                models: [
                    { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo', desc: 'Через OpenRouter', context: 128000 },
                    { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', desc: 'Через OpenRouter', context: 200000 },
                    { id: 'meta-llama/llama-3-70b', name: 'Llama 3 70B', desc: 'Через OpenRouter', context: 8192 },
                    { id: 'google/gemini-pro', name: 'Gemini Pro', desc: 'Через OpenRouter', context: 32768 }
                ],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://windowsai.app',
                    'X-Title': 'WindowsAI Mobile'
                })
            },
            mistral: {
                name: 'Mistral AI',
                icon: 'whatshot',
                color: '#FF8A5C',
                url: 'https://api.mistral.ai/v1/chat/completions',
                models: [
                    { id: 'mistral-large-latest', name: 'Mistral Large', desc: 'Флагманская модель', context: 32768 },
                    { id: 'mistral-medium-latest', name: 'Mistral Medium', desc: 'Сбалансированная', context: 32768 },
                    { id: 'mistral-small-latest', name: 'Mistral Small', desc: 'Быстрая', context: 32768 }
                ],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                })
            },
            deepseek: {
                name: 'DeepSeek',
                icon: 'search',
                color: '#4A90E2',
                url: 'https://api.deepseek.com/v1/chat/completions',
                models: [
                    { id: 'deepseek-chat', name: 'DeepSeek Chat', desc: 'Для общения', context: 32768 },
                    { id: 'deepseek-coder', name: 'DeepSeek Coder', desc: 'Для программирования', context: 32768 }
                ],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                })
            },
            cohere: {
                name: 'Cohere',
                icon: 'co2',
                color: '#39594D',
                url: 'https://api.cohere.ai/v1/chat',
                models: [
                    { id: 'command-r-plus', name: 'Command R+', desc: 'Продвинутая RAG модель', context: 128000 },
                    { id: 'command-r', name: 'Command R', desc: 'Сбалансированная', context: 128000 },
                    { id: 'command-light', name: 'Command Light', desc: 'Легкая версия', context: 4096 }
                ],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                })
            },
            perplexity: {
                name: 'Perplexity',
                icon: 'psychology_alt',
                color: '#5436DA',
                url: 'https://api.perplexity.ai/chat/completions',
                models: [
                    { id: 'pplx-7b-online', name: 'PP 7B Online', desc: 'С онлайн доступом', context: 4096 },
                    { id: 'pplx-70b-online', name: 'PP 70B Online', desc: 'С онлайн доступом', context: 4096 },
                    { id: 'mixtral-8x7b-instruct', name: 'Mixtral Instruct', desc: 'Инструктивная', context: 4096 }
                ],
                headers: (key) => ({
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/json'
                })
            }
        };

        // Состояние приложения
        this.currentProvider = 'openai';
        this.currentModel = 'gpt-4-turbo-preview';
        this.apiKey = '';
        this.messages = [];
        this.attachedFile = null;
        this.conversationHistory = [];
        this.isProcessing = false;
        this.recognition = null;
        this.currentTheme = 'dark';

        // Инициализация
        this.init();
    }

    init() {
        this.loadSavedData();
        this.initElements();
        this.initEventListeners();
        this.initVoiceRecognition();
        this.renderProviders();
        this.renderModels();
        this.renderModelChips();
        this.updateTime();
        this.showWelcomeMessage();
        
        // Запускаем обновление времени
        setInterval(() => this.updateTime(), 1000);
        
        console.log('WindowsAI Mobile инициализирован 🚀');
    }

    initElements() {
        // Основные элементы
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettings = document.getElementById('closeSettings');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.attachBtn = document.getElementById('attachBtn');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.attachmentPreview = document.getElementById('attachmentPreview');
        this.fileName = document.getElementById('fileName');
        this.removeFile = document.getElementById('removeFile');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.toastContainer = document.getElementById('toastContainer');
        this.modelChips = document.getElementById('modelChips');
        this.providerGrid = document.getElementById('providerGrid');
        this.modelList = document.getElementById('modelList');
        this.apiKeyInput = document.getElementById('apiKey');
        this.saveKeyBtn = document.getElementById('saveKey');
        this.connectionStatus = document.getElementById('connectionStatus');
        this.toggleKeyVisibility = document.getElementById('toggleKeyVisibility');
        this.chatArea = document.querySelector('.chat-area');
        this.quickActions = document.querySelectorAll('.quick-action');
    }

    initEventListeners() {
        // Основные кнопки
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettings.addEventListener('click', () => this.closeSettings());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.attachBtn.addEventListener('click', () => this.attachFile());
        this.voiceBtn.addEventListener('click', () => this.startVoiceInput());
        this.removeFile.addEventListener('click', () => this.clearAttachment());
        this.saveKeyBtn.addEventListener('click', () => this.saveApiKey());
        this.toggleKeyVisibility.addEventListener('click', () => this.toggleKeyVisibility());

        // Быстрые действия
        this.quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const provider = action.dataset.provider;
                if (provider && this.providers[provider]) {
                    this.selectProvider(provider);
                    this.openSettings();
                }
            });
        });

        // Закрытие модалки по свайпу
        let touchStart = 0;
        this.settingsModal.addEventListener('touchstart', (e) => {
            touchStart = e.touches[0].clientY;
        });

        this.settingsModal.addEventListener('touchmove', (e) => {
            if (!this.settingsModal.classList.contains('hidden')) {
                const touchY = e.touches[0].clientY;
                const diff = touchY - touchStart;
                
                if (diff > 50) {
                    this.closeSettings();
                }
            }
        });

        // Enter для отправки
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Авто-высота textarea
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        });

        // Клик вне модалки
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.closeSettings();
            }
        });

        // Обработка сообщений для копирования
        this.messagesContainer.addEventListener('contextmenu', (e) => {
            const message = e.target.closest('.message');
            if (message) {
                e.preventDefault();
                const content = message.querySelector('.message-content')?.textContent || message.textContent;
                this.showContextMenu(e, content, message);
            }
        });

        // Долгое нажатие для копирования
        let longPressTimer;
        this.messagesContainer.addEventListener('touchstart', (e) => {
            const message = e.target.closest('.message');
            if (message) {
                longPressTimer = setTimeout(() => {
                    const content = message.querySelector('.message-content')?.textContent || message.textContent;
                    this.copyToClipboard(content);
                    this.showToast('Скопировано в буфер', 'success');
                }, 500);
            }
        });

        this.messagesContainer.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        });

        this.messagesContainer.addEventListener('touchmove', () => {
            clearTimeout(longPressTimer);
        });

        // Обработка изменений сети
        window.addEventListener('online', () => {
            this.showToast('Соединение восстановлено', 'success');
        });

        window.addEventListener('offline', () => {
            this.showToast('Нет соединения с интернетом', 'error');
        });
    }

    initVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'ru-RU';
            
            this.recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                this.messageInput.value = text;
                this.messageInput.style.height = 'auto';
                this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
                this.voiceBtn.style.background = '';
                this.showToast('Голос распознан', 'success');
            };
            
            this.recognition.onerror = (event) => {
                this.voiceBtn.style.background = '';
                this.showToast('Ошибка распознавания: ' + event.error, 'error');
            };
            
            this.recognition.onend = () => {
                this.voiceBtn.style.background = '';
            };
        }
    }

    loadSavedData() {
        try {
            this.apiKey = localStorage.getItem('windowsai_key') || '';
            this.currentProvider = localStorage.getItem('windowsai_provider') || 'openai';
            this.currentModel = localStorage.getItem('windowsai_model') || 'gpt-4-turbo-preview';
            this.currentTheme = localStorage.getItem('windowsai_theme') || 'dark';
            
            if (this.apiKey) {
                this.apiKeyInput.value = this.apiKey;
            }
            
            // Загружаем историю чатов
            const savedHistory = localStorage.getItem('windowsai_history');
            if (savedHistory) {
                this.conversationHistory = JSON.parse(savedHistory);
            }
            
            console.log('Данные загружены:', this.currentProvider, this.currentModel);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    }

    renderProviders() {
        this.providerGrid.innerHTML = '';
        
        Object.entries(this.providers).forEach(([id, provider]) => {
            const providerEl = document.createElement('div');
            providerEl.className = `provider-item ${id === this.currentProvider ? 'active' : ''}`;
            providerEl.dataset.provider = id;
            providerEl.innerHTML = `
                <span class="material-icons" style="color: ${provider.color}">${provider.icon}</span>
                <span>${provider.name}</span>
            `;
            
            providerEl.addEventListener('click', () => this.selectProvider(id));
            this.providerGrid.appendChild(providerEl);
        });
    }

    selectProvider(providerId) {
        this.currentProvider = providerId;
        document.querySelectorAll('.provider-item').forEach(el => {
            el.classList.toggle('active', el.dataset.provider === providerId);
        });
        
        this.renderModels();
        this.renderModelChips();
        
        // Автоматически выбираем первую модель
        if (this.providers[providerId].models.length > 0) {
            this.currentModel = this.providers[providerId].models[0].id;
        }
        
        this.showToast(`Провайдер: ${this.providers[providerId].name}`, 'success');
        
        // Обновляем статус подключения
        if (this.apiKey) {
            this.updateConnectionStatus();
        }
    }

    renderModels() {
        const provider = this.providers[this.currentProvider];
        this.modelList.innerHTML = '';
        
        provider.models.forEach(model => {
            const modelEl = document.createElement('div');
            modelEl.className = `model-item ${model.id === this.currentModel ? 'active' : ''}`;
            modelEl.dataset.model = model.id;
            modelEl.innerHTML = `
                <div class="model-radio"></div>
                <div class="model-info">
                    <div class="model-name">${model.name}</div>
                    <div class="model-desc">${model.desc}</div>
                    <div class="model-context">${this.formatContextSize(model.context)} контекст</div>
                </div>
            `;
            
            modelEl.addEventListener('click', () => this.selectModel(model.id));
            this.modelList.appendChild(modelEl);
        });
    }

    selectModel(modelId) {
        this.currentModel = modelId;
        document.querySelectorAll('.model-item').forEach(el => {
            el.classList.toggle('active', el.dataset.model === modelId);
        });
        
        localStorage.setItem('windowsai_model', modelId);
        this.renderModelChips();
        
        const model = this.getCurrentModel();
        this.showToast(`Модель: ${model.name}`, 'success');
    }

    renderModelChips() {
        const provider = this.providers[this.currentProvider];
        this.modelChips.innerHTML = '';
        
        provider.models.forEach(model => {
            const chip = document.createElement('button');
            chip.className = `model-chip ${model.id === this.currentModel ? 'active' : ''}`;
            chip.textContent = model.name.split(' ')[0];
            chip.dataset.model = model.id;
            
            chip.addEventListener('click', () => this.selectModel(model.id));
            this.modelChips.appendChild(chip);
        });
    }

    formatContextSize(size) {
        if (size >= 1000000) {
            return (size / 1000000).toFixed(1) + 'M';
        } else if (size >= 1000) {
            return (size / 1000).toFixed(0) + 'K';
        }
        return size.toString();
    }

    async saveApiKey() {
        const key = this.apiKeyInput.value.trim();
        
        if (!key) {
            this.showToast('Введите API ключ', 'error');
            this.apiKeyInput.style.animation = 'shake 0.3s ease';
            setTimeout(() => {
                this.apiKeyInput.style.animation = '';
            }, 300);
            return;
        }
        
        this.apiKey = key;
        
        try {
            localStorage.setItem('windowsai_key', key);
            localStorage.setItem('windowsai_provider', this.currentProvider);
            
            this.showToast('API ключ сохранен!', 'success');
            this.connectionStatus.classList.remove('hidden');
            
            // Тестируем соединение
            await this.testConnection();
            
        } catch (error) {
            console.error('Ошибка сохранения:', error);
            this.showToast('Ошибка сохранения ключа', 'error');
        }
    }

    async testConnection() {
        const provider = this.providers[this.currentProvider];
        
        this.connectionStatus.querySelector('.status-text').textContent = 
            `Подключаюсь к ${provider.name}...`;
        this.connectionStatus.style.background = 'rgba(52, 152, 219, 0.1)';
        this.connectionStatus.style.borderColor = 'rgba(52, 152, 219, 0.3)';
        
        try {
            // Отправляем тестовый запрос
            const result = await this.makeAPIRequest('Тестовое сообщение. Ответь "OK" если слышишь меня.', true);
            
            if (result) {
                this.connectionStatus.querySelector('.status-text').textContent = 
                    `✅ Подключено к ${provider.name}`;
                this.connectionStatus.style.background = 'rgba(39, 174, 96, 0.15)';
                this.connectionStatus.style.borderColor = 'rgba(39, 174, 96, 0.4)';
                
                this.showToast('Подключение успешно!', 'success');
                
                setTimeout(() => {
                    this.closeSettings();
                }, 1500);
            }
        } catch (error) {
            console.error('Ошибка подключения:', error);
            
            this.connectionStatus.querySelector('.status-text').textContent = 
                `❌ Ошибка: ${error.message}`;
            this.connectionStatus.style.background = 'rgba(231, 76, 60, 0.15)';
            this.connectionStatus.style.borderColor = 'rgba(231, 76, 60, 0.4)';
            
            this.showToast('Ошибка подключения', 'error');
        }
    }

    updateConnectionStatus() {
        const statusEl = this.connectionStatus;
        if (this.apiKey) {
            statusEl.classList.remove('hidden');
            statusEl.querySelector('.status-text').textContent = 
                `Ключ сохранен для ${this.providers[this.currentProvider].name}`;
            statusEl.style.background = 'rgba(39, 174, 96, 0.1)';
        } else {
            statusEl.classList.add('hidden');
        }
    }

    toggleKeyVisibility() {
        const type = this.apiKeyInput.type;
        this.apiKeyInput.type = type === 'password' ? 'text' : 'password';
        this.toggleKeyVisibility.innerHTML = `<span class="material-icons">${
            type === 'password' ? 'visibility' : 'visibility_off'
        }</span>`;
    }

    async sendMessage() {
        if (this.isProcessing) {
            this.showToast('Подождите, обрабатывается предыдущий запрос', 'info');
            return;
        }
        
        const text = this.messageInput.value.trim();
        
        if (!text && !this.attachedFile) {
            this.messageInput.style.animation = 'shake 0.3s ease';
            setTimeout(() => {
                this.messageInput.style.animation = '';
            }, 300);
            return;
        }
        
        if (!this.apiKey) {
            this.showToast('Сначала введите API ключ в настройках', 'error');
            this.openSettings();
            return;
        }
        
        if (!navigator.onLine) {
            this.showToast('Нет соединения с интернетом', 'error');
            return;
        }
        
        // Формируем сообщение
        let messageText = text;
        if (this.attachedFile) {
            if (this.attachedFile.type.startsWith('image/')) {
                messageText = `[Изображение: ${this.attachedFile.name}]\n\n${text || 'Опиши это изображение'}`;
            } else {
                messageText = `[Файл: ${this.attachedFile.name}]\n\n${text || 'Проанализируй этот файл'}`;
            }
        }
        
        // Добавляем сообщение пользователя
        this.addMessage(messageText, 'user');
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
        
        // Сохраняем в историю
        this.conversationHistory.push({
            role: 'user',
            content: messageText,
            timestamp: new Date().toISOString()
        });
        
        // Показываем индикатор печатания
        this.showTypingIndicator();
        this.isProcessing = true;
        
        // Убираем приветствие
        const welcome = document.querySelector('.message-welcome');
        if (welcome) welcome.remove();
        
        // Очищаем прикрепленный файл
        this.clearAttachment();
        
        try {
            // Отправляем запрос к API
            const response = await this.makeAPIRequest(messageText);
            
            // Скрываем индикатор
            this.hideTypingIndicator();
            
            // Добавляем ответ
            this.addMessage(response, 'assistant');
            
            // Сохраняем в историю
            this.conversationHistory.push({
                role: 'assistant',
                content: response,
                timestamp: new Date().toISOString()
            });
            
            // Ограничиваем историю
            if (this.conversationHistory.length > 50) {
                this.conversationHistory = this.conversationHistory.slice(-50);
            }
            
            // Сохраняем историю
            localStorage.setItem('windowsai_history', JSON.stringify(this.conversationHistory));
            
        } catch (error) {
            console.error('Ошибка отправки:', error);
            this.hideTypingIndicator();
            this.addMessage(`❌ Ошибка: ${error.message}`, 'system');
            this.showToast('Ошибка при обращении к API', 'error');
        } finally {
            this.isProcessing = false;
        }
    }

    async makeAPIRequest(message, isTest = false) {
        const provider = this.providers[this.currentProvider];
        const model = this.getCurrentModel();
        
        if (!this.apiKey) {
            throw new Error('API ключ не указан');
        }
        
        let url = provider.url;
        let requestBody;
        
        // Формируем запрос в зависимости от провайдера
        switch(this.currentProvider) {
            case 'gemini':
                url = `${provider.url}${model.id}:generateContent?key=${this.apiKey}`;
                requestBody = {
                    contents: [{
                        parts: [{
                            text: message
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 2048
                    }
                };
                break;
                
            case 'claude':
                requestBody = {
                    model: model.id,
                    messages: [{
                        role: 'user',
                        content: message
                    }],
                    max_tokens: 1024,
                    temperature: 0.7
                };
                break;
                
            case 'cohere':
                requestBody = {
                    message: message,
                    model: model.id,
                    temperature: 0.7,
                    chat_history: this.conversationHistory.slice(-10).map(msg => ({
                        role: msg.role === 'user' ? 'USER' : 'CHATBOT',
                        message: msg.content
                    }))
                };
                break;
                
            default:
                // OpenAI, Groq, OpenRouter, Mistral, DeepSeek, Perplexity
                requestBody = {
                    model: model.id,
                    messages: [
                        {
                            role: 'system',
                            content: 'Ты WindowsAI - полезный ассистент. Отвечай кратко и по делу.'
                        },
                        ...this.conversationHistory.slice(-10).map(msg => ({
                            role: msg.role,
                            content: msg.content
                        })),
                        { role: 'user', content: message }
                    ],
                    temperature: 0.7,
                    max_tokens: 2048
                };
        }
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: provider.headers(this.apiKey),
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`${response.status}: ${errorData}`);
            }
            
            const data = await response.json();
            
            if (isTest) {
                return true;
            }
            
            // Парсим ответ
            return this.parseResponse(data, this.currentProvider);
            
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    }

    parseResponse(data, provider) {
        try {
            switch(provider) {
                case 'gemini':
                    return data.candidates[0].content.parts[0].text;
                    
                case 'claude':
                    return data.content[0].text;
                    
                case 'cohere':
                    return data.text;
                    
                default:
                    return data.choices[0].message.content;
            }
        } catch (error) {
            console.error('Parse error:', error);
            return 'Ошибка при обработке ответа';
        }
    }

    getCurrentModel() {
        const provider = this.providers[this.currentProvider];
        return provider.models.find(m => m.id === this.currentModel) || provider.models[0];
    }

    addMessage(content, role) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const formattedContent = this.formatMessage(content);
        
        messageDiv.innerHTML = `
            <div class="message-content">${formattedContent}</div>
            <div class="message-time">${timeStr}</div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
        
        return messageDiv;
    }

    formatMessage(text) {
        if (!text) return '';
        
        // Экранируем HTML
        let formatted = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        
        // Форматируем код
        formatted = formatted.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
            return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
        });
        
        formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // Форматируем ссылки
        formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        
        // Переносы строк
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    }

    showTypingIndicator() {
        this.typingIndicator.classList.remove('hidden');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.typingIndicator.classList.add('hidden');
    }

    scrollToBottom() {
        if (this.chatArea) {
            this.chatArea.scrollTo({
                top: this.chatArea.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    attachFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt,.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.md,.json,.js,.py,.html,.css';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                // Проверяем размер (макс 10MB)
                if (file.size > 10 * 1024 * 1024) {
                    this.showToast('Файл слишком большой (макс 10MB)', 'error');
                    return;
                }
                
                this.attachedFile = file;
                this.fileName.textContent = `${file.name} (${this.formatFileSize(file.size)})`;
                this.attachmentPreview.classList.remove('hidden');
                this.showToast(`Файл прикреплен: ${file.name}`, 'success');
                
                // Читаем текстовые файлы
                if (file.type.startsWith('text/') || 
                    file.name.match(/\.(txt|json|md|js|py|html|css|xml|yml|yaml)$/)) {
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

    clearAttachment() {
        this.attachedFile = null;
        this.attachmentPreview.classList.add('hidden');
        this.fileName.textContent = '';
    }

    startVoiceInput() {
        if (!this.recognition) {
            this.showToast('Голосовой ввод не поддерживается', 'error');
            return;
        }
        
        try {
            this.recognition.start();
            this.voiceBtn.style.background = 'var(--primary)';
            this.showToast('Говорите...', 'info');
        } catch (error) {
            console.error('Voice error:', error);
            this.showToast('Ошибка запуска голосового ввода', 'error');
        }
    }

    showWelcomeMessage() {
        if (!this.messagesContainer.children.length) {
            // Приветствие уже в HTML
        } else if (this.conversationHistory.length > 0) {
            // Восстанавливаем историю
            this.conversationHistory.forEach(msg => {
                this.addMessage(msg.content, msg.role);
            });
        }
    }

    openSettings() {
        this.settingsModal.classList.remove('hidden');
        this.updateConnectionStatus();
    }

    closeSettings() {
        this.settingsModal.classList.add('hidden');
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'check_circle',
            error: 'error',
            info: 'info',
            warning: 'warning'
        };
        
        toast.innerHTML = `
            <span class="material-icons">${icons[type] || 'info'}</span>
            <span class="toast-message">${message}</span>
        `;
        
        this.toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'toastSlide 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    showContextMenu(e, text, element) {
        const menu = document.getElementById('contextMenu');
        if (!menu) return;
        
        const x = e.pageX || e.touches?.[0]?.pageX || 0;
        const y = e.pageY || e.touches?.[0]?.pageY || 0;
        
        menu.style.left = Math.min(x, window.innerWidth - 200) + 'px';
        menu.style.top = Math.min(y, window.innerHeight - 200) + 'px';
        menu.classList.remove('hidden');
        
        const copyBtn = menu.querySelector('.context-item:first-child');
        const shareBtn = menu.querySelector('.context-item:nth-child(2)');
        const deleteBtn = menu.querySelector('.context-item:nth-child(3)');
        
        copyBtn.onclick = () => {
            this.copyToClipboard(text);
            menu.classList.add('hidden');
        };
        
        shareBtn.onclick = () => {
            this.shareMessage(text);
            menu.classList.add('hidden');
        };
        
        deleteBtn.onclick = () => {
            element.remove();
            menu.classList.add('hidden');
        };
        
        setTimeout(() => {
            const hideMenu = () => {
                menu.classList.add('hidden');
                document.removeEventListener('click', hideMenu);
                document.removeEventListener('touchstart', hideMenu);
            };
            
            document.addEventListener('click', hideMenu);
            document.addEventListener('touchstart', hideMenu);
        }, 100);
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('Скопировано в буфер обмена', 'success');
        } catch (error) {
            console.error('Copy error:', error);
            this.showToast('Ошибка копирования', 'error');
        }
    }

    async shareMessage(text) {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'WindowsAI',
                    text: text
                });
                this.showToast('Поделились!', 'success');
            } catch (error) {
                console.error('Share error:', error);
            }
        } else {
            this.copyToClipboard(text);
            this.showToast('Ссылка скопирована', 'success');
        }
    }

    updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });
        const timeElement = document.querySelector('.time');
        if (timeElement) {
            timeElement.textContent = timeStr;
        }
    }

    clearHistory() {
        if (confirm('Очистить историю сообщений?')) {
            this.messagesContainer.innerHTML = '';
            this.conversationHistory = [];
            localStorage.removeItem('windowsai_history');
            this.showWelcomeMessage();
            this.showToast('История очищена', 'success');
        }
    }

    exportHistory() {
        const data = {
            provider: this.currentProvider,
            model: this.currentModel,
            history: this.conversationHistory,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `windowsai-chat-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showToast('История экспортирована', 'success');
    }
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    // Предотвращаем зум двойным тапом
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Создаем экземпляр приложения
    window.app = new WindowsAI();
    
    console.log('WindowsAI Mobile готов к работе! 🌟');
});

// Добавляем поддержку свайпов для навигации
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) return;
    
    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;
    
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;
    
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // Горизонтальный свайп
        if (xDiff > 0) {
            // Свайп влево
        } else {
            // Свайп вправо
        }
    }
    
    xDown = null;
    yDown = null;
}

// Обработка ошибок
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    if (window.app) {
        window.app.showToast('Произошла ошибка', 'error');
    }
});

// Сохраняем состояние перед закрытием
window.addEventListener('beforeunload', () => {
    if (window.app) {
        localStorage.setItem('windowsai_history', JSON.stringify(window.app.conversationHistory));
    }
});