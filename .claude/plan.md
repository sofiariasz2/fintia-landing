# Fintia Authentication Implementation Plan

## Overview
Implement email/password authentication using Supabase for the Fintia landing page.

## Tech Stack
- **Supabase** - Backend-as-a-Service for authentication
- **React Router** - Client-side routing for login/signup pages
- **React Context** - Auth state management

## Implementation Steps

### 1. Install Dependencies
- `@supabase/supabase-js` - Supabase client library
- `react-router-dom` - Client-side routing

### 2. Create Supabase Configuration
- Create `src/lib/supabase.js` with Supabase client initialization
- Use environment variables for Supabase URL and anon key

### 3. Create Auth Context
- Create `src/context/AuthContext.jsx`
- Provide user state, loading state
- Expose `signUp`, `signIn`, `signOut` functions
- Listen to auth state changes with `onAuthStateChange`

### 4. Create Auth Pages
- `src/pages/Login.jsx` - Login form with email/password
- `src/pages/Signup.jsx` - Signup form with email/password/confirm password
- Match existing Fintia design system (green primary, rounded cards, clean UI)

### 5. Create Auth Page Styles
- `src/pages/Login.module.css`
- `src/pages/Signup.module.css`
- Consistent with existing component styling patterns

### 6. Update Routing
- Wrap app with `BrowserRouter`
- Add routes: `/`, `/login`, `/signup`
- Update Header component links to use React Router `Link`

### 7. Create Environment File
- `.env.example` with placeholder Supabase credentials
- User will need to add their own `.env` with real credentials

## File Structure After Implementation
```
src/
├── components/       (existing)
├── context/
│   └── AuthContext.jsx
├── lib/
│   └── supabase.js
├── pages/
│   ├── Login.jsx
│   ├── Login.module.css
│   ├── Signup.jsx
│   └── Signup.module.css
├── App.jsx          (updated with routes)
├── main.jsx         (updated with providers)
└── index.css        (existing)
```

## User Setup Required
After implementation, user needs to:
1. Create a Supabase project at https://supabase.com
2. Copy the project URL and anon key
3. Create `.env` file with credentials
4. Enable Email auth in Supabase dashboard

## Design Considerations
- Forms match Fintia's soft UI style
- Green primary buttons, rounded inputs
- Error/success message handling
- Loading states during auth operations
- Mobile-responsive layout
