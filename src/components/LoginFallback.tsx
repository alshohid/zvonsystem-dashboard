export default function LoginFallback() {
    return (
        <div className="box-border min-h-[100dvh] w-full overflow-y-auto px-3 py-6 sm:px-4 sm:py-8 lg:h-[100dvh] lg:overflow-hidden lg:py-3">
            <div className="mx-auto flex w-full flex-col overflow-hidden rounded-[22px] p-3 sm:p-4 lg:h-full lg:rounded-[30px] lg:p-5">
                <div className="grid grid-cols-1 gap-4 lg:h-full lg:min-h-0 lg:flex-1 ">
                    <section className="flex items-center justify-center rounded-[26px] px-4 py-8 sm:px-8 lg:order-2 lg:min-h-0 lg:px-10">
                        <div className="w-full max-w-[338px] animate-pulse">
                            <div className="mb-6 flex justify-center sm:mb-8 lg:mb-10">
                                <div className="h-12 w-[150px] rounded-full bg-[#b3e2b4] sm:w-[180px] lg:w-[220px]" />
                            </div>

                            <div className="text-center">
                                <div className="mx-auto h-8 w-28 rounded-full bg-[#b2d4af] sm:h-9 sm:w-32 lg:h-10 lg:w-36" />
                                <div className="mx-auto mt-3 h-4 w-40 rounded-full bg-[#f4fcfa] sm:w-44" />
                            </div>


                            <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5 lg:mt-10">
                                <div className="space-y-2">
                                    <div className="h-4 w-14 rounded-full bg-[#f0faee]" />
                                    <div className="h-[50px] rounded-[12px] border border-[#e4ece5] bg-[#f5fbf7]" />
                                </div>

                                <div className="space-y-2">
                                    <div className="h-4 w-20 rounded-full bg-[#eefaef]" />
                                    <div className="h-[50px] rounded-[12px] border border-[#e4ece5] bg-[#f5fbf7]" />
                                </div>

                                <div className="flex justify-end">
                                    <div className="h-4 w-28 rounded-full bg-[#d0e7d4]" />
                                </div>

                                <div className="h-[52px] rounded-[14px] bg-[#a0d5ac]" />

                                <div className="flex justify-center">
                                    <div className="h-4 w-44 rounded-full bg-[#b2d9c2]" />
                                </div>
                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </div>
    );
}