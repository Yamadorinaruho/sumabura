export interface Team {
 name: string;
 points: number;
 wins: number;
 losses: number;
 draws: number;
}

export interface Match {
 team1: string;
 team2: string;
 score1: number;
 score2: number;
 played: boolean;
}
