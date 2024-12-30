import { findServer } from "./findServer";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("findServer", () => {
  const servers = [
    { url: "https://does-not-work.perfume.new", priority: 1 },
    { url: "https://gitlab.com", priority: 4 },
    { url: "http://app.scnt.me", priority: 3 },
    { url: "https://offline.scentronix.com", priority: 2 },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the online server with the lowest priority", async () => {
    // Mock responses for each server
    mockedAxios.get
      .mockRejectedValueOnce(new Error("Server offline"))
      .mockResolvedValueOnce({ status: 200 })
      .mockResolvedValueOnce({ status: 200 })
      .mockRejectedValueOnce(new Error("Server offline"));

    const result = await findServer(servers);

    expect(result).toEqual({ url: "http://app.scnt.me", priority: 3 });
    expect(mockedAxios.get).toHaveBeenCalledTimes(4);
  });

  it("should throw an error if no servers are online", async () => {
    // Mock all servers as offline
    mockedAxios.get.mockRejectedValue(new Error("Server offline"));

    await expect(findServer(servers)).rejects.toThrow("No servers are online");
    expect(mockedAxios.get).toHaveBeenCalledTimes(4);
  });

  it("should handle timeout when server does not respond within 5 seconds", async () => {
    // Mock a timeout for one server and an online response for another
    mockedAxios.get
      .mockRejectedValueOnce(new Error("Timeout"))
      .mockResolvedValueOnce({ status: 200 });

    const result = await findServer(servers);

    expect(result).toEqual({ url: "https://gitlab.com", priority: 4 });
    expect(mockedAxios.get).toHaveBeenCalledTimes(4);
  });
});