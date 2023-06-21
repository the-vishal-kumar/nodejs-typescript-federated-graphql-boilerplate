import { Socket } from '../../model';
import { ISocketDocument } from '../../type';

const socket = async (_context: unknown, { identifier }: { identifier: string }): Promise<ISocketDocument> => {
  const socket = await Socket.findById(identifier);
  if (!socket) throw new Error('Socket not found');
  return socket;
};

export default socket;
