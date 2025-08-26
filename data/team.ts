export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  email: string;
  phone: string;
  shortRole?: string; // For home page display
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Joshua Kim",
    role: "Sales Director",
    shortRole: "Strategic Sales Director",
    image: "https://res.cloudinary.com/dbviya1rj/image/upload/v1752833883/ejat8ma5eh1c3nwabkim.jpg",
    description: "As a strategic Sales Director, Joshua is an expert in driving revenue growth and expanding market share. He leads our high-performing sales team with a clear vision, developing innovative strategies and fostering a culture of excellence. With a proven track record of exceeding targets, he excels at building lasting client partnerships and ensuring the team delivers exceptional value and results.",
    email: "joshuakim@altoproperty.com",
    phone: "(+61) 467 048 837",
  },
  {
    id: "2",
    name: "Amber Hsiao",
    role: "Mortgage Broker",
    shortRole: "Dedicated Mortgage Broker",
    image: "https://res.cloudinary.com/dbviya1rj/image/upload/v1753060414/cceoxxs20bhuzjr2dkts.jpg",
    description: "As a dedicated Mortgage Broker, Amber leverages deep market knowledge and sharp negotiation skills to find the perfect home loan for her clients. She is committed to simplifying the complexities of financing, guiding you every step of the way to ensure a smooth and successful path to property ownership.",
    email: "amber.h@ausunfinance.com.au",
    phone: "(+61) 466 623 689",
  },
  {
    id: "3",
    name: "Connor Reilly",
    role: "Property Partner",
    shortRole: "Dedicated Property Partner",
    image: "https://res.cloudinary.com/dbviya1rj/image/upload/v1753060413/wonnpo3gatludlru78oh.jpg",
    description: "As a dedicated Property Partner, Connor brings a fresh perspective and unwavering commitment to client satisfaction. He specializes in understanding unique property needs and delivering personalized solutions that exceed expectations. With a focus on building lasting relationships, Connor ensures every client receives the attention and expertise they deserve.",
    email: "connor.reilly@altoproperty.com.au",
    phone: "0437 139 314",
  },
];

// Helper function to get team members for home page (first 3)
export const getHomePageTeamMembers = () => teamMembers.slice(0, 3);

// Helper function to get team member by ID
export const getTeamMemberById = (id: string) => teamMembers.find(member => member.id === id);
