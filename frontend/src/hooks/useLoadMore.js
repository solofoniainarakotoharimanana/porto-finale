import { useState } from "react";

export function useLoadMore(itemsPrePage, datas) {
    // const ITEMS_PER_PAGE = 3;
    const [visibleCount, setVisibleCount] = useState(itemsPrePage);
    // Take a slice of the array from 0 to our current visible limit
    const visibleItems = datas.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + itemsPrePage);
    }

    return {visibleCount, visibleItems, handleLoadMore}
}