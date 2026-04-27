# Лабораторная работа №6

## Тема
Настройка CI/CD для комплексных автоматизированных тестов в GitHub Actions.

## Цель
Освоить непрерывную интеграцию и доставку (CI/CD) для автоматического запуска модульных, API, BDD и UI тестов, а также публикацию отчётов и управление артефактами.

## Что реализовано
- Создан workflow `.github/workflows/ci.yml`.
- Настроены три параллельные группы тестов:
  - `unit-tests` (Jest),
  - `api-tests` (Cucumber),
  - `ui-tests` (Playwright).
- Добавлена матрица:
  - Node.js: `18`, `20`, `22`;
  - ОС: `ubuntu-latest`, `windows-latest`, `macos-latest`.
- Настроено кэширование:
  - npm-зависимостей через `actions/setup-node@v4` (`cache: npm`),
  - браузеров Playwright через `actions/cache@v4`.
- Добавлена загрузка артефактов:
  - `allure-results`,
  - `playwright-report`,
  - итоговый `allure-report`.
- Добавлен job `allure-report`:
  - скачивание артефактов,
  - объединение результатов,
  - генерация отчёта `Allure`,
  - деплой отчёта на GitHub Pages (ветка `main`).
- Добавлен job `notify`:
  - отправка уведомления в Telegram при наличии секретов.

## Файлы проекта
- `package.json` — скрипты и dev-зависимости для Jest/Cucumber/Playwright/Allure.
- `jest.config.allure.js` — интеграция Jest + Allure.
- `cucumber.js` — конфигурация Cucumber + Allure.
- `playwright.config.js` — конфигурация Playwright + Allure + HTML-репорт.
- `server.js` — тестовый сервер.
- `__tests__/health.test.js` — модульный/API smoke для `/health`.
- `features/health.feature` + `steps/health.steps.js` — BDD сценарий.

## Проверка локально
1. Установить зависимости:
   - `npm ci`
2. Запустить сервер:
   - `npm start`
3. Выполнить тесты:
   - `npm run test:unit`
   - `npm run test:api`
   - `npm run test:ui`
4. Сгенерировать Allure:
   - `npm run allure:generate`
   - `npm run allure:open`

## Проверка workflow линтером actionlint
Для Linux/macOS:
- `bash <(curl https://raw.githubusercontent.com/rhysd/actionlint/main/scripts/download-actionlint.bash)`
- `actionlint .github/workflows/ci.yml`

Для Windows (scoop):
- `scoop install actionlint`
- `actionlint .github/workflows/ci.yml`

## Секреты репозитория (Settings -> Secrets and variables -> Actions)
Для Telegram уведомлений:
- `TELEGRAM_BOT_TOKEN` — токен бота.
- `TELEGRAM_CHAT_ID` — ID чата/канала.

Для деплоя в GitHub Pages используется встроенный:
- `GITHUB_TOKEN`.

## Вывод
В рамках лабораторной работы реализован полный CI/CD-пайплайн с параллельным прогоном тестов, матрицей версий Node.js и ОС, генерацией Allure-отчётов, публикацией артефактов, деплоем отчётов на GitHub Pages и уведомлением в Telegram.
