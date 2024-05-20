import React, { ReactNode, useEffect, useState } from 'react';
import socket, { SocketContext } from 'socket';

interface socketProviderPropsType {
  children: ReactNode;
}
function SocketProvider({ children }: socketProviderPropsType) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default SocketProvider;
