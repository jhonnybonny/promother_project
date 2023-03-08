import React, {FC, ReactNode} from "react";

interface Props {
    children: ReactNode
    itemsNumber: number
}

const MultiplyPreloader: FC<Props> = ({children, itemsNumber}) => {
    return (
        <>
            {Array.from(Array(itemsNumber)).map(
                () => children
            )}
        </>
    );
};

export default MultiplyPreloader;