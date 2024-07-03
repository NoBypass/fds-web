import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

type Modes = {
  [key: string]: Mode
};

type Mode = {
  wins: number,
  games: number,
  kills: number,
  goals: number,
  draws: number,
  losses: number,
  deaths: number,
  arrowsHit: number,
  hitsGiven: number,
  hitsTaken: number,
  arrowsShot: number,
  hitsBlocked: number,
  blocksPlaced: number,
  blocksBroken: number,
  gapplesEaten: number,
  playerCausedDeaths: number,
  yLevelSum: number,
  damageDealt: number,
  secondsSpentPlaying: number,
  [key: string]: number,
}

type Overall = {
  winstreak: number,
  dailyWinstreak: number,
  lifetimeWinstreak: number,
}

export const load: PageLoad = async ({ fetch, params }): Promise<{
    player: {
      cages: string[],
      discordId: string,
      lastLogin: number,
      lastLogout: number,
      playtime: number,
      username: string,
      ranked: {
        [key: string]: {
          elo: number,
          losses: number,
          wins: number,
          games: number,
        },
      },
      stats: {
        overall: Overall,
        bridge: {
          overall: Overall,
          private: Modes,
          ranked: Modes,
          casual: Modes,
          duel: Modes,
        },
        tow: {
          duel: Modes,
        }
      },
    },
    totals: Mode,
}> => {
  const player = await fetch(`${import.meta.env.VITE_API_URL}/player/scrims/${params.name}/overview`);

  if (player.status !== 200) {
    error(player.status, 'Player not found');
  }

  return await player.json();
}