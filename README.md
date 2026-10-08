# Marketplace SPA

-[Деплой проекта](https://techcore7-web-socket.vercel.app/)

Может потребоваться VPN, для отправки запросов на DummyJSON

SPA интернет-магазина, разработанное на React + TypeScript. 

Проект реализует каталог товаров, просмотр детальной информации, корзину,
избранное, авторизацию, профиль пользователя и чат на WebSocket.

## Функциональность

- Авторизация через DummyJSON API
- Защищённые маршруты
- Каталог товаров
- Бесконечная прокрутка каталога (Infinite Scroll)
- Детальная страница товара
- Добавление товаров в корзину
- Изменение количества товаров в корзине
- Удаление товаров из корзины
- Избранные товары
- Профиль авторизованного пользователя
- WebSocket-чат
- Сохранение авторизации, корзины и избранного в `localStorage`
- Адаптивный интерфейс для desktop и mobile
- Навигация между страницами без полной перезагрузки

## Стек

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Zustand
- Material UI
- Native Fetch API
- WebSocket API
- CSS Modules
- pnpm

## API

Для получения данных используется публичный API:

- [DummyJSON](https://dummyjson.com/)
- WebSocket: `wss://ws.ifelse.io/`

## Установка

### Требования

- Node.js
- pnpm

### Установка зависимостей

```bash
pnpm install
