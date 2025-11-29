# DataSense - Landing Page

Landing page hiện đại cho dịch vụ kết nối API DataSense.

## ✨ Tính năng

- **Thiết kế hiện đại**: Sử dụng gradient, animations và hiệu ứng mượt mà
- **Responsive**: Hoạt động tốt trên mọi thiết bị (desktop, tablet, mobile)
- **Hiệu suất cao**: HTML, CSS, JavaScript thuần túy - không dependencies
- **Tối ưu SEO**: Meta tags và cấu trúc semantic HTML
- **Sẵn sàng deploy**: Deploy lên Cloudflare Pages chỉ trong vài phút

## 📁 Cấu trúc file

```
datasense/
├── index.html      # Trang HTML chính
├── styles.css      # CSS styling
├── script.js       # JavaScript cho interactivity
└── README.md       # File này
```

## 🚀 Deploy lên Cloudflare Pages

### Phương pháp 1: Sử dụng Git (Khuyến nghị)

1. **Push code lên GitHub** (đã làm):
   ```bash
   git add .
   git commit -m "Add landing page"
   git push
   ```

2. **Tạo Cloudflare Pages project**:
   - Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Vào **Pages** > **Create a project**
   - Chọn **Connect to Git**
   - Chọn repository `datasense`
   - Thiết lập build:
     - **Build command**: (để trống)
     - **Build output directory**: `/`
   - Click **Save and Deploy**

3. **Cấu hình custom domain**:
   - Sau khi deploy xong, vào **Custom domains**
   - Click **Set up a custom domain**
   - Nhập domain của bạn và làm theo hướng dẫn

### Phương pháp 2: Upload trực tiếp

1. Đăng nhập vào Cloudflare Dashboard
2. Vào **Pages** > **Create a project** > **Upload assets**
3. Kéo thả các file vào hoặc chọn folder
4. Click **Deploy site**

### Phương pháp 3: Sử dụng Wrangler CLI

```bash
# Cài đặt Wrangler
npm install -g wrangler

# Deploy
wrangler pages publish . --project-name=datasense
```

## 🎨 Tùy chỉnh

### Thay đổi màu sắc

Mở file `styles.css` và chỉnh sửa các CSS variables trong `:root`:

```css
:root {
    --primary-color: #667eea;     /* Màu chính */
    --secondary-color: #764ba2;   /* Màu phụ */
    --dark-bg: #0f172a;          /* Màu nền tối */
    --light-bg: #f8fafc;         /* Màu nền sáng */
}
```

### Thay đổi nội dung

Chỉnh sửa file `index.html` để thay đổi:
- Tên công ty, logo
- Tiêu đề và mô tả
- Thông tin tính năng
- Giá cả các gói dịch vụ
- Thông tin liên hệ

### Thêm analytics

Thêm Google Analytics hoặc Cloudflare Web Analytics vào `<head>` trong `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔧 Tối ưu hóa

### Hiệu suất

- Tất cả CSS và JavaScript đã được tối ưu
- Không có dependencies bên ngoài
- Hình ảnh sử dụng SVG (vector graphics) để tải nhanh

### SEO

- Thêm/chỉnh sửa meta tags trong `<head>`:
  ```html
  <meta name="description" content="Mô tả của bạn">
  <meta property="og:title" content="DataSense">
  <meta property="og:description" content="Mô tả của bạn">
  <meta property="og:image" content="URL_ảnh_preview">
  ```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 769px - 1024px
- **Desktop**: > 1024px

## 🛠️ Công nghệ sử dụng

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- SVG cho icons và graphics

## 📞 Hỗ trợ

Nếu cần hỗ trợ, vui lòng liên hệ hoặc tạo issue trên GitHub.

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.
