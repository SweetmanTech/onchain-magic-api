import { CHAIN_ID, SETUP_NEW_CONTRACT_STACK_EVENT_NAME_BASE } from '@/lib/consts';
import bulkTrack from '@/lib/stack/bulkTrack';
import { STACK_POINT_SYSTEM_ID } from '@/lib/stack/client';

const bulkTrackNewContracts = async (formattedLogs: any[]) => {
  const events = formattedLogs.map((log) => ({
    name: `${SETUP_NEW_CONTRACT_STACK_EVENT_NAME_BASE}-${CHAIN_ID}`,
    account: log.metadata.defaultAdmin,
    pointSystemId: STACK_POINT_SYSTEM_ID,
    points: 1,
    metadata: { ...log.metadata },
    uniqueId: `${CHAIN_ID}/${log.metadata.newContract}`,
  }));
  try {
    const response = await bulkTrack(events);
    return response;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default bulkTrackNewContracts;
