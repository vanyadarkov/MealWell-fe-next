import {CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {cn} from "@/lib/utils";

export default function ResponsiveCarouselControls() {
    return (<>
        <div className="hidden lg:block">
            <CarouselPrevious/>
        </div>
        <div className="hidden lg:block">
            <CarouselNext/>
        </div>
        <div className="flex gap-8 mt-4 lg:hidden">
            <CarouselPrevious
                className={cn(
                    "static h-8 w-8 rounded-full",
                    "-left-0 top-0 -translate-y-0",
                )}
            />
            <div className="flex-grow"/>
            <CarouselNext
                className={cn(
                    "static h-8 w-8 rounded-full",
                    "-right-0 top-0 -translate-y-0",
                )}
            />
        </div>
    </>);
}
