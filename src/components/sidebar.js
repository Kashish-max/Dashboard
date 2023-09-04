import { useRouter } from "next/router";
import {
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { signOut } from "next-auth/react"; 

const Sidebar = () => {
  const router = useRouter();
  const slug = router.route.slice(1);

  const handleSingOut = () => {
    signOut({callbackUrl: process.env.NEXT_PUBLIC_DOMAIN});
  }

  const listItems = [
    {
        slug: "posts",
        icon: "/assets/sidebar/chart-bar.svg",
        text: "Posts",
    },
    {
        slug: "comments",
        icon: "/assets/sidebar/user.svg",
        text: "Comments",
    },
    {
        slug: "albums",
        icon: "/assets/sidebar/users.svg",
        text: "Albums",
    },
    {
        slug: "photos",
        icon: "/assets/sidebar/chart-square-bar.svg",
        text: "Photos",
    },
    {
        slug: "users",
        icon: "/assets/sidebar/chart-square-bar.svg",
        text: "Users",
    },
  ]
  
  return (
    <>
        {/* Desktop Sidebar */}
        <div className="hidden sm:flex flex-col justify-between h-screen w-full max-w-fit md:min-w-[12rem] lg:min-w-[18rem] md:px-5 pb-5 pt-20">
            <div className="pt-1">
                <List className="min-w-0 max-w-fit sm:max-w-full">
                    <ListItem className="max-w-fit min-w-max sm:max-w-full">
                        <ListItemPrefix>
                            <img src="/assets/sidebar/dashboard.svg" alt="Dashboard" className="h-4 w-4" />
                        </ListItemPrefix>
                        <span className={`hidden md:block text-[13px] font-medium ${slug == "dashboard" ? "text-[#438EF7]" : "text-[#3F3F46]"}`}>Dashboard</span>                    
                    </ListItem>

                    <ListItem className="hidden md:block mt-1 font-medium text-[#A1A1AA] text-[11px] hover:bg-transparent hover:text-[#A1A1AA] cursor-default">
                        <span>ANALYTICS</span>
                    </ListItem>

                    {listItems.map((item, index) => {
                        return (
                            <ListItem key={index} className="max-w-fit min-w-max sm:max-w-full" onClick={() => router.push(item.slug)}>
                                <ListItemPrefix>
                                    <img src={item.icon} alt={item.text} className="h-4 w-4" />
                                </ListItemPrefix>
                                <span className={`hidden md:block text-[13px] font-medium ${slug == item.text.toLowerCase() ? "text-[#438EF7]" : "text-[#3F3F46]"}`}>{item.text}</span>                    
                            </ListItem>
                        )
                    })}
                </List>
            </div>
            <div className="mb-6">
                <List className="min-w-0 max-w-fit sm:max-w-full">
                    <ListItem className="max-w-fit min-w-max sm:max-w-full">
                        <ListItemPrefix>
                            <img src="/assets/sidebar/cog.svg" alt="Settingss" className="h-4 w-4" />
                        </ListItemPrefix>
                        <span className="hidden md:block text-[13px] font-medium text-[#3F3F46]">Settings</span>                    
                    </ListItem>
                    <ListItem className="max-w-fit min-w-max sm:max-w-full" onClick={handleSingOut}>
                        <ListItemPrefix>
                            <img src="/assets/logout.svg" alt="Logout" className="h-4 w-4" />
                        </ListItemPrefix>
                        <span className="hidden md:block text-[13px] font-medium text-[#3F3F46]">Logout</span>                    
                    </ListItem>
                </List>
            </div>
        </div>

        {/* Mobile Sidebar */}
        <div className="fixed bottom-0 w-full sm:hidden bg-white border-t-[1.5px] border-gray-200 py-4">
                <div className="flex justify-center">
                    {listItems.map((item, index) => {
                        return (
                            <ListItem key={index} className="max-w-fit mx-2" onClick={() => router.push(item.slug)}>
                                <img src={item.icon} alt={item.text} className="h-4 w-4" />
                            </ListItem>
                        )
                    })}
                </div>
        </div>
    </>
  );
}

export default Sidebar;