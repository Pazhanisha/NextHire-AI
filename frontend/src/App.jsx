import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ResumeHistory from "./pages/ResumeHistory";
import AIInterview from "./pages/AIInterview";
import InterviewHistory from "./pages/InterviewHistory";
import CareerMentor from "./pages/CareerMentor";
import Analytics from "@/pages/Analytics";
import SkillTracker from "@/pages/SkillTracker";
import SavedJobs from "@/pages/SavedJobs";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import VerifyOTP from "@/pages/VerifyOTP";
import Settings from "@/pages/Settings";


export default function App(){

return(

<BrowserRouter>

<Routes>


{/* AUTH */}

<Route
path="/"
element={<Login/>}
/>


<Route
path="/register"
element={<Register/>}
/>


<Route
path="/verify"
element={<VerifyOTP/>}
/>





{/* PROTECTED APP */}

<Route

element={

<ProtectedRoute>

<MainLayout/>

</ProtectedRoute>

}

>


<Route
path="/dashboard"
element={<Dashboard/>}
/>


<Route
path="/resume-analyzer"
element={<ResumeAnalyzer/>}
/>


<Route
path="/resume-history"
element={<ResumeHistory/>}
/>


<Route
path="/ai-interview"
element={<AIInterview/>}
/>


<Route
path="/career-mentor"
element={<CareerMentor/>}
/>


<Route
path="/analytics"
element={<Analytics/>}
/>


<Route
path="/skill-tracker"
element={<SkillTracker/>}
/>


<Route
path="/saved-jobs"
element={<SavedJobs/>}
/>


<Route
path="/profile"
element={<Profile/>}
/>


<Route
path="/settings"
element={<Settings/>}
/>


<Route
path="/interview-history"
element={<InterviewHistory/>}
/>


</Route>




<Route
path="*"
element={<Navigate to="/" replace/>}
/>


</Routes>


</BrowserRouter>

)

}