import SessionLayout from "./components/SessionLayout";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <SessionLayout>
            <div className="bg-slate-200 w-full min-h-screen rounded-lg flex justify-center items-center">
                <h2 className="m-4 text-2xl font-bold justify-center">Loading...</h2>
            </div>
        </SessionLayout>
    )
}