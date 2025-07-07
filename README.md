# Quote Explorer

A beautiful web application built with Next.js, TypeScript, and ShadCN UI that lets users explore inspiring quotes by topic.

## Features

- **Topic-based Quote Discovery**: Enter any topic to discover related quotes
- **Beautiful UI**: Built with ShadCN UI components for a modern, clean design
- **Form Validation**: Robust form validation using React Hook Form and Zod
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Smooth Animations**: Elegant transitions and micro-interactions
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quote-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind CSS
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # ShadCN UI components
│   ├── quote-card.tsx       # Quote display component
│   └── topic-form.tsx       # Topic input form component
├── data/
│   └── quotes.ts            # Quote data and utilities
├── lib/
│   └── utils.ts             # Utility functions
└── README.md
```

## Usage

1. **Enter a Topic**: Type any topic in the search field (e.g., "motivation", "success", "happiness")
2. **Explore Quotes**: Click "Explore Quotes" to see three randomly selected quotes
3. **Repeat**: Try different topics to discover new insights and perspectives

## Form Validation

The application includes comprehensive form validation:
- Topic field is required (cannot be empty)
- Maximum length of 50 characters
- Real-time validation feedback
- Accessible error messages

## Deployment

### Deploy to Vercel

1. Push your code to a GitHub repository

2. Visit [Vercel](https://vercel.com) and sign in with your GitHub account

3. Click "New Project" and import your repository

4. Configure the project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out` (for static export)

5. Click "Deploy"

6. Your application will be live at the provided URL

### Manual Deployment

For static deployment:

```bash
npm run build
```

The built files will be in the `out` directory, ready for deployment to any static hosting service.

## Customization

### Adding New Quotes

Edit `data/quotes.ts` to add new quotes:

```typescript
{
  id: 21,
  text: "Your new quote here",
  author: "Author Name",
  category: "category"
}
```

### Styling

The application uses Tailwind CSS and ShadCN UI components. Customize:
- Colors: Modify the CSS variables in `app/globals.css`
- Components: Edit component files in `components/`
- Layout: Adjust spacing and layout in `app/page.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on GitHub.