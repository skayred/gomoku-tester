import {toBeInTheDocument, toHaveClass} from '@testing-library/jest-dom'
expect.extend({toBeInTheDocument, toHaveClass});

import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  wait,
  waitForDomChange,
  fireEvent,
  querySelector
} from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

import main from '../index';

global.alert = jest.fn();

const checkTurn = (num, sym) => {
  fireEvent(
    document.documentElement.querySelectorAll('td')[num],
    new MouseEvent('click', { button: 0 })
  );

  expect(
    document.documentElement.querySelectorAll('td')[num].innerText,
  ).toEqual(sym);
}

beforeEach(() => {
  var html = require('fs').readFileSync('./index.html').toString();
  global.document.documentElement.innerHTML = html;

  main();
});

afterEach(() => {
    global.document.documentElement.innerHTML = '';
});

test("renders_container", () => {
  expect(
    document.getElementById('board'),
  ).toBeInTheDocument()
});

test("renders_table", () => {
  expect(
    document.documentElement.getElementsByTagName('td').length,
  ).toEqual(5*5);
});


test("reacts_on_click", () => {
    checkTurn(0, 'x');
    checkTurn(1, 'o');
});

test("win_condition_works_1", () => {
    for (let i = 0 ; i < 25 ; i+=6) {
        checkTurn(i, 'x');
        if (i < 24) {
            checkTurn(i + 1, 'o');
        }
    }

    expect(global.alert).toBeCalledWith("Player 1 won!");

    checkTurn(4, ' ');
});

it("win_condition_works_2", () => {
    for (let i = 0 ; i < 5 ; i++) {
        checkTurn(i, 'x');
        if (i < 4) {
            checkTurn(i + 5, 'o');
        }
    }

    expect(global.alert).toBeCalledWith("Player 1 won!");
});

it("win_condition_works_3", () => {
    for (let i = 0 ; i < 5 ; i++) {
        if (i < 4) {
            checkTurn(i, 'x');
        } else {
            checkTurn(22, 'x');
        }
        checkTurn(i + 5, 'o');
    }

    expect(global.alert).toBeCalledWith("Player 2 won!");
});
