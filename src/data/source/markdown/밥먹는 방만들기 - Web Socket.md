---
title: 밥먹는 방만들기 - Web Socket
category: null
---


# 밥먹는 방만들기 - Web Socket

https://en.wikipedia.org/wiki/WebSocket
을 읽으며..내 방식대로 필사한다.



# WebSocket

is a computer communications protocol,

providing full-duplex communication channels
over a single TCP connection.

(
  Duplex(telecommunications)

  A duplex communication system is a point-to-point system
  composed of two or more connected parties or devices
  that can communicate with one another "in both directions".
)

음!

The WebSocket protocol was standardized by the IETF as RFC6455 in 2011.

The current API specification allowing web applications to use this protocol is known as 'WebSockets'.

It is a living standard maintained by the WHATWG and a successor to The WebSocket API from the W3C.

WebSocket is distinct from HTTP. (!!)

Both protocols are located at layer 7 in the OSI model and depend on TCP at layer 4.

Although they are different, RFC 6455 states that "WebSocket is designed to work over HTTP ports 443 and 80 as well as to support HTTP proxies and intermediaries", thus making it compatible with HTTP.

To achieve compatibility, the WebSocket handshake uses the HTTP Upgrade header to change from the HTTP protocol to the WebSocket protocol.

The WebSocket protocol enables interaction between a web browser and a web server
with lower overhead
than half-duplex alternatives such as HTTP polling, facilitating real-time data transfer from and to the server.

(

Polling(computer science)

Polling, or polled operation,
in computer science,
refers to 'actively sampling'
the status of an external device
by a client program
as a synchronous activity.

Polling is most often used in terms of input/output,
and is also referred to as
`polled I/O`
or
`software-driven I/O`.

)

This is made possible by providing
a standardized way for the server
to send content
to the client
without being first requested by the client,

and allowing messages to be passed back and forth
while keeping the connection open.

In this way, a two-way ongoing conversation can take place between the client and the server.

The communications are usually done over TCP port number 443
(or 80, in the case of unsecured connections),
which is beneficial for environments that block non-web Internet connections using a firewall.

Unlike HTTP, WebSocket provides full-duplex communication.

Before WebSocket, port 80 full-duplex communication was attainable using Comet channels.

However, Comet implementation is nontrivial, and due to the TCP handshake and HTTP header overhead, it is inefficient for small messages.

The WebSocket protocol aims to solve these problems without compromising the security assumptions of the web.

The WebSocket protocol specification defines `ws(webSocket)` and `wss(webSocketSecure)` as two new uniform resource identifier(uri) schemes that are used for unencrypted and encrypted connections respectively.

Apart from the scheme name and fragment, the rest of the URI components are defined to use URI generic syntax.

Using browser developer tools, developers can inspect the WebSocket handshake as well as the WebSocket frames.