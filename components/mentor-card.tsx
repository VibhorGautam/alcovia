import Image from "next/image"

interface MentorCardProps {
  name: string
  title: string
  college: string
  imageSrc: string
}

export default function MentorCard({ name, title, college, imageSrc }: MentorCardProps) {
  return (
    <div className="relative h-[400px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl bg-[#0B0B0B] border border-white/10 group hover:border-[#EABF36]/50 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />

      {/* Background Image/Photo */}
      <div className="absolute inset-0 bg-[#1a1a1a]">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 300px"
          quality={90}
        />
        {/* Beautification: subtle vignette/gradient to ensure text readability and focus on face */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col gap-1">
        <div className="h-1 w-12 bg-[#EABF36] rounded-full mb-2" />
        <h3 className="text-xl font-bold text-white tracking-wide">{name}</h3>
        {title && <p className="text-sm font-medium text-white/80">{title}</p>}
        <p className="text-xs font-bold text-[#EABF36] uppercase tracking-wider mt-1">{college}</p>
      </div>
    </div>
  )
}
