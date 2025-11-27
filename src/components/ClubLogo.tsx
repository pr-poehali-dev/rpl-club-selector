interface ClubLogoProps {
  clubName: string;
  size?: number;
}

const ClubLogo = ({ clubName, size = 80 }: ClubLogoProps) => {
  const logoData: Record<string, { bg: string; text: string; accent: string }> = {
    'Спартак': { bg: '#C8102E', text: '#FFFFFF', accent: '#FFFFFF' },
    'ЦСКА': { bg: '#0046AD', text: '#FFFFFF', accent: '#C8102E' },
    'Зенит': { bg: '#0078C8', text: '#FFFFFF', accent: '#FFFFFF' },
    'Динамо': { bg: '#0066CC', text: '#FFFFFF', accent: '#FFFFFF' },
    'Локомотив': { bg: '#DA291C', text: '#FFFFFF', accent: '#006633' },
    'Краснодар': { bg: '#00A650', text: '#FFFFFF', accent: '#000000' },
    'Ахмат': { bg: '#006633', text: '#FFFFFF', accent: '#FFD700' },
    'Крылья Советов': { bg: '#0066CC', text: '#FFFFFF', accent: '#FFFFFF' },
    'Рубин': { bg: '#8B0000', text: '#FFFFFF', accent: '#FFD700' },
    'Ростов': { bg: '#FFD700', text: '#003366', accent: '#003366' },
    'Сочи': { bg: '#00A3E0', text: '#FFFFFF', accent: '#FFFFFF' },
    'Оренбург': { bg: '#FF6600', text: '#FFFFFF', accent: '#000000' },
    'Факел': { bg: '#FF4500', text: '#FFFFFF', accent: '#000000' },
    'Химки': { bg: '#FF6B00', text: '#FFFFFF', accent: '#000000' },
    'Акрон': { bg: '#1E90FF', text: '#FFFFFF', accent: '#FFFFFF' },
    'Балтика': { bg: '#0066CC', text: '#FFFFFF', accent: '#FFD700' },
    'Ротор': { bg: '#FFD700', text: '#000000', accent: '#000000' },
    'Родина': { bg: '#C8102E', text: '#FFFFFF', accent: '#FFFFFF' },
    'Алания': { bg: '#FF4500', text: '#FFFFFF', accent: '#FFFFFF' },
    'Чайка': { bg: '#00A3E0', text: '#FFFFFF', accent: '#FFFFFF' },
    'СКА-Хабаровск': { bg: '#006633', text: '#FFFFFF', accent: '#FFD700' },
    'Енисей': { bg: '#0066CC', text: '#FFFFFF', accent: '#FFFFFF' },
    'Арсенал': { bg: '#EF0107', text: '#FFFFFF', accent: '#FFD700' },
    'Нефтехимик': { bg: '#00A650', text: '#FFFFFF', accent: '#000000' },
    'Камаз': { bg: '#0078C8', text: '#FFFFFF', accent: '#FFFFFF' },
  };

  const logo = logoData[clubName] || { bg: '#666666', text: '#FFFFFF', accent: '#FFFFFF' };
  const initials = clubName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div
      className="rounded-lg flex items-center justify-center font-bold shadow-md relative overflow-hidden"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: logo.bg,
        color: logo.text,
        fontSize: `${size * 0.35}px`,
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke={logo.accent} strokeWidth="2" />
          <circle cx="50" cy="50" r="30" fill="none" stroke={logo.accent} strokeWidth="1" />
        </svg>
      </div>
      <span className="relative z-10" style={{ letterSpacing: '-0.05em' }}>
        {initials}
      </span>
    </div>
  );
};

export default ClubLogo;
