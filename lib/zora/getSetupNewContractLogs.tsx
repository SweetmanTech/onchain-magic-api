import { CHAIN_ID } from '../consts';
import {
  zoraCreator1155FactoryImplAddress,
  zoraCreator1155FactoryImplABI,
} from '@zoralabs/protocol-deployments';
import { getPublicClient } from '../viem';
import { Address, BlockNumber, BlockTag } from 'viem';

const getSetupNewContractLogs = async (
  creator?: Address,
  fromBlock: BlockNumber | BlockTag | undefined = 'earliest',
) => {
  const publicClient = getPublicClient(CHAIN_ID);
  const args = {} as any;
  if (creator) args.defaultAdmin = creator;
  const contractEvents = await publicClient.getContractEvents({
    address: zoraCreator1155FactoryImplAddress[CHAIN_ID],
    abi: zoraCreator1155FactoryImplABI,
    eventName: 'SetupNewContract',
    args,
    fromBlock,
  });
  return contractEvents;
};

export default getSetupNewContractLogs;
