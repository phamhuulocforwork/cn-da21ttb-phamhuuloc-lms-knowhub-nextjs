# Tên đề tài: XÂY DỰNG HỆ THỐNG QUẢN LÝ HỌC TẬP (LMS) BẰNG NEXT.JS

## ![Knowhub](./thesis/image/banner.png)

- Giáo viên hướng dẫn: TS. Nguyễn Bảo Ân
- Thời gian thực hiện: 11/11/2024 đến ngày 05/01/2025
- Sinh viên thực hiện: Phạm Hữu Lộc
- MSSV: 110121055
- Email: phamhuulocforwork@gmail.com

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:**

  - [Next.js 14](https://nextjs.org/): Framework React với SSR, SSG
  - [TypeScript](https://www.typescriptlang.org/): Ngôn ngữ lập trình
  - [Tailwind CSS](https://tailwindcss.com/): Framework CSS
  - [Radix UI](https://www.radix-ui.com/): Thư viện components
  - [React Hook Form](https://react-hook-form.com/): Quản lý form
  - [Zod](https://zod.dev/): Validation schema

- **Backend:**

  - [Node.js](https://nodejs.org/): Runtime JavaScript
  - [Express](https://expressjs.com/): Web framework
  - [Prisma](https://www.prisma.io/): ORM
  - [MySQL](https://www.mysql.com/): Cơ sở dữ liệu

- **Authentication:**
  - [JWT](https://jwt.io/): JSON Web Token
  - [bcrypt](https://www.npmjs.com/package/bcrypt): Mã hóa mật khẩu

## 📁 Cấu trúc thư mục

- [backend](./src/server/) - Chứa các mô hình, services, kiến trúc của hệ thống.
- [frontend](./src/client/) - Giao diện người dùng.
- [documents](./thesis/) - Tài liệu về dự án.

## 🔗 Hướng Dẫn Cài Đặt

### 📋 Yêu Cầu

Để cài đặt và chạy được dự án, trước tiên bạn cần phải cài đặt các công cụ bên dưới. Hãy thực hiện theo các hướng dẫn cài đặt sau, lưu ý chọn hệ điều hành phù hợp với máy tính của bạn:

> **Lưu ý:** NextJS 14 chỉ tương thích với NodeJS từ version 18 trở lên.

### 🔨 Cài Đặt

Trước hết, hãy clone dự án về máy của bạn:

```bash
git clone git@github.com:phamhuulocforwork/cn-da21ttb-phamhuuloc-lms-knowhub-nextjs.git
```

cd vào thư mục dự án:

```bash
cd cn-da21ttb-phamhuuloc-lms-knowhub-nextjs
```

### 🏃‍♂️ Chạy hệ thống

#### ⚙️ Server

Đầu tiên, cd vào thư mục backend:

```bash
cd src/backend
```

Cài đặt các dependencies:

```bash
npm install
```

Cấu hình môi trường

- Tạo file `.env` từ file mẫu `.env.example`:
- Điền các biến môi trường vào file `.env` vừa tạo.

```bash
cp .env.example .env
```

Chạy server:

```bash
npm start
```

#### 💻 Client

Sau đó, mở một terminal mới và cd vào thư mục frontend:

```bash
cd ../frontend
```

Cài đặt các dependencies:

```bash
npm install
```

Cấu hình môi trường

- Tạo file `.env` từ file mẫu `.env.example`:
- Điền các biến môi trường vào file `.env` vừa tạo.

```bash
cp .env.example .env
```

Chạy client:

```bash
npm run preview
```

Lúc này web-app sẽ chạy ở địa chỉ [http://localhost:3000](http://localhost:3000).
