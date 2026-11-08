import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from '@vue/test-utils';
import LText from '@/components/LText';

const mockHandleClick = vi.fn()
const mockStyleProps = { color: 'red', fontSize: '16px' }

vi.mock('@/hooks/useComponentCommon', () => ({
    default: () => ({
        styleProps: mockStyleProps,
        handleClick: mockHandleClick
    })
}))

vi.mock('@/defaultProps', () => ({
    transformToComponentProps: () => ({}),
    textDefaultProps: {},
    textStylePropNames: ['color', 'fontSize']
}))

describe('LText Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('应用默认  div 标签渲染', () => {
        const wrapper = mount(LText, {
            props: { text: 'Hello World' }
        })
        
        expect(wrapper.element.tagName).toBe('DIV')
        expect(wrapper.classes()).toContain('l-text-component')
    })


    it('应用确来自hook的styleProps', () => {
        const wrapper = mount(LText, {
            props: { text: 'Styled Text' }
        })

        const style = wrapper.attributes('style')
        expect(style).toContain('color: red');
        expect(style).toContain('font-size: 16px')
    })

    it('点击时应触发 handleClick', async () => {
        // 获取 mock 后的 handleclick 引用
       const { default: useMock } = await import('@/hooks/useComponentCommon') as any;
       const mockClick = useMock().handleClick
       
       const wrapper = mount(LText, {
            props: { text: 'clickble' }
       })

       await wrapper.trigger('click');
       expect(mockClick).toHaveBeenCalledTimes(1);
    })

    it('不同 tag 应具有对应的scoped 样式类', () => {
        const tags = ['h2', 'p', 'button'];

        tags.forEach(tag => {
            const wrapper = mount(LText, {
                props: { tag, text: 'Test' }
            })
            // 验证 scoped class 始终存在
            expect(wrapper.classes()).toContain('l-text-component')
        })
    })
})