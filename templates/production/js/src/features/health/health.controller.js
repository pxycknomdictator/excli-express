export function healthStatus(_, res) {
    return res.status(200).json({ status: "OK" });
}
