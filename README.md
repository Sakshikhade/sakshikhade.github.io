# Sakshi Khade - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing the work and experience of Sakshi Khade, an AI & Robotics M.S. candidate at Arizona State University.

## 🚀 Features

- **Modern Design**: Clean, professional aesthetic with ASU-inspired color scheme
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Interactive Animations**: Scroll-based reveals and smooth transitions using Framer Motion
- **Project Showcase**: Dynamic project display with detailed descriptions
- **Contact Form**: Functional contact form with validation using React Hook Form
- **SEO Optimized**: Proper meta tags, sitemap, and semantic HTML structure
- **Accessible**: ARIA labels, proper contrast ratios, and keyboard navigation support
- **Fast Performance**: Built with Vite for optimal build times and hot module replacement

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom color palette
- **Animations**: Framer Motion for smooth animations
- **Forms**: React Hook Form for form validation
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds
- **Linting**: ESLint with TypeScript support
- **Deployment**: GitHub Pages with automated CI/CD

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher) or yarn

## 🚀 Getting Started

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/sakshikhade/portfolio.git
cd portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser and navigate to:** `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

### Building for Production

```bash
npm run build
```

The optimized build files will be generated in the `dist` directory.

## 🚀 Deployment

### GitHub Pages (Recommended)

This project includes automated deployment to GitHub Pages using GitHub Actions:

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source

3. **Automatic deployment:**
   - The workflow in `.github/workflows/deploy.yml` will automatically build and deploy your site
   - Your site will be available at `https://yourusername.github.io/portfolio`

### Manual Deployment Options

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

#### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the framework and configure build settings
3. Deploy with one click!

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── About.tsx       # About section with personal info
│   ├── Contact.tsx     # Contact form with validation
│   ├── Education.tsx   # Education background
│   ├── Experience.tsx  # Professional experience
│   ├── Footer.tsx      # Footer with social links
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section with intro
│   ├── Projects.tsx    # Project showcase
│   └── Skills.tsx      # Technical skills display
├── contexts/            # React contexts
│   └── ThemeContext.tsx # Dark/Light theme management
├── App.tsx              # Main app component
├── main.tsx             # Entry point
├── index.css            # Global styles and Tailwind imports
└── vite-env.d.ts        # Vite environment types
```

## 🎨 Customization

### Theme Colors

The color scheme is defined in `tailwind.config.js` with ASU-inspired colors:

```javascript
colors: {
  maroon: {
    50: '#fef2f2',
    100: '#fee2e2',
    // ... custom maroon palette
    900: '#7c2d12',
    950: '#4c1d1d'
  },
  gold: {
    50: '#fefce8',
    100: '#fef9c3',
    // ... custom gold palette
    900: '#a16207',
    950: '#713f12'
  }
}
```

### Content Updates

1. **Personal Information:** Update `src/components/Hero.tsx` and `src/components/About.tsx`
2. **Projects:** Modify the projects array in `src/components/Projects.tsx`
3. **Experience:** Update work history in `src/components/Experience.tsx`
4. **Skills:** Modify technical skills in `src/components/Skills.tsx`
5. **Education:** Update educational background in `src/components/Education.tsx`

### Contact Form Integration

The contact form in `src/components/Contact.tsx` currently shows a success message. To integrate with a backend:

1. **Formspree Integration:**
```typescript
// Update the form action in Contact.tsx
<form action="https://formspree.io/f/your-form-id" method="POST">
```

2. **Netlify Forms:**
```typescript
// Add netlify attribute to form
<form netlify data-netlify="true">
```

3. **Custom Backend:**
```typescript
// Update the onSubmit function with your API endpoint
const onSubmit = async (data: FormData) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
};
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Sakshi Khade**
- Email: [skhade5@asu.edu](mailto:skhade5@asu.edu)
- LinkedIn: [linkedin.com/in/sakshikhade16](https://www.linkedin.com/in/sakshikhade16/)
- GitHub: [github.com/sakshikhade](https://github.com/sakshikhade)

**Project Repository:** [https://github.com/sakshikhade/portfolio](https://github.com/sakshikhade/portfolio)

---

⭐ If you found this project helpful, please give it a star on GitHub!

*Built with ❤️ by Sakshi Khade*