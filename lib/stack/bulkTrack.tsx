import { STACK_API_KEY } from './client';

const bulkTrack = async (events: any) => {
  if (!Array.isArray(events) || events.length === 0) {
    throw new Error('Events should be a non-empty array');
  }

  if (events.length > 100) {
    throw new Error('You can track a maximum of 100 events in a single request');
  }

  const url = 'https://track.stack.so/event';
  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': STACK_API_KEY,
  };

  const body = JSON.stringify(events);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error tracking events: ${errorData.message}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default bulkTrack;
