import cn from 'classnames';

const wrapper = cn('container-fluid');
const container = cn(
  'row',
  'justify-content-center',
  'pt-5',
);
const columnsStyles = cn('col-sm-4');
const formPadding = cn('p-3');
const formStyle = cn('form-group');
const formLabelStyles = cn('form-label');
const loginBtnStyles = cn(
  'w-100',
  'mb-3',
  'btn',
  'btn-outline-primary',
);
const newCommersWrapper = cn(
  'd-flex',
  'flex-column',
  'align-items-center',
);
const newCommersSpanStyles = cn(
  'small',
  'mb-2',
);

export {
  wrapper, container, columnsStyles,
  formPadding, formStyle, formLabelStyles, loginBtnStyles, newCommersWrapper, newCommersSpanStyles,
};
