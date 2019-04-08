# CompanyChat
.NET Core, Signalr, React SPA Chat Client

Ubiquiti Networks Latvia Full Stack Chat Task
Description
In this task, you need to create a chatroom web app which allow multiple users login/send message/receive message simultaneously.
The task is to create a chat client and server application. Create separate projects for server
and client, and submit your solution as GitHub repository links. Detailed requirements follow.

Server
1. Sends received messages to all connected clients (no rooms).
2. If a client is silent for more than a certain (configurable) amount of time, it is disconnected; a message about the event (e.g. "John was disconnected due to inactivity") is sent to all connected clients.
3. If a client is disconnected, but not due to inactivity, a different message is sent (e.g."John left the chat, connection lost" instead.)
4. Doesn't allow multiple active users with the same nickname.
5. Validates data received over the network.
6. Terminates gracefully upon receiving SIGINT or SIGTERM signals.
7. Provide readable logging solution

Client
1. Has two pages landing page (shown when not connected to the server) and chat (shown only when connected to the server).
2. Landing page has a box to enter nickname, a button to connect, and also displays feedback like 'Failed to connect. Nickname already taken.', 'Server unavailable.' or 'Disconnected by the server due to inactivity.'.
3. Chat page displays messages from the server together with the sender's nickname (but no messages from before the user's current session started), a box to enter a message,
a button to send it, and a button to disconnect from the server.
4. Does not have any inactivity timeouts.
5. Should display landing page if it's disconnected from the server.

UI/UX
1. Feel free to design/define your own UI and UX
