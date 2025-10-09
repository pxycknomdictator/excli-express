import { existsSync } from "node:fs";
import { hasPkManager } from "@/utils/shell";
import { terminate } from "@/utils/terminate";
import type { PackageManager } from "@/types";

export function validateDirectory(targetDir: string, directory: string): void {
    if (existsSync(targetDir) && directory?.trim()) {
        return terminate(
            `${directory} already exists. Please choose a different name.`,
        );
    }
}

export function validatePackageManager(pkgManager: PackageManager): void {
    if (!hasPkManager(pkgManager)) {
        terminate(
            `❌ ${pkgManager} is not installed on your system! Please install it first.`,
        );
    }
}

export function validateTemplate(templatePath: string): void {
    if (!existsSync(templatePath)) {
        terminate(`❌ Template not found at: ${templatePath}`);
    }
}
