import {StackClient} from "@stackso/js-core";

export const STACK_API_KEY = process.env.STACK_API_KEY as string;
export const STACK_POINT_SYSTEM_ID = process.env.STACK_POINT_SYSTEM_ID as string;

export const stack = new StackClient({
  apiKey: STACK_API_KEY as string, 
  pointSystemId: parseInt(STACK_POINT_SYSTEM_ID as string, 10),
});
