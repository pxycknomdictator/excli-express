export async function getPackageLatestVersion(packageName: string) {
    const URL = `https://registry.npmjs.org/${packageName}/latest`;
    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("failed to fetch:");
        const { version } = (await response.json()) as { version: string };
        return version;
    } catch (error) {
        throw new Error(
            `Failed to fetch version for ${packageName}: Error: ${error}`,
        );
    }
}

export async function formatPackageVersions(packages: string[] = []) {
    const formattedPackages = Object.fromEntries(
        await Promise.all(
            packages.map(async (pkg) => [
                pkg,
                `^${await getPackageLatestVersion(pkg)}`,
            ]),
        ),
    );
    return formattedPackages;
}
