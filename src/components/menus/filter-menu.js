import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
} from "@material-tailwind/react";
import { NoSymbolIcon } from "@heroicons/react/24/outline";

export const FilterMenu = ({ children }) => {

    return (
        <Menu placement="bottom-end">
            <MenuHandler>
                {children}
            </MenuHandler>
            <MenuList>
                <MenuItem className="flex items-center gap-2">
                    <NoSymbolIcon strokeWidth={2} className="h-4 w-4 text-[#3F3F46]" />
                    <Typography variant="small" className="font-normal text-[#3F3F46]">
                        No Filters Available                        
                    </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                    <Typography variant="small" className="font-normal text-xs text-gray-500">
                        Please click on any column title <br /> to perform sorting
                    </Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default FilterMenu;