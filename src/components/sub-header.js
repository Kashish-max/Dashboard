import { Switch } from "@material-tailwind/react";
import { useSession } from "next-auth/react";

const SubHeader = ({setSwitchOn}) => {
    const { data: session } = useSession();

    const handleSwitchChange = (e) => {
      setSwitchOn(e.target.checked);
    };  

    return (
        <div className="lg:flex space-y-2 lg:space-y-0 px-4 sm:px-0">
            <p className="me-6 text-base text-[#71717A]">
                <span className="text-[#18181b] font-bold me-2">Hey {session?.user?.name} -</span>
                <span>here&apos;s what&apos;s happening</span>
            </p>
            <Switch
                color="blue"
                label={<p className="text-[#474D66] text-base font-black">DEMO DATA</p>}
                className="h-full w-full"
                containerProps={{
                    className: "w-11 h-6 mt-1",
                }}
                circleProps={{
                    className: "before:hidden left-0.5 border-none",
                }}
                onChange={handleSwitchChange}
                defaultChecked={true}
            />    
        </div>
    );
}

export default SubHeader;