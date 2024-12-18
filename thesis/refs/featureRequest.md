# Feature Request

## Chức năng chính: project, course, quiz, wiki

- Mỗi course, quiz, wiki đều có các thuộc tính: thumbnail, title, description, timestamp created, timestamp edited, timestamp published, timestamp deleted, status (draft, published, deleted), author, categories, content (file, link, text, image, video, audio, code, math, table, chart, diagram, graph, etc.).
- Mỗi course, quiz, wiki có thể độc lập hoặc thuộc về một project nào đó.
  - Nếu thuộc về project thì khi xóa project sẽ xóa cả course, quiz, wiki thuộc về project đó.
  - Nếu thuộc về project thì chỉ khi tham gia vào project mới có thể xem được course, quiz, wiki thuộc về project đó.

## 1. Course

### 1.1 Chức năng hiển thị (Guest, Teacher, Student)

- Hiện thị danh sách các courses
  - 2 chế độ hiện thị: list hoặc gallery
- Trang chi tiết course
  - Video ngắn giới thiệu về course (nếu có)
  - Thông tin chung về course
- Tìm kiếm theo tên, chủ đề, người tạo
- Lọc theo chủ đề

### 1.2 Chức năng tham gia, học course (Student)

- Tham gia course
- Hủy tham gia course
- Học course:
  - Xem video dạy của course

### 1.3 CRUD course (Teacher)

- Tạo course mới:
  - Chọn thumbnail
  - Tên course
  - Chọn chủ đề
  - Mô tả
  - Nội dung
- Chỉnh sửa course
- Xóa course

## 2. Quiz

### 2.1 Chức năng hiển thị (Guest)

- 2 chế độ hiện thị: list hoặc gallery
- Danh sách các quiz
- Tìm kiếm theo tên, chủ đề, người tạo,...
- Lọc theo mức độ khẩn cấp (thời gian kết thúc của quiz), số lượng câu hỏi, danh sách chủ đề.

### 2.2 CRUD quiz (Teacher)

- Tạo quiz mới:
  - Chọn thumnail
  - Tên quiz
  - Chọn chủ đề
  - Thời gian làm bài
  - Thời gian bắt đầu, kết thúc quiz
  - Mô tả, yêu cầu
  - Tạo danh sách các câu hỏi, mỗi câu hỏi có:
    - Tuỳ chọn loại câu hỏi (Multiple choice, short answer, long answer), nếu là câu multiple choice thì có tuỳ chọn multiple answer
    - Tuỳ chọn câu hỏi bắt buộc
    - Câu hỏi
    - Hình ảnh (nếu có)
    - Danh sách các câu trả lời (chọn các câu hỏi đúng)
  - Tuỳ chọn ngẫu nhiên thứ tự câu trả lời
  - Điểm mỗi câu
- Chỉnh sửa quiz
- Xóa quiz

## 3. Wiki

### 3.1 Chức năng hiển thị

- 2 chế độ hiện thị: list hoặc gallery
- Danh sách các wiki
- Tìm kiếm theo tên, chủ đề, người tạo,...
- Lọc theo chủ đề

### 3.2 CRUD wiki

- Tạo wiki mới:
  - Chọn thumbnail
  - Tên wiki
  - Chọn chủ đề
  - Mô tả
  - Nội dung
- Chỉnh sửa wiki
- Xóa wiki
