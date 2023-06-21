import { Types } from 'mongoose';
import { Socket } from '../../model';
import { ISocketConnection } from '../../type';

const sockets = async (
  _context: unknown,
  { after, before, first, last }: { after: string; before: string; first: number; last: number },
): Promise<ISocketConnection> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};

  if (after) query._id = { $gt: new Types.ObjectId(after) };
  if (before) query._id = { $lt: new Types.ObjectId(before) };

  const totalCount = await Socket.countDocuments(query);

  let limit = first || last || 10;
  limit = Math.min(Math.max(limit, 1), 100);

  let skip = 0;
  if (last && !first) skip = Math.max(totalCount - limit, 0);

  const sockets = await Socket.find(query).sort({ _id: 1 }).skip(skip).limit(limit);

  const hasNextPage = Boolean(first) && totalCount > limit + skip;
  const hasPreviousPage = Boolean(last) && skip > 0;

  const edges = sockets.map(socket => ({
    cursor: socket._id.toString(),
    node: socket,
  }));

  const pageInfo = {
    hasNextPage,
    hasPreviousPage,
    startCursor: edges.length > 0 ? edges[0].cursor : null,
    endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
  };

  return {
    totalCount,
    edges,
    pageInfo,
  };
};

export default sockets;
