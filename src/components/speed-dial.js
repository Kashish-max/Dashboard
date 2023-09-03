import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Tooltip
} from "@material-tailwind/react";
import {
    ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";


export default function BaseSpeedDial() {
    return (
        <div className={`hidden sm:flex fixed bottom-8 sm:bottom-12 right-8`}>
            <SpeedDial>
                <SpeedDialHandler>
                    <IconButton color="white" size="lg" className="rounded-full border border-blue-gray-100">
                        {/* <QuestionMarkCircleIcon className="h-5 w-5 transition-transform group-hover:rotate-45" /> */}
                        <img src="/assets/question.svg" alt="Help" className="h-5 w-5 transition-transform group-hover:rotate-45" />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                    <Tooltip content="Read Docs" placement="left" className="text-xs font-medium bg-blue-500">
                        <button>
                            <SpeedDialAction>
                                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                            </SpeedDialAction>
                        </button>   
                    </Tooltip>
                </SpeedDialContent>
            </SpeedDial>
        </div>
    );
}