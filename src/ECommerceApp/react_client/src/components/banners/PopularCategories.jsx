export default function PopularCategories() {
    return (
        <div className="py-6">
            <p className="text-2xl font-semibold">The Most Popular Categories</p>
            <div className="flex gap-2">
                <div className="bg-blue-500 max-w-xs">
                    <CategoryCard/>
                </div>
                <div className="bg-green-500 max-w-xs">
                    <CategoryCard/>
                </div>
            </div>
        </div>
    );
}

function CategoryCard() {
    return (
        <div className="flex p-6 text-white cursor-pointer">
            <p>Category</p>
        </div>
    );
}