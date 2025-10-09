import type { EnvFile } from "@/types";
import { ENV_VARIABLES } from "@/config/constants";

export function generateEnvFiles(): EnvFile[] {
    return [
        { file: ".env", variables: ENV_VARIABLES },
        { file: ".env.example", variables: ENV_VARIABLES },
    ];
}
