# Professional Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features a professional dark theme with smooth animations and comprehensive sections for showcasing your skills and projects.

## 🚀 Features

- **Modern Design**: Professional dark theme with gradient accents
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Easy Customization**: JSON-based data files for easy content management
- **SEO Optimized**: Proper metadata and Open Graph tags
- **Performance**: Optimized for fast loading and smooth scrolling
- **Accessibility**: Built with accessibility best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and dark theme
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main portfolio page
├── data/
│   ├── personal.json        # Personal information
│   ├── projects.json        # Project showcase data
│   └── skills.json          # Skills and technologies
└── lib/
    └── utils.ts             # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization Guide

### 1. Personal Information (`src/data/personal.json`)

Update your personal details:

```json
{
  "personal": {
    "name": "Hammad Tahir",
    "title": "Full Stack Developer",
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "Your City, Country",
    "github": "https://github.com/hammad-devo",
    "linkedin": "www.linkedin.com/in/hammad-tahir-911aa4277",
    "website": "https://hammad-devo.github.io",
    "about": "Your personal description...",
    "summary": "Professional summary...",
    "experience": [...],
    "education": [...]
  }
}
```

### 2. Projects (`src/data/projects.json`)

Add your projects:

```json
{
  "projects": [
    {
      "id": 1,
      "title": "Project Name",
      "description": "Project description...",
      "technologies": ["React", "Node.js", "TypeScript"],
      "image": "/projects/project-image.jpg",
      "github": "https://github.com/yourusername/project",
      "live": "https://project-demo.com",
      "category": "Full Stack"
    }
  ]
}
```

### 3. Skills (`src/data/skills.json`)

Organize your skills by category:

```json
{
  "skills": {
    "frontend": [
      {
        "name": "React.js",
        "level": 95,
        "icon": "react"
      }
    ],
    "backend": [...],
    "mobile": [...],
    "devops": [...],
    "databases": [...]
  }
}
```

### 4. Metadata (`src/app/layout.tsx`)

Update the metadata for SEO:

```typescript
export const metadata: Metadata = {
  title: "Hammad Tahir - Full Stack Developer",
  description: "Your portfolio description...",
  // ... other metadata
};
```

## 🎨 Color Scheme

The portfolio uses a professional dark theme with:

- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Background**: Dark (#0F172A)
- **Surface**: Dark with transparency
- **Text**: Light (#F8FAFC)
- **Accents**: Purple and pink gradients

## 📱 Sections

1. **Hero**: Introduction with call-to-action buttons
2. **About**: Personal information and contact details
3. **Skills**: Organized by category with progress bars
4. **Projects**: Showcase of your work with links
5. **Experience**: Work history and achievements
6. **Contact**: Contact information and social links

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify

### Other Platforms

The project is compatible with any static hosting platform.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to open an issue or reach out.

---

**Happy coding! 🎉**
