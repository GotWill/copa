export type MatchStatus = "open" | "active" | "closed"

export type Team = {
  name: string
  short: string
  flag: string
}

export type Match = {
  id: string
  home: Team
  away: Team
  date: string
  homeScore: number
  awayScore: number
  status: MatchStatus
}

const teams: Record<string, Team> = {
  bra: { name: "Brasil", short: "BRA", flag: "🇧🇷" },
  arg: { name: "Argentina", short: "ARG", flag: "🇦🇷" },
  ale: { name: "Alemanha", short: "ALE", flag: "🇩🇪" },
  bel: { name: "Bélgica", short: "BEL", flag: "🇧🇪" },
  jpn: { name: "Japão", short: "JPN", flag: "🇯🇵" },
  uru: { name: "Uruguai", short: "URU", flag: "🇺🇾" },
  fra: { name: "França", short: "FRA", flag: "🇫🇷" },
  esp: { name: "Espanha", short: "ESP", flag: "🇪🇸" },
  por: { name: "Portugal", short: "POR", flag: "🇵🇹" },
  ned: { name: "Holanda", short: "NED", flag: "🇳🇱" },
  eng: { name: "Inglaterra", short: "ENG", flag: "🏴" },
  cro: { name: "Croácia", short: "CRO", flag: "🇭🇷" },
}

export const matches: Match[] = [
  {
    id: "1",
    home: teams.bra,
    away: teams.arg,
    date: "22 de Novembro de 2022 às 16:00h",
    homeScore: 3,
    awayScore: 0,
    status: "open",
  },
  {
    id: "2",
    home: teams.ale,
    away: teams.bel,
    date: "22 de Novembro de 2022 às 19:00h",
    homeScore: 0,
    awayScore: 0,
    status: "active",
  },
  {
    id: "3",
    home: teams.jpn,
    away: teams.uru,
    date: "20 de Novembro de 2022 às 12:00h",
    homeScore: 0,
    awayScore: 0,
    status: "closed",
  },
  {
    id: "4",
    home: teams.fra,
    away: teams.esp,
    date: "23 de Novembro de 2022 às 16:00h",
    homeScore: 0,
    awayScore: 0,
    status: "open",
  },
  {
    id: "5",
    home: teams.por,
    away: teams.ned,
    date: "23 de Novembro de 2022 às 19:00h",
    homeScore: 0,
    awayScore: 0,
    status: "open",
  },
  {
    id: "6",
    home: teams.eng,
    away: teams.cro,
    date: "24 de Novembro de 2022 às 13:00h",
    homeScore: 0,
    awayScore: 0,
    status: "open",
  },
]

export type Player = {
  id: string
  name: string
  avatar: string
  points: number
  exactHits: number
  isCurrentUser?: boolean;
}

export const ranking: Player[] = [
  { id: "1", name: "Rodrigão", avatar: "/avatar-man-smiling.png", points: 142, exactHits: 12 },
  { id: "2", name: "Mariana Costa", avatar: "/avatar-woman-glasses.png", points: 138, exactHits: 11 },
  { id: "3", name: "Pedro Alves", avatar: "/avatar-young-man.png", points: 120, exactHits: 9 },
  { id: "4", name: "Juliana Reis", avatar: "/avatar-woman-curly-hair.png", points: 115, exactHits: 8 },
  { id: "5", name: "Carlos Mendes", avatar: "/avatar-man-beard.png", points: 98, exactHits: 6 },
  { id: "6", name: "Ana Beatriz", avatar: "/avatar-woman-short-hair.png", points: 87, exactHits: 5 },
]
