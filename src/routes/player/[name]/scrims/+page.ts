import type { PageLoad } from './$types';

export const load: PageLoad = async ({params}): Promise<{
  player: {
    player: {
      cages: string[],
      discordId: string,
      lastLogin: number,
      lastLogout: number,
      playtime: number,
      username: string,
      ranked: any
      stats: any
    },
    times: any[],
  },
  error: string
}> => {
  const player = await fetch(`${import.meta.env.VITE_API_URL}/player/scrims/${params.name}`);

  return {
    player: await player.json(),
    error: player.status !== 200 ? 'Player not found' : ''
  }
}