
# 🔮 Babylon.js 3D Text Viewer

A slick web-based 3D viewer built with [Babylon.js](https://www.babylonjs.com/) that displays dynamic, glowing 3D text on a rotating plane. Customize the text and glow color via URL parameters or postMessage events — perfect for dashboards, presentations, or interactive UIs.

---

## 🚀 Features

- ✨ Dynamic glowing 3D text
- 🎨 Custom color via `?color=` query param or real-time messaging
- 🌀 Smooth rotation animation
- 🧼 Transparent background with a subtle shadow and base
- 🎥 ArcRotateCamera controls with zoom limits
- 💬 Wraps and centers long text

---

## 🛠️ Tech Stack

- [Babylon.js](https://www.babylonjs.com/)
- HTML5 Canvas
- JavaScript

---

## 📦 How to Use

### 1. Clone or Download the Project

```bash
git clone https://github.com/your-username/babylon-3d-text-viewer.git
cd babylon-3d-text-viewer
```

### 2. Open `index.html` in the browser

> No build tools required — it’s vanilla and ready to go.

---

## 🧪 Usage Examples

### ➕ Load with text and color:

```
http://localhost/index.html?name=Hello%20World&color=deepskyblue
```

### 🎯 Update color in real-time:

```js
window.postMessage({ type: "changeColor", color: "orange" }, "*");
```

---

## 📁 File Structure

```
📁 project-root/
├── index.html
├── viewer.js     # Main Babylon.js logic
├── README.md
```

---

## 💡 Customization Tips

- ✅ Change font style in `viewer.js`:  
  ```js
  const font = "bold 120px Segoe UI";
  ```

- ✅ Modify plane sizes or camera limits for different layouts.
- ✅ Integrate inside an iframe or embed in dashboards easily.

---

## 🧼 License

MIT — do what you want, just don’t blame me if you break the universe.