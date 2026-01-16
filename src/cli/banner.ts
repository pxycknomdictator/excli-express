import figlet from "figlet";
import { BANNER_FONT } from "src/config/constants";

export function displayBanner(): void {
    console.clear();

    const banner = figlet.textSync("Excli", {
        font: BANNER_FONT,
        horizontalLayout: "full",
        verticalLayout: "full",
    });

    console.log(`\x1b[96m ${banner} \x1b[0m`);
}
