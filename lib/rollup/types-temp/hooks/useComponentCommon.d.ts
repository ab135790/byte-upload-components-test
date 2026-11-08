import { type CSSProperties } from 'vue';
import type { CommonComponentProps } from '../defaultProps';
declare const useComponentCommon: (props: Readonly<Partial<CommonComponentProps & {
    isEditing: boolean;
}>>, picks: string[]) => {
    styleProps: import("vue").ComputedRef<CSSProperties>;
    handleClick: () => void;
};
export default useComponentCommon;
