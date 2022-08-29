import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';
import storeMock from './helpers/storeMock';
import storeMockWrong from './helpers/storeMockWithError';

const valueInput = 'value-input';
const descriptionInput = 'description-input';
const totalFieldvalue = 'total-field';

describe('Testa a aplicação', () => {
  describe('Teste da pagina de login', () => {
    test('existem 2 inputs, um para email e outro para senha, e são preenchidos corretamente', () => {
      renderWithRouterAndRedux(<App />);
      const emailInput = screen.getByTestId('email-input');
      const senhaInput = screen.getByTestId('password-input');

      userEvent.type(emailInput, 'abc');
      userEvent.type(senhaInput, 'abcd');

      expect(emailInput.value).toBe('abc');
      expect(senhaInput.value).toBe('abcd');
    });

    test('Testando o componente NotFound', () => {
      const { history } = renderWithRouterAndRedux(<App />);

      history.push('/abc');

      const notfound = screen.getByText('404 Page not found');

      expect(notfound).toBeInTheDocument();
    });

    test(`Ao preencher os inputs e apertar o botão de entrar,
    deve ser redirecionado para a pagina /carteira,
    o usuario e total de gastos é exibido corretamente no Header`, () => {
      const { history } = renderWithRouterAndRedux(<App />);
      const emailInput = screen.getByTestId('email-input');
      const senhaInput = screen.getByTestId('password-input');
      const btnEntrar = screen.getByRole('button', { value: 'Entrar' });

      userEvent.type(emailInput, 'abc@abc.com');
      userEvent.type(senhaInput, 'abcdab');
      userEvent.click(btnEntrar);

      expect(history.location.pathname).toBe('/carteira');

      const userInfo = screen.getByTestId('email-field');
      const gastoInfo = screen.getByTestId(totalFieldvalue);
      expect(userInfo.innerHTML).toContain('abc@abc.com');
      expect(gastoInfo.innerHTML).toBe('0.00');
    });
  });
  describe('Testa a pagina carteira', () => {
    test('É renderizado um Formulario, e seus inputs são funcionais', () => {
      renderWithRouterAndRedux(<Wallet />);
      const formValorInput = screen.getByTestId(valueInput);
      const descripInput = screen.getByTestId(descriptionInput);

      userEvent.type(formValorInput, '123');
      userEvent.type(descripInput, 'abc');

      expect(formValorInput.value).toBe('123');
      expect(descripInput.value).toBe('abc');
    });

    test('Ao preencher os inputs e apertar o botão de adicionar despesa, é resetado o input valor e descrição', async () => {
      const { history, store } = renderWithRouterAndRedux(<App />);

      history.push('/carteira');

      const storeValue = await store.getState().wallet.expenses;

      expect(storeValue.length).toBe(0);

      let formValorInput = screen.getByTestId(valueInput);
      let descripInput = screen.getByTestId(descriptionInput);
      const coinInput = await waitFor(() => screen.getByRole('option', { name: 'CAD' }));
      const metodo = screen.getByTestId('method-input');
      const tag = screen.getByTestId('tag-input');
      const btnAdd = screen.getByRole('button', { name: 'Adicionar despesa' });
      const totalField = screen.getByTestId(totalFieldvalue);

      userEvent.type(formValorInput, '123');
      userEvent.type(descripInput, 'abc');
      userEvent.click(coinInput);
      userEvent.selectOptions(metodo, ['Cartão de crédito']);
      userEvent.selectOptions(tag, ['Saúde']);

      expect(formValorInput.value).toBe('123');
      expect(descripInput.value).toBe('abc');
      expect(coinInput.value).toBe('CAD');
      expect(metodo.value).toBe('Cartão de crédito');
      expect(tag.value).toBe('Saúde');
      expect(totalField.innerHTML).toBe('0.00');

      userEvent.click(btnAdd);

      formValorInput = screen.getByTestId(valueInput);
      descripInput = screen.getByTestId(descriptionInput);

      expect(formValorInput.value).toBe('');
      expect(descripInput.value).toBe('');

      await waitFor(() => expect(store.getState().wallet.expenses[0].value).toBe('123'));
    });

    test('O valor Total é atualizado dependendo do estado', () => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: storeMock });

      const valorTotal = screen.getByTestId(totalFieldvalue);

      expect(valorTotal.innerHTML).toBe('475.31');
    });

    test('Passado letras no input de valores, é exibido NaN no campo Total de gastos', () => {
      renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: storeMockWrong });

      const valorTotal = screen.getByTestId(totalFieldvalue);

      expect(valorTotal.innerHTML).toBe('NaN');
    });

    test('Testando os botões de editar e excluir da tabela', async () => {
      const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: storeMock });

      const editBtn = screen.getByTestId('edit-btn');
      const delBtn = screen.getByTestId('delete-btn');

      userEvent.click(editBtn);

      let { editor } = store.getState().wallet;

      expect(editor).toBe(true);

      userEvent.click(editBtn);

      ({ editor } = store.getState().wallet);

      expect(editor).toBe(false);

      userEvent.click(editBtn);

      const editarDespesa = screen.getByRole('button', { name: 'Editar despesa' });

      userEvent.click(editarDespesa);

      await waitFor(() => expect(store.getState().wallet.expenses[0].value).toBe(''));

      userEvent.click(delBtn);

      const { expenses } = store.getState().wallet;

      expect(expenses.length).toBe(0);
    });

    test('Testando caso clicar no botão editar despesas depois da despesa ser deletada ', async () => {
      const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: storeMockWrong });

      const editBtn = screen.getAllByTestId('edit-btn');

      userEvent.click(editBtn[1]);

      await waitFor(() => expect(store.getState().wallet.editor).toBe(true));

      const inputValue = screen.getByTestId(valueInput);

      userEvent.type(inputValue, '123');

      const editarDespesa = screen.getByRole('button', { name: 'Editar despesa' });

      userEvent.click(editarDespesa);

      await waitFor(() => expect(store.getState().wallet.expenses[1].value).toBe('123'));

      const total = screen.getByTestId(totalFieldvalue);

      expect(total.innerHTML).toBe('1094.66');
    });
  });
});
