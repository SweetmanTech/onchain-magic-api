import getSetupNewContractLogs from "@/lib/zora/getSetupNewContractLogs";
import { formatLogs } from "./formatLogs";
import { NextRequest } from "next/server";
import { Address } from "viem";
import trackEndpoint from "@/lib/trackEndpoint";
import bulkTrackNewContracts from "./bulkTrackNewContracts";
import getStackSetupNewContractEvents from "./getStackSetupNewContractEvents";

export async function GET(request: NextRequest) {
  try {
    await trackEndpoint("zora+collections")
    const creator = new URL(request.url).searchParams.get('creator') as Address; 
    const {events, blockNumber} = await getStackSetupNewContractEvents(creator);
    const logs = await getSetupNewContractLogs(creator, blockNumber)
    const formattedLogs = formatLogs(logs);
    await bulkTrackNewContracts(formattedLogs);
    return Response.json({ message: 'success', data: [...events, ...formattedLogs] });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ message: 'failed' }, { status: 400 });
  }
}
