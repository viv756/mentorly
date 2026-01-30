import { Server as HTTPServer } from "http";
import jwt from "jsonwebtoken";
import { Server, type Socket } from "socket.io";
import { Env } from "../config/env.config";
import {
  updateSessionAttendanceWhenJoinService,
  updateSessionAttendanceWhenLeftService,
} from "../services/session.service";

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

let io: Server | null = null;

export const initializeSocket = (httpServer: HTTPServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: Env.FRONTEND_ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const authHeader = socket.handshake.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        return next(new Error("Invalid authorization header"));
      }

      console.log("Raw access token:", authHeader);
      const token = authHeader.split(" ")[1];
      console.log("Token", token);

      const decodedToken = jwt.verify(token, Env.JWT_ACCESS_SECRET) as {
        userId: string;
      };
      if (!decodedToken) return next(new Error("Unauthorized"));

      socket.userId = decodedToken.userId;
      next();
    } catch (error) {
      next(new Error("Internal server error"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    const userId = socket.userId!;
    console.log(userId, "UserId");
    // const newSocketId = socket.id;
    if (!socket.userId) {
      socket.disconnect(true);
      return;
    }

    socket.on("session:join", async (sessionId, callback?: (err?: string) => void) => {
      try {
        await updateSessionAttendanceWhenJoinService(sessionId, userId);
        callback?.();
      } catch (error) {
        callback?.("Error joining session");
      }
    });

    socket.on("session:left", async (sessionId, callback?: (err?: string) => void) => {
      try {
        await updateSessionAttendanceWhenLeftService(sessionId, userId);
        callback?.();
      } catch (error) {
        callback?.("Error lefting session");
      }
    });
  });
};
