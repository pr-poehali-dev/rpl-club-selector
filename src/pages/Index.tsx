import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ClubLogo from '@/components/ClubLogo';

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
  { id: '1', name: 'Зенит', league: 'RPL', logo: '' },
  { id: '2', name: 'Краснодар', league: 'RPL', logo: '' },
  { id: '3', name: 'Локомотив', league: 'RPL', logo: '' },
  { id: '4', name: 'Динамо', league: 'RPL', logo: '' },
  { id: '5', name: 'Спартак', league: 'RPL', logo: '' },
  { id: '6', name: 'ЦСКА', league: 'RPL', logo: '' },
  { id: '7', name: 'Ахмат', league: 'RPL', logo: '' },
  { id: '8', name: 'Ростов', league: 'RPL', logo: '' },
  { id: '9', name: 'Рубин', league: 'RPL', logo: '' },
  { id: '10', name: 'Крылья Советов', league: 'RPL', logo: '' },
  { id: '11', name: 'Факел', league: 'RPL', logo: '' },
  { id: '12', name: 'Акрон', league: 'RPL', logo: '' },
  { id: '13', name: 'Оренбург', league: 'RPL', logo: '' },
  { id: '14', name: 'Химки', league: 'RPL', logo: '' },
  { id: '15', name: 'Балтика', league: 'RPL', logo: '' },
  { id: '16', name: 'Родина', league: 'RPL', logo: '' },
  { id: '17', name: 'Алания', league: 'FNL', logo: '' },
  { id: '18', name: 'Ротор', league: 'FNL', logo: '' },
  { id: '19', name: 'Чайка', league: 'FNL', logo: '' },
  { id: '20', name: 'Енисей', league: 'FNL', logo: '' },
  { id: '21', name: 'СКА-Хабаровск', league: 'FNL', logo: '' },
  { id: '22', name: 'Камаз', league: 'FNL', logo: '' },
  { id: '23', name: 'Нефтехимик', league: 'FNL', logo: '' },
  { id: '24', name: 'Торпедо', league: 'FNL', logo: '' },
  { id: '25', name: 'Арсенал', league: 'FNL', logo: '' },
  { id: '26', name: 'Сочи', league: 'FNL', logo: '' },
  { id: '27', name: 'Кубань', league: 'FNL', logo: '' },
  { id: '28', name: 'Чертаново', league: 'FNL', logo: '' },
];

const players: Player[] = [
  { id: '1', name: 'Клаудиньо', number: 7, clubId: '1', penalties: [{ zone: 1, scored: true }, { zone: 3, scored: true }, { zone: 9, scored: true }, { zone: 1, scored: true }, { zone: 7, scored: true }] },
  { id: '2', name: 'Вендел', number: 22, clubId: '1', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 3, scored: false }, { zone: 7, scored: true }] },
  { id: '3', name: 'Мостовой', number: 19, clubId: '1', penalties: [{ zone: 9, scored: true }, { zone: 1, scored: true }, { zone: 3, scored: true }] },
  
  { id: '4', name: 'Кордоба', number: 9, clubId: '2', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 1, scored: true }, { zone: 9, scored: true }, { zone: 7, scored: false }] },
  { id: '5', name: 'Козлов', number: 16, clubId: '2', penalties: [{ zone: 3, scored: true }, { zone: 1, scored: true }, { zone: 9, scored: true }] },
  { id: '6', name: 'Мамаев', number: 8, clubId: '2', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: false }, { zone: 1, scored: true }] },

  { id: '7', name: 'Смолов', number: 9, clubId: '3', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: true }, { zone: 9, scored: true }, { zone: 7, scored: false }, { zone: 1, scored: true }] },
  { id: '8', name: 'Батраков', number: 19, clubId: '3', penalties: [{ zone: 1, scored: true }, { zone: 3, scored: true }, { zone: 9, scored: true }] },
  { id: '9', name: 'Гржибовски', number: 17, clubId: '3', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: false }] },

  { id: '10', name: 'Фомин', number: 6, clubId: '4', penalties: [{ zone: 3, scored: true }, { zone: 9, scored: true }, { zone: 1, scored: true }, { zone: 7, scored: true }] },
  { id: '11', name: 'Захарян', number: 11, clubId: '4', penalties: [{ zone: 9, scored: true }, { zone: 3, scored: true }, { zone: 7, scored: true }, { zone: 9, scored: false }] },
  { id: '12', name: 'Макаров', number: 99, clubId: '4', penalties: [{ zone: 1, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: true }] },

  { id: '13', name: 'Промес', number: 7, clubId: '5', penalties: [{ zone: 1, scored: true }, { zone: 3, scored: true }, { zone: 9, scored: false }, { zone: 7, scored: true }, { zone: 1, scored: true }] },
  { id: '14', name: 'Угальде', number: 9, clubId: '5', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: true }, { zone: 9, scored: true }] },
  { id: '15', name: 'Мантуан', number: 14, clubId: '5', penalties: [{ zone: 7, scored: true }, { zone: 1, scored: true }] },

  { id: '16', name: 'Чалов', number: 11, clubId: '6', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: false }, { zone: 1, scored: true }, { zone: 9, scored: true }] },
  { id: '17', name: 'Обляков', number: 20, clubId: '6', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 3, scored: true }] },
  { id: '18', name: 'Бистрович', number: 14, clubId: '6', penalties: [{ zone: 1, scored: true }, { zone: 7, scored: false }] },

  { id: '19', name: 'Джаа', number: 7, clubId: '7', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 3, scored: true }, { zone: 7, scored: true }] },
  { id: '20', name: 'Кайоде', number: 9, clubId: '7', penalties: [{ zone: 9, scored: true }, { zone: 1, scored: true }, { zone: 7, scored: false }] },
  { id: '21', name: 'Глушенков', number: 24, clubId: '7', penalties: [{ zone: 3, scored: true }, { zone: 9, scored: true }] },

  { id: '22', name: 'Комличенко', number: 9, clubId: '8', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: true }, { zone: 1, scored: false }] },
  { id: '23', name: 'Голенков', number: 10, clubId: '8', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 3, scored: true }] },
  { id: '24', name: 'Шаперев', number: 17, clubId: '8', penalties: [{ zone: 1, scored: true }, { zone: 7, scored: true }] },

  { id: '25', name: 'Уремович', number: 5, clubId: '9', penalties: [{ zone: 3, scored: true }, { zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 1, scored: true }] },
  { id: '26', name: 'Костюков', number: 19, clubId: '9', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: false }, { zone: 3, scored: true }] },
  { id: '27', name: 'Байрамян', number: 7, clubId: '9', penalties: [{ zone: 1, scored: true }, { zone: 9, scored: true }] },

  { id: '28', name: 'Сергеев', number: 9, clubId: '10', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 3, scored: true }, { zone: 7, scored: true }, { zone: 1, scored: false }] },
  { id: '29', name: 'Мелешко', number: 11, clubId: '10', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: true }] },
  { id: '30', name: 'Бибиков', number: 27, clubId: '10', penalties: [{ zone: 1, scored: true }, { zone: 9, scored: true }] },

  { id: '31', name: 'Шешуков', number: 10, clubId: '11', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: false }, { zone: 1, scored: true }] },
  { id: '32', name: 'Апаленко', number: 7, clubId: '11', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 3, scored: true }] },
  { id: '33', name: 'Шутов', number: 19, clubId: '11', penalties: [{ zone: 1, scored: true }, { zone: 7, scored: true }] },

  { id: '34', name: 'Ломакин', number: 10, clubId: '12', penalties: [{ zone: 3, scored: true }, { zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: true }] },
  { id: '35', name: 'Гашич', number: 9, clubId: '12', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: false }, { zone: 1, scored: true }] },
  { id: '36', name: 'Пинто', number: 8, clubId: '12', penalties: [{ zone: 7, scored: true }, { zone: 3, scored: true }] },

  { id: '37', name: 'Бебе', number: 11, clubId: '13', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: true }, { zone: 1, scored: false }] },
  { id: '38', name: 'Лучкевич', number: 99, clubId: '13', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 3, scored: true }] },
  { id: '39', name: 'Ботуа', number: 20, clubId: '13', penalties: [{ zone: 1, scored: true }, { zone: 7, scored: true }] },

  { id: '40', name: 'Кокорин', number: 9, clubId: '14', penalties: [{ zone: 3, scored: true }, { zone: 9, scored: true }, { zone: 7, scored: false }, { zone: 1, scored: true }] },
  { id: '41', name: 'Еременко', number: 10, clubId: '14', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: true }] },
  { id: '42', name: 'Пиманов', number: 17, clubId: '14', penalties: [{ zone: 1, scored: true }, { zone: 9, scored: true }] },

  { id: '43', name: 'Алексеев', number: 9, clubId: '15', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 3, scored: true }] },
  { id: '44', name: 'Мамедов', number: 10, clubId: '15', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: false }, { zone: 1, scored: true }] },
  { id: '45', name: 'Катенин', number: 11, clubId: '15', penalties: [{ zone: 3, scored: true }, { zone: 9, scored: true }] },

  { id: '46', name: 'Комличенко', number: 19, clubId: '16', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: false }] },
  { id: '47', name: 'Зотов', number: 7, clubId: '16', penalties: [{ zone: 1, scored: true }, { zone: 9, scored: true }, { zone: 7, scored: true }] },
  { id: '48', name: 'Коваленко', number: 8, clubId: '16', penalties: [{ zone: 3, scored: true }, { zone: 9, scored: true }] },

  { id: '49', name: 'Базелян', number: 9, clubId: '17', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 3, scored: true }] },
  { id: '50', name: 'Гацкан', number: 10, clubId: '17', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: false }] },
  
  { id: '51', name: 'Корян', number: 11, clubId: '18', penalties: [{ zone: 3, scored: true }, { zone: 9, scored: true }, { zone: 7, scored: true }] },
  { id: '52', name: 'Суслов', number: 7, clubId: '18', penalties: [{ zone: 1, scored: true }, { zone: 9, scored: true }] },

  { id: '53', name: 'Мурнин', number: 9, clubId: '19', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }] },
  { id: '54', name: 'Паляница', number: 10, clubId: '19', penalties: [{ zone: 3, scored: true }, { zone: 1, scored: true }] },

  { id: '55', name: 'Паваренич', number: 9, clubId: '20', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 3, scored: false }] },
  { id: '56', name: 'Цыбульник', number: 17, clubId: '20', penalties: [{ zone: 1, scored: true }, { zone: 9, scored: true }] },

  { id: '57', name: 'Демьяненко', number: 10, clubId: '21', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }] },
  { id: '58', name: 'Богомольский', number: 11, clubId: '21', penalties: [{ zone: 3, scored: true }, { zone: 1, scored: true }] },

  { id: '59', name: 'Седов', number: 7, clubId: '22', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }, { zone: 3, scored: true }] },
  { id: '60', name: 'Калимуллин', number: 10, clubId: '22', penalties: [{ zone: 9, scored: true }, { zone: 1, scored: false }] },

  { id: '61', name: 'Воротников', number: 9, clubId: '23', penalties: [{ zone: 3, scored: true }, { zone: 9, scored: true }] },
  { id: '62', name: 'Саркисов', number: 10, clubId: '23', penalties: [{ zone: 7, scored: true }, { zone: 1, scored: true }] },

  { id: '63', name: 'Иванов', number: 9, clubId: '24', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: true }] },
  { id: '64', name: 'Смирнов', number: 10, clubId: '24', penalties: [{ zone: 1, scored: true }, { zone: 9, scored: false }] },

  { id: '65', name: 'Мещеряков', number: 11, clubId: '25', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }] },
  { id: '66', name: 'Панченко', number: 7, clubId: '25', penalties: [{ zone: 3, scored: true }, { zone: 1, scored: true }] },

  { id: '67', name: 'Заболотный', number: 9, clubId: '26', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: true }, { zone: 3, scored: false }] },
  { id: '68', name: 'Петров', number: 10, clubId: '26', penalties: [{ zone: 1, scored: true }, { zone: 9, scored: true }] },

  { id: '69', name: 'Сидоренко', number: 7, clubId: '27', penalties: [{ zone: 7, scored: true }, { zone: 9, scored: true }] },
  { id: '70', name: 'Романов', number: 11, clubId: '27', penalties: [{ zone: 3, scored: true }, { zone: 1, scored: true }] },

  { id: '71', name: 'Николаев', number: 9, clubId: '28', penalties: [{ zone: 9, scored: true }, { zone: 7, scored: false }] },
  { id: '72', name: 'Федоров', number: 10, clubId: '28', penalties: [{ zone: 3, scored: true }, { zone: 1, scored: true }] },
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
                    <div className="flex justify-center mb-3">
                      <ClubLogo clubName={club.name} size={80} />
                    </div>
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