import { render } from '@testing-library/react'
import Skeleton from '../../src/components/Skeleton'

describe('Skeleton', () => {
    test('renders Skeleton component without crashing', () => {
        const { container } = render(<Skeleton />)

        const skeletonContainer = container.querySelector('.animate-pulse')
        expect(skeletonContainer).toBeInTheDocument()
    })

    test('renders avatar and text blocks', () => {
        const { container } = render(<Skeleton />)

        const avatar = container.querySelector('.bg-gray-300.rounded-full.h-10.w-10')
        expect(avatar).toBeInTheDocument()

        const textBlock2 = container.querySelector('.bg-gray-300.rounded')
        expect(textBlock2).toBeInTheDocument()
    })
})
