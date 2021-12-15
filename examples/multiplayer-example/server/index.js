(async () => {
  const { geckos } = await import('@geckos.io/server');

  const players = {};

  const io = geckos();
  const PORT = 9208;
  io.listen(PORT);

  process.on('SIGTERM', () => {
    io.server.close();
  });

  console.log(`running on port ${PORT}`);

  io.onConnection((channel) => {
    channel.on('join-request', () => {
      players[channel.id] = {
        id: channel.id,
        x: 0,
        y: 0,
        z: 0,
      };
      channel.emit('join-response', players[channel.id]);
    });

    channel.on('player-frame', (d) => {
      const { id, x, y, z } = d;
      players[id] = { id, x, y, z };
    });

    channel.onDisconnect(() => {
      delete players[channel.id];
    });
  });

  setInterval(() => {
    if (io.connectionsManager.connections.size <= 0) {
      return;
    }

    io.emit('frame', {
      players,
    });
  }, 1 / 60);
})();
