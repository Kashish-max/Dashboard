import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
} from "@material-tailwind/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { generateCSV } from "../export/generate-csv";
import { generateJSON } from "../export/generate-json";

export const ExportMenu = ({ csvTitleRow, data, fileName, children }) => {

    return (
        <Menu placement="bottom-end">
            <MenuHandler>
                {children}
            </MenuHandler>
            <MenuList>
                <MenuItem className="flex items-center gap-2" onClick={() => generateCSV(csvTitleRow, data, fileName)}>
                    <ArrowUpTrayIcon strokeWidth={2} className="h-4 w-4 text-[#3F3F46]" />
                    <Typography variant="small" className="font-normal text-[#3F3F46]">
                        Export as CSV
                    </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2" onClick={() => generateJSON(data, fileName)}>
                    <ArrowUpTrayIcon strokeWidth={2} className="h-4 w-4 text-[#3F3F46]" />
                    <Typography variant="small" className="font-normal text-[#3F3F46]">
                        Export as JSON
                    </Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default ExportMenu;