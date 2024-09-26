// src/index.test.tsx
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../src/redux/store/store'
import App from '../src/App'

describe('Index Component', () => {
    it('renders App component within Provider', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )

        // Тестуємо, чи рендериться App компонент
        expect(screen.getByText('Comments')).toBeInTheDocument()
    })

    it('renders without crashing', () => {
        const { container } = render(
            <Provider store={store}>
                <App />
            </Provider>
        )

        expect(container).toBeInTheDocument()
    })

    // Додай більше тестів для перевірки специфічних елементів у App
})
