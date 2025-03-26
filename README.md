# Movie Management Application

A modern web application for managing movies, built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🎬 Create, read, update, and delete movies
- 🔐 Secure authentication system
- 📱 Responsive design for all devices
- 🖼️ Image upload support for movie posters
- ✨ Form validation using Yup and React Hook Form
- 🎨 Modern UI with Tailwind CSS
- 🔒 Remember me functionality for login

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Yup
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Authentication**: JWT with secure token storage
- **Image Handling**: Next.js Image Component

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd next-15-demo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/
│   ├── common/         # Reusable UI components
│   └── page/          # Page-specific components
│       ├── Auth/      # Authentication components
│       └── movies/    # Movie management components
├── utils/             # Utility functions and API client
└── app/              # Next.js app router pages
```

## Features in Detail

### Authentication
- Secure login with email and password
- JWT token-based authentication
- Remember me functionality
- Form validation for login credentials

### Movie Management
- Create new movies with title, publish year, and poster
- Edit existing movies
- Delete movies
- View movie list with pagination
- Image upload support for movie posters

### Form Validation
- Email format validation
- Password strength requirements
- Required field validation
- Real-time validation feedback

