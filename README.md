# 🎨 Whiteboard Collaboration Platform

A real-time collaborative whiteboard application built with Next.js, Convex, Liveblocks, and Clerk. Create, share, and collaborate on digital whiteboards with your team in real-time.

## ✨ Features

- **Real-time Collaboration**: Multiple users can draw and edit simultaneously
- **Authentication**: Secure user authentication with Clerk
- **Organization Management**: Create and manage organizations with team members
- **Drawing Tools**: Rectangle, ellipse, text, sticky notes, and pencil tools
- **Board Management**: Create, rename, delete, and favorite boards
- **Live Cursors**: See other users' cursors in real-time
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Persistent Storage**: All changes are automatically saved

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Convex (real-time database)
- **Real-time**: Liveblocks (collaborative features)
- **Authentication**: Clerk
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sudarshan-bhavikatte/white-board-collab.git
   cd white-board-collab
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add the following variables:
   
   ```env
   # Convex
   CONVEX_DEPLOYMENT=your-convex-deployment
   NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-publishable-key
   CLERK_SECRET_KEY=sk_test_your-clerk-secret-key
   CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain.clerk.accounts.dev
   
   # Liveblocks
   LIVEBLOCKS_SECRET_KEY=sk_dev_your-liveblocks-secret-key
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Configuration

### Clerk Setup
1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key and secret key to `.env.local`
4. Configure your JWT issuer domain

### Convex Setup
1. Create a Convex account at [convex.dev](https://convex.dev)
2. Run `npx convex dev` to set up your deployment
3. The deployment URL will be automatically added to your `.env.local`

### Liveblocks Setup
1. Create a Liveblocks account at [liveblocks.io](https://liveblocks.io)
2. Create a new project
3. Copy your secret key to `.env.local`

## 📁 Project Structure

```
white-board-collab/
├── app/                          # Next.js app directory
│   ├── (dashboard)/             # Dashboard pages
│   │   └── _components/         # Dashboard components
│   ├── api/                     # API routes
│   ├── board/[boardId]/         # Board pages
│   │   └── _components/         # Board components
│   └── layout.tsx               # Root layout
├── components/                   # Reusable components
│   └── ui/                      # UI components
├── convex/                      # Convex backend functions
│   ├── board.ts                 # Board CRUD operations
│   ├── boards.ts                # Board queries
│   └── schema.ts                # Database schema
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── types/                       # TypeScript type definitions
└── public/                      # Static assets
```

## 🎯 Usage

### Creating a Board
1. Sign in to your account
2. Select or create an organization
3. Click "Create Board" button
4. Enter a board title and click "Create"

### Collaborating
1. Open a board
2. Share the board URL with team members
3. Use the toolbar to select drawing tools
4. Draw, add text, or create shapes
5. See real-time changes from other users

### Managing Boards
- **Rename**: Click the three dots menu → Rename
- **Delete**: Click the three dots menu → Delete → Confirm
- **Favorite**: Click the star icon to favorite/unfavorite
- **Copy Link**: Click the three dots menu → Copy Link

## 🔨 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Convex](https://convex.dev/) for the real-time database
- [Liveblocks](https://liveblocks.io/) for collaborative features
- [Clerk](https://clerk.com/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://radix-ui.com/) for accessible components

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the [documentation](https://deepwiki.com/sudarshan-bhavikatte/white-board-collab)
- Contact the maintainer

---

Made with ❤️ by [Sudarshan Bhavikatte](https://github.com/sudarshan-bhavikatte)