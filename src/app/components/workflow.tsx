import { ReactNode } from 'react';
import { 
  UserPlus, 
  Building2, 
  Briefcase, 
  FileText, 
  ClipboardCheck, 
  Award, 
  Users
} from 'lucide-react';

// Types
export interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
  details: string[];
}

export interface SuccessStory {
  name: string;
  company: string;
  role: string;
  quote: string;
}

export interface Statistic {
  number: string;
  label: string;
}

// Data
export const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Student Registration & Preparation",
    description: "Students register for placement drive and complete profile preparation with resume building and skill assessments.",
    icon: <UserPlus className="w-12 h-12" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    details: ["Profile Creation", "Resume Building", "Skill Assessment", "Mock Interviews"]
  },
  {
    id: 2,
    title: "Company Invitation & Registration",
    description: "Companies are invited to participate and register for the placement drive with their hiring requirements.",
    icon: <Building2 className="w-12 h-12" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    details: ["Company Outreach", "Registration Process", "Requirements Gathering", "Partnership Setup"]
  },
  {
    id: 3,
    title: "Job Posting & Pre-Placement Talk",
    description: "Companies post job openings and conduct pre-placement talks to introduce their organization and opportunities.",
    icon: <Briefcase className="w-12 h-12" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    details: ["Job Descriptions", "Company Presentations", "Q&A Sessions", "Role Clarifications"]
  },
  {
    id: 4,
    title: "Student Application & Shortlisting",
    description: "Students apply for relevant positions and companies shortlist candidates based on their criteria.",
    icon: <FileText className="w-12 h-12" />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    details: ["Application Submission", "Initial Screening", "Eligibility Check", "Shortlist Creation"]
  },
  {
    id: 5,
    title: "Assessments & Interviews",
    description: "Shortlisted candidates undergo various assessments, technical tests, and interview rounds.",
    icon: <ClipboardCheck className="w-12 h-12" />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    details: ["Technical Tests", "Aptitude Tests", "HR Interviews", "Technical Interviews"]
  },
  {
    id: 6,
    title: "Final Selection & Offer Letters",
    description: "Companies make final selections and extend offer letters to successful candidates.",
    icon: <Award className="w-12 h-12" />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    details: ["Final Evaluation", "Offer Generation", "Salary Negotiation", "Documentation"]
  },
  {
    id: 7,
    title: "Acceptance, Joining & Post-Placement Support",
    description: "Students accept offers, join their new roles, and receive ongoing support for smooth transition.",
    icon: <Users className="w-12 h-12" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    details: ["Offer Acceptance", "Onboarding Support", "Mentorship", "Career Guidance"]
  }
];

export const successStories: SuccessStory[] = [
  {
    name: "Sarah Johnson",
    company: "Google",
    role: "Software Engineer",
    quote: "The structured process helped me land my dream job at Google. The preparation was thorough and the support was incredible."
  },
  {
    name: "Michael Chen",
    company: "Microsoft",
    role: "Product Manager",
    quote: "From registration to joining, every step was well-planned. I felt confident throughout the entire process."
  },
  {
    name: "Priya Sharma",
    company: "Amazon",
    role: "Data Scientist",
    quote: "The mock interviews and skill assessments prepared me perfectly for the real interviews. Highly recommend!"
  }
];

export const statistics: Statistic[] = [
  { number: "5000+", label: "Students Placed" },
  { number: "200+", label: "Partner Companies" },
  { number: "95%", label: "Success Rate" },
  { number: "15+", label: "Years Experience" }
];