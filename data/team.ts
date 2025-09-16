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
    role: "Selling Principal",
    shortRole: "Selling Principal",
    image: "https://res.cloudinary.com/dbviya1rj/image/upload/v1752833883/ejat8ma5eh1c3nwabkim.jpg",
    description: "As a strategic Sales Director, Joshua is an expert in driving revenue growth and expanding market share. He leads our high-performing sales team with a clear vision, developing innovative strategies and fostering a culture of excellence. With a proven track record of exceeding targets, he excels at building lasting client partnerships and ensuring the team delivers exceptional value and results.",
    email: "joshua.kim@altoproperty.com",
    phone: "(+61) 467 048 837",
  },
  {
    id: "2",
    name: "Connor Reilly",
    role: "Property Partner",
    shortRole: "Property Partner",
    image: "https://res.cloudinary.com/dbviya1rj/image/upload/v1757814157/w6442i2wt5wk70g8cbcv.jpg",
    description: "As a dedicated Property Partner, Connor brings a fresh perspective and unwavering commitment to client satisfaction. He specializes in understanding unique property needs and delivering personalized solutions that exceed expectations. With a focus on building lasting relationships, Connor ensures every client receives the attention and expertise they deserve.",
    email: "connor.reilly@altoproperty.com.au",
    phone: "0437 139 314",
  },
];

// Helper function to get team members for home page (first 3)
export const getHomePageTeamMembers = () => teamMembers.slice(0, 3);

// Helper function to get team member by ID
export const getTeamMemberById = (id: string) => teamMembers.find(member => member.id === id);
