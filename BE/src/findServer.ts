import axios from "axios";

interface Server {
  url: string;
  priority: number;
}

/**
 * A function to find the online server with the lowest priority.
 * @param servers - Array of server objects with `url` and `priority`.
 * @returns Promise that resolves with the online server with the lowest priority or rejects if no server is online.
 */
export async function findServer(
  servers: Server[]
): Promise<Server> {
  // Helper function to check if a server is online
  const checkServer = async (server: Server) => {
    try {
      const response = await axios.get(server.url, { timeout: 5000 });
      if (response.status >= 200 && response.status < 300) {
        return true;
      }
    } catch {
      // Ignore errors (server is offline or unreachable)
    }
    return false;
  };

  // Check all servers in parallel
  const results = await Promise.all(
    servers.map(async (server) => ({
      server,
      online: await checkServer(server),
    }))
  );

  // Filter online servers
  const onlineServers = results
    .filter((result) => result.online)
    .map((result) => result.server);

  // If no servers are online, reject the Promise
  if (onlineServers.length === 0) {
    throw new Error("No servers are online");
  }

  // Return the online server with the lowest priority
  return onlineServers.reduce((lowest, current) =>
    current.priority < lowest.priority ? current : lowest
  );
}