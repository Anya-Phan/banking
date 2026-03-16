import { SkeletonMenu } from "@/components/SkeletonMenu";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="p-8 flex flex-col gap-4">
            <SkeletonMenu />
            <SkeletonMenu />
        </div>
    );
}
