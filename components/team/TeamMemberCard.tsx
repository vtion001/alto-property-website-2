import Image from 'next/image';
import { TeamMember } from '@/data/team';

interface TeamMemberCardProps {
  member: TeamMember;
  variant?: 'default' | 'compact';
}

export default function TeamMemberCard({ member, variant = 'default' }: TeamMemberCardProps) {
  if (variant === 'compact') {
    return (
      <div className="text-center group max-w-sm mx-auto">
        <div className="relative mb-6 mx-auto w-48 h-48 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
          <Image
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            width={192}
            height={192}
            className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown-900/20 to-transparent" />
        </div>
        <h3 className="text-xl font-light text-brown-800 mb-2">{member.name}</h3>
        <p className="text-brown-600 text-sm mb-4">{member.shortRole || member.role}</p>
        <div className="flex justify-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="group hover:shadow-xl transition-all duration-500 border border-brown-100 w-full max-w-md">
      <div className="relative">
        <Image
          src={member.image}
          alt={member.name}
          width={300}
          height={400}
          className="w-full h-80 object-cover object-center rounded-t-lg"
        />
      </div>
      <div className="p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-light text-brown-900 mb-2">{member.name}</h3>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brown-100 text-brown-800">
              {member.role}
            </div>
          </div>
          <p className="text-brown-700 font-light leading-relaxed">{member.description}</p>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <svg className="h-4 w-4 text-brown-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="text-sm text-brown-700">{member.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="h-4 w-4 text-brown-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-sm text-brown-700">{member.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
