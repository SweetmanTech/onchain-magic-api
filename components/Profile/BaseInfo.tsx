import { useProfileProvider } from '@/providers/ProfileProvider';
import { Avatar, AvatarImage } from '../ui/avatar';
import Image from 'next/image';

const BaseInfo = () => {
  const { profile } = useProfileProvider();

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-[60px]">
        <AvatarImage src={profile?.pfp.url} />
      </Avatar>
      <div className="space-y-1">
        <p className="font-sora text-[21px] font-semibold">{profile?.displayName}</p>
        <div className="flex gap-2">
          <div className="flex h-[33px] items-center justify-center rounded-full bg-grey-light px-4 font-sora text-[14px] font-semibold">
            #{profile?.fid}
          </div>
          <div className="flex h-[33px] items-center justify-center gap-1 rounded-full bg-purple-light px-4 font-sora text-[14px] font-semibold">
            <Image src="/images/neynar.svg" alt="warpcast" width={16} height={14} />
            <p className="text-purple">{profile?.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseInfo;