import { CHAIN_ID } from '@/lib/consts';

export const formatLogs = (logs: any[]) =>
  logs.map((log) => ({
    event: log.eventName,
    address: log.address,
    points: 1,
    metadata: {
      name: log.args.name,
      creator: log.args.creator,
      uniqueId: `${CHAIN_ID}/${log.args.newContract}`,
      blockNumber: log.blockNumber.toString(),
      contractURI: log.args.contractURI,
      newContract: log.args.newContract,
      defaultAdmin: log.args.defaultAdmin,
      defaultRoyaltyConfiguration: {
        royaltyBPS: log.args.defaultRoyaltyConfiguration.royaltyBPS,
        royaltyRecipient: log.args.defaultRoyaltyConfiguration.royaltyRecipient,
        royaltyMintSchedule: log.args.defaultRoyaltyConfiguration.royaltyMintSchedule,
      },
    },
    transactionHash: log.transactionHash,
    transactionIndex: log.transactionIndex.toString(),
    logIndex: log.logIndex.toString(),
    blockHash: log.blockHash,
    removed: log.removed,
    topics: log.topics.map((topic: any) => topic.toString()),
  }));

export default formatLogs;
