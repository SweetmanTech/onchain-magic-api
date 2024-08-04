import { stack } from '@/lib/stack/client';
import { Address, BlockTag } from 'viem';

const getStackSetupNewContractEvents = async (creator: Address) => {
  const response = await stack.getEvents({
    address: creator,
    event: 'SetupNewContract',
  });

  const blockNumbers = response
    .map((event: any) => event.metadata?.blockNumber)
    .filter((blockNumber: any) => blockNumber !== undefined)
    .map((blockNumber: any) => parseInt(blockNumber, 10));

  const highestBlockNumber =
    blockNumbers.length > 0 ? BigInt(Math.max(...blockNumbers) + 1) : ('earliest' as BlockTag);

  return { events: response, blockNumber: highestBlockNumber };
};

export default getStackSetupNewContractEvents;
