import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import Page from './Page';

describe('Page', () => {
  const handleChangeTitle = jest.fn();
  const handleClickDeleteTask = jest.fn();
  const handleClickAddTask = jest.fn();

  context('초기 화면일 때', () => {
    const taskTitle = '';
    const tasks = [];
    it('To-do문구를 화면에 보인다', () => {
      const { container } = render((
        <Page tasks={tasks} />
      ));

      expect(container).toHaveTextContent('To-do');
    });

    it('라벨과 인풋과 버튼이 화면에 보인다', () => {
      const { container, getByPlaceholderText } = render((
        <Page
          taskTitle={taskTitle}
          tasks={tasks}
          onChangeTitle={handleChangeTitle}
          onClickAddTask={handleClickAddTask}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));

      expect(container).toHaveTextContent('할 일');
      expect(getByPlaceholderText('할 일을 입력해 주세요')).toHaveValue('');
      expect(container).toHaveTextContent('추가');
    });

    it('리스트에 텍스트가 보인다.', () => { });
  });

  context('인풋에 글자를 입력할 때마다', () => {
    const tasks = [];

    it('onChangeTitle 함수가 실행된다', () => {
      const taskTitle = '';

      const { getByPlaceholderText } = render((
        <Page
          taskTitle={taskTitle}
          tasks={tasks}
          onChangeTitle={handleChangeTitle}
        />
      ));

      const input = getByPlaceholderText('할 일을 입력해 주세요');

      expect(handleChangeTitle).not.toBeCalled();
      fireEvent.change(input, { target: { value: '입력한 문자' } });
      expect(handleChangeTitle).toBeCalled();
    });
  });

  context('추가버튼을 클릭하면', () => {
    it('onClickAddTask 함수가 실행된다', () => {
      const taskTitle = '첫번째 할 일';
      const tasks = [];

      const { getByText } = render((
        <Page
          taskTitle={taskTitle}
          tasks={tasks}
          onClickAddTask={handleClickAddTask}
        />
      ));

      expect(handleClickAddTask).not.toBeCalled();
      fireEvent.click(getByText('추가'));
      expect(handleClickAddTask).toBeCalled();
    });
  });

  context('삭제버튼을 누르면', () => {
    const taskTitle = '';
    const tasks = [
      { id: 1, title: '첫번째 할 일' },
      { id: 2, title: '두번째 할 일' },
      { id: 3, title: '세번째 할 일' },
    ];

    it('onClickDeleteTask 함수가 실행된다', () => {
      const { queryAllByText } = render((
        <Page
          tasks={tasks}
          taskTitle={taskTitle}
          onClickDeleteTask={handleClickDeleteTask}
        />
      ));
      const deleteButtons = queryAllByText('완료');

      expect(handleClickDeleteTask).not.toBeCalled();
      deleteButtons.forEach((deleteButton) => {
        fireEvent.click(deleteButton);
      });
      expect(handleClickDeleteTask).toBeCalledTimes(3);
    });
  });
});
