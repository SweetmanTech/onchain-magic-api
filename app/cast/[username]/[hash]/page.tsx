import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { CHANNELS, DEFAULT_FRAME, DESCRIPTION, TITLE } from '@/lib/consts';
import getCastHash from '@/lib/neynar/getCastHash';
import { supabaseClient } from '@/lib/supabase/client';
import Cast from '@/components/Cast';
import findValidEmbed from '@/lib/findValidEmbed';
import fetchMetadata from '@/lib/fetchMetadata';

const frameMetadata = { ...getFrameMetadata(DEFAULT_FRAME), 'of:accepts:xmtp': '2024-02-01' };

const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images:
      'https://sonata-git-tahir-update-image-for-individu-321df3-cooprecsmusic.vercel.app/images/og.png',
  },
  icons: [
    'https://sonata-git-tahir-update-image-for-individu-321df3-cooprecsmusic.vercel.app/images/logo2.png',
  ],
  other: {
    ...frameMetadata,
  },
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { username, hash } = params;

  try {
    const fullHash = await getCastHash(`https://warpcast.com/${username}/${hash}`);

    const { data: cast } = await supabaseClient
      .from('posts')
      .select('*')
      .eq('post_hash', fullHash)
      .single();

    const embed = findValidEmbed(cast);
    const url: any = embed?.url;
    const metadata = await fetchMetadata(url, cast);

    const channelId: any = cast?.channelId;

    const getChannelData = (channelId: any) => {
      return CHANNELS.find((channel) => channel.value === channelId);
    };

    const channelData = getChannelData(channelId);

    const channelLabel = channelData?.label || '/sonata';
    const channelLink =
      channelData?.icon ||
      'https://sonata-git-tahir-update-image-for-individu-321df3-cooprecsmusic.vercel.app/images/notes.jpg';
    const ogImageUrl = `/api/og-image/?trackName=${encodeURIComponent(metadata?.trackName || '')}&artistName=${encodeURIComponent(metadata?.artistName || '')}&artworkUrl=${encodeURIComponent(metadata?.artworkUrl || '')}&points=${encodeURIComponent(cast?.points || '')}&channelLabel=${encodeURIComponent(channelLabel)}&channelIcon=${encodeURIComponent(channelLink)}`;

    return {
      title: cast.title || TITLE,
      description: cast.description || DESCRIPTION,
      openGraph: {
        title: cast.title || TITLE,
        description: cast.description || DESCRIPTION,
        images:
          'https://sonata-git-tahir-update-image-for-individu-321df3-cooprecsmusic.vercel.app/' +
          ogImageUrl,
      },
      icons: [
        'https://sonata-git-tahir-update-image-for-individu-321df3-cooprecsmusic.vercel.app/images/logo2.png',
      ],
      other: {
        ...frameMetadata,
      },
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return metadata;
  }
}

export default async function CastHome({ params }: { params: { username: string; hash: string } }) {
  const { username, hash } = params;
  const fullHash = await getCastHash(`https://warpcast.com/${username}/${hash}`);

  const { data: cast } = await supabaseClient
    .from('posts')
    .select('*')
    .eq('post_hash', fullHash)
    .single();

  return (
    <main className="container flex grow items-center justify-center">
      <Cast cast={cast} />
    </main>
  );
}
