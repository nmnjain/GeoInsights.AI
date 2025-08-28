# 🚀 Prepify - AI-Powered Interview Preparation Hub

Crackly is a comprehensive, AI-powered platform designed to help job seekers excel in interviews through personalized practice sessions, real-time feedback, and advanced analytics.

## ✨ Features

### 🎯 Core Features
- **AI-Powered HR Interviews**: Real-time voice interviews with intelligent feedback
- **Dynamic Aptitude Tests**: Adaptive questions based on performance and difficulty- **Coding Challenges**: Multi-language support with AI code analysis
- **AI Doubt Solver**: Instant help with interview concepts and questions
- **Progress Tracking**: Comprehensive analytics and performance insights
- **Leaderboards**: Competitive rankings and achievements system

### 🔧 Technical Features
- **Real-time AI Integration**: OpenAI GPT-3.5 Turbo for dynamic content generation
- **Firebase Backend**: Authentication, real-time database, and cloud storage
- **Responsive Design**: Mobile-first approach with dark/light theme support
- **Voice Recognition**: Speech-to-text for interview practice
- **Code Editor**: Syntax highlighting with multi-language support
- **Real-time Analytics**: Performance tracking and insights

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **CodeMirror** - Advanced code editor
- **Lucide React** - Beautiful icons

### Backend & Services
- **Firebase** - Authentication, Firestore, Storage, Analytics
- **OpenAI API** - GPT-3.5 Turbo for AI-powered features
- **React Hot Toast** - Beautiful notifications

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- OpenAI API key
- Firebase project

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/crackly.git
cd crackly
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the environment template:
```bash
cp .env.example .env
```

Update `.env` with your credentials:
```env
# OpenAI Configuration
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create Firestore database
5. Enable Storage
6. Get your config from Project Settings

#### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Sessions are private to users
    match /{sessionType}Sessions/{sessionId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
    }
    
    // Analytics are private to users
    match /analytics/{analyticsId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
    }
    
    // Leaderboard is read-only for authenticated users
    match /users/{userId} {
      allow read: if request.auth != null;
    }
  }
}
```

### 5. OpenAI Setup
1. Get API key from [OpenAI Platform](https://platform.openai.com/)
2. Add billing information (required for API access)
3. Set usage limits for cost control

### 6. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 📁 Project Structure

```
crackly/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   └── ui/            # UI components
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   ├── services/          # API services
│   │   ├── firebase.js    # Firebase services
│   │   └── openai.js      # OpenAI services
│   ├── config/            # Configuration files
│   ├── utils/             # Utility functions
│   └── styles/            # Global styles
├── .env                   # Environment variables
├── .env.example          # Environment template
├── package.json          # Dependencies
└── README.md             # This file
```

## 🔧 Configuration

### Firebase Collections Structure

#### Users Collection
```javascript
{
  uid: "user_firebase_uid",
  email: "user@example.com",
  displayName: "User Name",
  createdAt: timestamp,
  stats: {
    hrInterviewsCompleted: 0,
    aptitudeQuizzesTaken: 0,
    codingChallengesSolved: 0,
    totalScore: 0,
    averageScore: 0
  },
  achievements: [],
  progress: {
    hrInterview: 0,
    aptitudeQuiz: 0,
    codingChallenge: 0
  },
  preferences: {
    jobRole: "",
    experience: 0,
    targetCompanies: []
  }
}
```

#### Session Collections
- `interviewSessions` - HR interview session data
- `aptitudeSessions` - Aptitude quiz session data  
- `codingSessions` - Coding challenge session data
- `analytics` - User activity tracking

### OpenAI Integration

The application uses OpenAI's GPT-3.5 Turbo model for:
- **Dynamic Question Generation**: HR and aptitude questions
- **Code Analysis**: Performance and optimization feedback
- **Answer Evaluation**: Interview response assessment
- **Doubt Resolution**: Instant help and explanations

## 🎨 UI/UX Features

### Design System
- **Consistent Color Palette**: Primary, secondary, and accent colors
- **Typography Scale**: Responsive font sizes and weights
- **Spacing System**: Consistent margins and padding
- **Component Library**: Reusable UI components

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for tablets
- **Desktop Enhanced**: Full-featured desktop experience

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color ratios
- **Focus Management**: Clear focus indicators

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform:
- `VITE_OPENAI_API_KEY`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

## 🔒 Security Considerations

### API Security
- **Environment Variables**: Never commit API keys to version control
- **Rate Limiting**: Implement rate limiting for OpenAI API calls
- **Input Validation**: Sanitize all user inputs
- **CORS Configuration**: Proper CORS setup for production

### Firebase Security
- **Authentication Rules**: Secure authentication flow
- **Firestore Rules**: Restrict data access to authenticated users
- **Storage Rules**: Secure file upload permissions

## 📊 Performance Optimization

### Code Splitting
- **Route-based**: Automatic code splitting by routes
- **Component-based**: Lazy loading for heavy components
- **Bundle Analysis**: Regular bundle size monitoring

### Caching Strategy
- **Service Worker**: Cache static assets
- **Firebase Caching**: Optimize Firestore queries
- **Image Optimization**: Compress and optimize images

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Performance Testing
```bash
npm run lighthouse
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for providing powerful AI capabilities
- **Firebase** for robust backend services
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for beautiful icons

## 📞 Support

For support, email support@crackly.com or join our Discord community.

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core interview practice features
- ✅ AI-powered question generation
- ✅ User authentication and profiles
- ✅ Progress tracking and analytics

### Phase 2 (Next)
- 🔄 Video interview practice
- 🔄 Company-specific interview prep
- 🔄 Mock interview scheduling
- 🔄 Advanced analytics dashboard

### Phase 3 (Future)
- 📋 Resume analysis and optimization
- 📋 Job matching and recommendations
- 📋 Interview coaching marketplace
- 📋 Mobile application

---

**Made with ❤️ by the Crackly Team**
