export async function getPackageLatestVersion(
    packageName: string,
    targetDir: string,
): Promise<string> {
    const { exec } = await import("child_process");
    const { promisify } = await import("util");

    const execAsync = promisify(exec);

    try {
        const { stdout } = await execAsync(`npm view ${packageName} version`, {
            cwd: targetDir,
        });
        return stdout.trim();
    } catch (error) {
        throw new Error(
            `Failed to fetch version for ${packageName}: Error: ${error}`,
        );
    }
}

export async function formatPackageVersions(
    packages: string[] = [],
    targetDir: string,
) {
    return Object.fromEntries(
        await Promise.all(
            packages.map(async (pkg) => [
                pkg,
                `^${await getPackageLatestVersion(pkg, targetDir)}`,
            ]),
        ),
    );
}
