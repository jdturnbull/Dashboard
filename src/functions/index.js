import call from '../utils/call';

export const getConversation = async (workerId) => {
  const conversation = await call('POST', 'shopify/conversations/retrieve', { workerId });
  return conversation;
};
