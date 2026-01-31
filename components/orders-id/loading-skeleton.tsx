"use client"

export function LoadingSkeleton() {
    return (
        <div className="min-h-screen py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="animate-pulse">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
