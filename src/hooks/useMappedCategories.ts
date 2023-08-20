import { useMemo } from 'react'

export default function useMappedCategories(categories: Category[]) {
    // Id of category as key and object of self and array of ids of their children as value
    // Categories with no children are excluded
    const categoriesMap: CategoriesMap = useMemo(() => {
        const categoriesMap: CategoriesMap = new Map<string, CategoriesMapValue>(categories.map(item => [item._id, { self: item, subs: [] }]));
        categories.forEach(item => {
            if (item.parent) categoriesMap.get(item.parent)?.subs.push(item._id);
        });
        console.log(categoriesMap);
        return categoriesMap;
    }, [categories]);

    // Check if parentCandidate is a child of item.
    function isDescendant(itemId: string, parentCandidateId: string): boolean {
        // if candidate has no parents than it can't be descendant
        if (!categoriesMap.get(parentCandidateId)?.self.parent) return false;

        let currentParent = categoriesMap.get(parentCandidateId)?.self.parent;
        while (currentParent) {
            if (currentParent === itemId) return true;
            currentParent = categoriesMap.get(currentParent)?.self.parent;
        }
        return false;
    }

    function getAllDescendantsOf(id: string): string[] {
        const item = categoriesMap.get(id);
        if(!item || !item.subs) 
            return [];

        const descendants: string[] = [];
        const loopThroughTree = (id: string) => {
            const item = categoriesMap.get(id);
            if(!item?.subs.length) return;
            else {
                descendants.push(...item.subs);
                item.subs.forEach(i => loopThroughTree(i))
            }
        }
        loopThroughTree(id);
        return descendants;
    }

    return { categoriesMap, isDescendant, getAllDescendantsOf };
}
