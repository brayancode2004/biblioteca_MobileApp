import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import 'text-encoding-polyfill'; // 

let stompClient = null;

export const connect = (codigoRetiro, onMessageReceived) => {
  const socket = new SockJS('http://192.168.40.199:8181/api/prestamosqr');
  stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: () => {
      console.log('Connected to WebSocket');
      stompClient.subscribe(`/topic/prestamoEstado/${codigoRetiro}`, (message) => {
        console.log('Message received: ', message.body);
        onMessageReceived(message.body);
      });
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
    onDisconnect: () => {
      console.log('Disconnected from WebSocket');
    },
  });
  stompClient.activate();
};

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.deactivate();
  }
};
