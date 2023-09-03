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
    <div className="h-screen w-full max-w-[18rem] p-5 flex flex-col justify-between">
        <div>
            <div className="p-4">
                <img src="/assets/logo.svg" alt="Logo" className="w-16" />
            </div>
            <List>
                <ListItem onClick={() => router.push("dashboard")}>
                    <ListItemPrefix>
                        <img src="/assets/sidebar/dashboard.svg" alt="Dashboard" className="h-4 w-4" />
                    </ListItemPrefix>
                    <span className={`text-[13px] font-medium ${slug == "dashboard" ? "text-[#438EF7]" : "text-[#3F3F46]"}`}>Dashboard</span>                    
                </ListItem>

                <ListItem className="mt-1 font-medium text-[#A1A1AA] text-[11px]">
                    <span>ANALYTICS</span>
                </ListItem>

                {listItems.map((item, index) => {
                    return (
                        <ListItem key={index} onClick={() => router.push(item.slug)}>
                            <ListItemPrefix>
                                <img src={item.icon} alt={item.text} className="h-4 w-4" />
                            </ListItemPrefix>
                            <span className={`text-[13px] font-medium ${slug == item.text.toLowerCase() ? "text-[#438EF7]" : "text-[#3F3F46]"}`}>{item.text}</span>                    
                        </ListItem>
                    )
                })}
            </List>
        </div>
        <div className="mb-6">
            <List>
                <ListItem>
                    <ListItemPrefix>
                        <img src="/assets/sidebar/cog.svg" alt="Settingss" className="h-4 w-4" />
                    </ListItemPrefix>
                    <span className="text-[13px] font-medium text-[#3F3F46]">Settings</span>                    
                </ListItem>
                <ListItem onClick={handleSingOut}>
                    <ListItemPrefix>
                        <img src="/assets/logout.svg" alt="Logout" className="h-4 w-4" />
                    </ListItemPrefix>
                    <span className="text-[13px] font-medium text-[#3F3F46]">Logout</span>                    
                </ListItem>
            </List>
        </div>
    </div>
  );
}

export default Sidebar;