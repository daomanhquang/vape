# Vue.js 2 Project

Đây là một project Vue.js 2 đơn giản với đầy đủ các file cần thiết.

## Cài đặt

Cài đặt các dependencies:

```bash
npm install
```

## Chạy project

Chạy development server:

```bash
npm run dev
```

Project sẽ tự động mở tại `http://localhost:8080`

## Build production

Tạo build cho production:

```bash
npm run build
```

File build sẽ được tạo trong thư mục `dist/`

## Cấu trúc project

```
vueJs-Fe/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.vue             # Component chính
│   └── main.js             # Entry point
├── .gitignore              # Git ignore file
├── babel.config.js         # Babel configuration
├── package.json            # Dependencies và scripts
├── webpack.config.js       # Webpack configuration
└── README.md               # File này
```

## Tính năng

- Vue.js 2.6.14
- Webpack 5 cho bundling
- Babel cho ES6+ support
- Hot Module Replacement (HMR)
- Development server tự động reload

## Công nghệ sử dụng

- Vue.js 2
- Webpack
- Babel
- Vue Loader
- CSS Loader

