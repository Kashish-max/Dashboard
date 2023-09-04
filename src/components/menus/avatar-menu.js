import {
    Avatar,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Typography,
} from "@material-tailwind/react";
import { Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

export const AvatarMenu = ({ user }) => {

    const handleSingOut = () => {
        signOut({callbackUrl: process.env.NEXT_PUBLIC_DOMAIN});
    }

    return (
        <Menu placement="bottom-end">
            <MenuHandler>
                <Button variant="text" color="white" className="p-0 ms-2">
                    <img
                        loading="lazy" 
                        className="w-11 h-11 rounded-full p-1 cursor-pointer" 
                        src={ user?.image } 
                        alt="Profile" 
                    /> 
                </Button>
            </MenuHandler>
            <MenuList>
                <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
                    <Avatar
                        variant="circular"
                        alt="tania andrew"
                        src={ user?.image }
                    />
                    <div className="flex flex-col gap-1">
                        <Typography variant="small" color="gray" className="font-normal">
                            <span className="font-medium text-gray-900">{ user?.name }</span>
                        </Typography>
                        <Typography
                            variant="small"
                            className="flex items-center gap-1 text-xs text-gray-600"
                            >
                            { user?.email }
                        </Typography>
                    </div>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                    <UserCircleIcon strokeWidth={2} className="h-4 w-4 text-[#3F3F46]" />
                    <Typography variant="small" className="font-normal text-[#3F3F46]">
                        Profile
                    </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                    <Cog6ToothIcon strokeWidth={2} className="h-4 w-4 text-[#3F3F46]" />
                    <Typography variant="small" className="font-normal text-[#3F3F46]">
                        Settings
                    </Typography>
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem className="flex items-center gap-2" onClick={handleSingOut}>
                    <img src="/assets/logout.svg" alt="Logout" className="h-4 w-4" />
                    <Typography variant="small" className="font-normal text-[#3F3F46]">
                        Logout
                    </Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default AvatarMenu;