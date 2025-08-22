import Image from "next/image";

export default function EmptyFavorites() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Image src="/empty-favorites.svg" alt="empty " width={200} height={200}/>
            <h2 className="text-2xl font-semibold mt-6">No favorites found</h2>
            <p className="text-black foreground ">
                Try adding a favorite.
            </p>
        </div>
    );
    
};
