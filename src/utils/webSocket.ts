import { Server } from 'socket.io';
import { fetchCryptoPrice } from '../services/priceService';

const setupWebSocket = (server: any) => {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('User Connected:', socket.id);

    socket.on('subscribe', async (crypto: string) => {
      setInterval(async () => {
        const price = await fetchCryptoPrice(crypto);
        socket.emit('priceUpdate', price);
      }, 5000);
    });
  });

  return io;
};

export default setupWebSocket;
