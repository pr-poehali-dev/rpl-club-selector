import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type League = 'RPL' | 'FNL';

interface Club {
  id: string;
  name: string;
  league: League;
  logo: string;
}

interface Player {
  id: string;
  name: string;
  number: number;
  clubId: string;
  penalties: {
    zone: number;
    scored: boolean;
  }[];
}

const clubs: Club[] = [
  { id: '1', name: 'Спартак', league: 'RPL', logo: '🔴' },
  { id: '2', name: 'ЦСКА', league: 'RPL', logo: '🔵' },
  { id: '3', name: 'Зенит', league: 'RPL', logo: '⚪' },
  { id: '4', name: 'Динамо', league: 'RPL', logo: '🔷' },
  { id: '5', name: 'Локомотив', league: 'RPL', logo: '🔴' },
  { id: '6', name: 'Краснодар', league: 'RPL', logo: '🟢' },
  { id: '7', name: 'Ротор', league: 'FNL', logo: '🟡' },
  { id: '8', name: 'Балтика', league: 'FNL', logo: '🔵' },
];

const players: Player[] = [
  {
    id: '1',
    name: 'Промес',
    number: 7,
    clubId: '1',
    penalties: [
      { zone: 1, scored: true },
      { zone: 3, scored: true },
      { zone: 9, scored: false },
      { zone: 7, scored: true },
      { zone: 1, scored: true },
    ],
  },
  {
    id: '2',
    name: 'Захарян',
    number: 10,
    clubId: '2',
    penalties: [
      { zone: 9, scored: true },
      { zone: 3, scored: true },
      { zone: 7, scored: false },
      { zone: 1, scored: true },
    ],
  },
  {
    id: '3',
    name: 'Азмун',
    number: 9,
    clubId: '3',
    penalties: [
      { zone: 7, scored: true },
      { zone: 9, scored: true },
      { zone: 3, scored: true },
      { zone: 7, scored: true },
      { zone: 1, scored: false },
    ],
  },
];

const Index = () => {
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filteredClubs = selectedLeague
    ? clubs.filter((club) => club.league === selectedLeague)
    : clubs;

  const clubPlayers = selectedClub
    ? players.filter((player) => player.clubId === selectedClub.id)
    : [];

  const getZoneStats = (player: Player) => {
    const zones: Record<number, { total: number; scored: number }> = {};
    player.penalties.forEach((pen) => {
      if (!zones[pen.zone]) zones[pen.zone] = { total: 0, scored: 0 };
      zones[pen.zone].total++;
      if (pen.scored) zones[pen.zone].scored++;
    });
    return zones;
  };

  const resetSelection = () => {
    setSelectedLeague(null);
    setSelectedClub(null);
    setSelectedPlayer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Icon name="Goal" size={48} className="text-secondary" />
            Анализ пенальти
          </h1>
          <p className="text-muted-foreground text-lg">
            Статистика ударов футболистов РПЛ и ФНЛ
          </p>
        </header>

        {selectedPlayer && (
          <Button
            onClick={resetSelection}
            variant="outline"
            className="mb-6"
          >
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Назад к выбору
          </Button>
        )}

        {!selectedLeague && (
          <div className="mb-12 animate-scale-in">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Выберите лигу
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card
                className="p-8 hover:shadow-xl transition-all cursor-pointer hover:scale-105 border-2 hover:border-primary"
                onClick={() => setSelectedLeague('RPL')}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">⚽</div>
                  <h3 className="text-2xl font-bold mb-2">РПЛ</h3>
                  <p className="text-muted-foreground">
                    Российская Премьер-Лига
                  </p>
                  <Badge className="mt-4" variant="secondary">
                    {clubs.filter((c) => c.league === 'RPL').length} клубов
                  </Badge>
                </div>
              </Card>
              <Card
                className="p-8 hover:shadow-xl transition-all cursor-pointer hover:scale-105 border-2 hover:border-primary"
                onClick={() => setSelectedLeague('FNL')}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold mb-2">ФНЛ</h3>
                  <p className="text-muted-foreground">
                    Футбольная Национальная Лига
                  </p>
                  <Badge className="mt-4" variant="secondary">
                    {clubs.filter((c) => c.league === 'FNL').length} клубов
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        )}

        {selectedLeague && !selectedClub && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                Клубы {selectedLeague === 'RPL' ? 'РПЛ' : 'ФНЛ'}
              </h2>
              <Button onClick={() => setSelectedLeague(null)} variant="ghost">
                Сменить лигу
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredClubs.map((club) => (
                <Card
                  key={club.id}
                  className="p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-105 border-2 hover:border-primary"
                  onClick={() => setSelectedClub(club)}
                >
                  <div className="text-center">
                    <div className="text-5xl mb-3">{club.logo}</div>
                    <h3 className="font-semibold text-lg">{club.name}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedClub && !selectedPlayer && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                Игроки {selectedClub.name}
              </h2>
              <Button onClick={() => setSelectedClub(null)} variant="ghost">
                Назад к клубам
              </Button>
            </div>
            {clubPlayers.length === 0 ? (
              <Card className="p-8 text-center">
                <Icon
                  name="Users"
                  size={48}
                  className="mx-auto mb-4 text-muted-foreground"
                />
                <p className="text-muted-foreground">
                  Нет данных об игроках этого клуба
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubPlayers.map((player) => {
                  const totalPenalties = player.penalties.length;
                  const scoredPenalties = player.penalties.filter(
                    (p) => p.scored
                  ).length;
                  const percentage =
                    totalPenalties > 0
                      ? Math.round((scoredPenalties / totalPenalties) * 100)
                      : 0;

                  return (
                    <Card
                      key={player.id}
                      className="p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-105 border-2 hover:border-primary"
                      onClick={() => setSelectedPlayer(player)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                          {player.number}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-xl mb-2">
                            {player.name}
                          </h3>
                          <div className="space-y-1 text-sm">
                            <p className="text-muted-foreground">
                              Всего пенальти: {totalPenalties}
                            </p>
                            <p className="text-muted-foreground">
                              Забито: {scoredPenalties}
                            </p>
                            <Badge
                              variant={percentage >= 70 ? 'default' : 'secondary'}
                              className="mt-2"
                            >
                              {percentage}% реализация
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {selectedPlayer && (
          <div className="animate-fade-in">
            <Card className="p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {selectedPlayer.number}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{selectedPlayer.name}</h2>
                  <p className="text-muted-foreground text-lg">
                    {clubs.find((c) => c.id === selectedPlayer.clubId)?.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center mb-8">
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-3xl font-bold text-primary">
                    {selectedPlayer.penalties.length}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Всего пенальти
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-3xl font-bold text-secondary">
                    {selectedPlayer.penalties.filter((p) => p.scored).length}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Забито
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-3xl font-bold text-destructive">
                    {selectedPlayer.penalties.filter((p) => !p.scored).length}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Промахи
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-center">
                Карта ударов
              </h3>
              <GoalVisualization player={selectedPlayer} />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const GoalVisualization = ({ player }: { player: Player }) => {
  const zoneStats = player.penalties.reduce((acc, pen) => {
    if (!acc[pen.zone]) acc[pen.zone] = { total: 0, scored: 0 };
    acc[pen.zone].total++;
    if (pen.scored) acc[pen.zone].scored++;
    return acc;
  }, {} as Record<number, { total: number; scored: number }>);

  const getZoneColor = (zone: number) => {
    const stats = zoneStats[zone];
    if (!stats) return 'bg-gray-100';
    const percentage = (stats.scored / stats.total) * 100;
    if (percentage >= 75) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getZoneOpacity = (zone: number) => {
    const stats = zoneStats[zone];
    if (!stats) return 'opacity-20';
    const totalPenalties = player.penalties.length;
    const zonePercentage = (stats.total / totalPenalties) * 100;
    if (zonePercentage >= 30) return 'opacity-100';
    if (zonePercentage >= 20) return 'opacity-70';
    return 'opacity-50';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-8 shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] rounded-lg opacity-30"></div>
        
        <div className="relative">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((zone) => {
              const stats = zoneStats[zone];
              return (
                <div
                  key={zone}
                  className={`aspect-square rounded-lg border-4 border-white/50 ${getZoneColor(
                    zone
                  )} ${getZoneOpacity(zone)} backdrop-blur-sm transition-all hover:scale-105 cursor-pointer flex flex-col items-center justify-center`}
                >
                  {stats && (
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold">
                        {stats.scored}/{stats.total}
                      </div>
                      <div className="text-xs mt-1 opacity-90">
                        {Math.round((stats.scored / stats.total) * 100)}%
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border-2 border-white/30">
            <div className="flex items-center justify-center gap-6 text-white text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>≥75% забито</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span>50-75%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>&lt;50%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
